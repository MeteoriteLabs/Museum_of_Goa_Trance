import { useEffect, useRef, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Settings, X } from "lucide-react";

interface FluidConfig {
  densityDiffusion: number;
  velocityDiffusion: number;
  pressureDiffusion: number;
  pressureIterations: number;
  curl: number;
  splatRadius: number;
}

const DEFAULT_CONFIG: FluidConfig = {
  densityDiffusion: 0.98,
  velocityDiffusion: 0.99,
  pressureDiffusion: 0.8,
  pressureIterations: 25,
  curl: 30,
  splatRadius: 0.005,
};

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vs: string, fs: string) {
  const vertShader = compileShader(gl, gl.VERTEX_SHADER, vs);
  const fragShader = compileShader(gl, gl.FRAGMENT_SHADER, fs);
  if (!vertShader || !fragShader) return null;
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vertShader);
  gl.attachShader(prog, fragShader);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    gl.deleteProgram(prog);
    return null;
  }
  return prog;
}

const VERT = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FLUID_FRAG = `
precision highp float;
varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_mouseDown;
uniform vec2 u_resolution;
uniform float u_densityDiff;
uniform float u_velocityDiff;
uniform float u_pressureDiff;
uniform float u_curl;
uniform float u_splatRadius;
uniform float u_splatSeed;
uniform float u_pressureIter;

vec3 palette(float t) {
  vec3 a = vec3(0.5, 0.5, 0.5);
  vec3 b = vec3(0.5, 0.5, 0.5);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.10, 0.20, 0.30);
  return a + b * cos(6.28318 * (c * t + d));
}

float noise(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float smoothNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = noise(i);
  float b = noise(i + vec2(1.0, 0.0));
  float c = noise(i + vec2(0.0, 1.0));
  float d = noise(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float val = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  for (int i = 0; i < 6; i++) {
    val += amp * smoothNoise(p * freq);
    freq *= 2.0;
    amp *= 0.5;
  }
  return val;
}

void main() {
  vec2 uv = v_uv;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = uv;
  p.x *= aspect;

  float t = u_time * 0.15 * u_velocityDiff;

  vec2 mouse = u_mouse;
  mouse.x *= aspect;
  float mouseDist = length(p - mouse);
  float splatSize = u_splatRadius * 50.0 + 0.15;
  float mouseInfluence = smoothstep(splatSize, 0.0, mouseDist) * (0.3 + u_mouseDown * 0.7);

  float curlEffect = u_curl / 30.0;
  vec2 q = vec2(
    fbm(p + vec2(0.0, 0.0) + t * 0.4 * curlEffect),
    fbm(p + vec2(5.2, 1.3) + t * 0.3 * curlEffect)
  );

  float iterScale = u_pressureIter / 25.0;
  float diffusion = u_densityDiff * 4.0;
  vec2 r = vec2(
    fbm(p + diffusion * q + vec2(1.7, 9.2) + t * 0.2 * u_pressureDiff * iterScale + mouseInfluence * 2.0),
    fbm(p + diffusion * q + vec2(8.3, 2.8) + t * 0.25 * u_pressureDiff * iterScale + mouseInfluence * 1.5)
  );

  float f = fbm(p + diffusion * r * iterScale + mouseInfluence * 3.0 + u_splatSeed);

  vec3 col = mix(
    vec3(0.05, 0.02, 0.12),
    vec3(0.10, 0.04, 0.25),
    clamp(f * f * 4.0, 0.0, 1.0)
  );

  col = mix(col, vec3(0.0, 0.45, 0.65), clamp(length(q), 0.0, 1.0) * 0.4);
  col = mix(col, vec3(0.85, 0.35, 0.15), clamp(length(r.x), 0.0, 1.0) * 0.3);
  col = mix(col, palette(f * 0.8 + t * 0.1), mouseInfluence * 0.6);

  float vignette = 1.0 - smoothstep(0.4, 1.4, length(uv - 0.5) * 1.5);
  col *= vignette * 0.9 + 0.1;
  col *= 0.85 + 0.15 * sin(t * 2.0 + f * 6.0);

  gl_FragColor = vec4(col, 1.0);
}`;

function SettingsSlider({ label, value, min, max, step, onChange }: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex items-center gap-3" data-testid={`slider-${label.toLowerCase().replace(/\s/g, "-")}`}>
      <span className="text-white/80 text-xs w-36 shrink-0">{label}</span>
      <div className="relative flex-1 h-5 flex items-center">
        <div className="absolute inset-y-0 left-0 right-0 flex items-center">
          <div className="w-full h-2 rounded-full bg-white/10 relative">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-cyan-400"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
      </div>
      <span className="text-cyan-400 text-xs w-12 text-right font-mono tabular-nums">{value}</span>
    </div>
  );
}

export default function ExperiencePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, down: 0 });
  const rafRef = useRef<number>(0);
  const configRef = useRef<FluidConfig>({ ...DEFAULT_CONFIG });
  const splatSeedRef = useRef(0);

  const [config, setConfig] = useState<FluidConfig>({ ...DEFAULT_CONFIG });
  const [showSettings, setShowSettings] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<{
    ctx: AudioContext;
    osc: OscillatorNode;
    lfo: OscillatorNode;
    gain: GainNode;
  } | null>(null);
  const stopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateConfig = useCallback((key: keyof FluidConfig, value: number) => {
    setConfig((prev) => {
      const next = { ...prev, [key]: value };
      configRef.current = next;
      return next;
    });
  }, []);

  const resetConfig = useCallback(() => {
    setConfig({ ...DEFAULT_CONFIG });
    configRef.current = { ...DEFAULT_CONFIG };
  }, []);

  const randomSplats = useCallback(() => {
    splatSeedRef.current = Math.random() * 100;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false });
    if (!gl) return;

    const program = createProgram(gl, VERT, FLUID_FRAG);
    if (!program) return;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, "a_position");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uMouseDown = gl.getUniformLocation(program, "u_mouseDown");
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uDensityDiff = gl.getUniformLocation(program, "u_densityDiff");
    const uVelocityDiff = gl.getUniformLocation(program, "u_velocityDiff");
    const uPressureDiff = gl.getUniformLocation(program, "u_pressureDiff");
    const uCurl = gl.getUniformLocation(program, "u_curl");
    const uSplatRadius = gl.getUniformLocation(program, "u_splatRadius");
    const uSplatSeed = gl.getUniformLocation(program, "u_splatSeed");
    const uPressureIter = gl.getUniformLocation(program, "u_pressureIter");

    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const startTime = performance.now();
    let paused = false;

    const render = () => {
      if (!paused) {
        const elapsed = (performance.now() - startTime) / 1000;
        const c = configRef.current;
        gl.useProgram(program);
        gl.uniform1f(uTime, elapsed);
        gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
        gl.uniform1f(uMouseDown, mouseRef.current.down);
        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.uniform1f(uDensityDiff, c.densityDiffusion);
        gl.uniform1f(uVelocityDiff, c.velocityDiffusion);
        gl.uniform1f(uPressureDiff, c.pressureDiffusion);
        gl.uniform1f(uCurl, c.curl);
        gl.uniform1f(uSplatRadius, c.splatRadius);
        gl.uniform1f(uSplatSeed, splatSeedRef.current);
        gl.uniform1f(uPressureIter, c.pressureIterations);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      rafRef.current = requestAnimationFrame(render);
    };
    render();

    const handleVisibility = () => { paused = document.hidden; };
    document.addEventListener("visibilitychange", handleVisibility);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = 1.0 - e.clientY / window.innerHeight;
    };
    const onTouchMove = (e: TouchEvent) => {
      mouseRef.current.x = e.touches[0].clientX / window.innerWidth;
      mouseRef.current.y = 1.0 - e.touches[0].clientY / window.innerHeight;
    };
    const onDown = () => { mouseRef.current.down = 1; };
    const onUp = () => { mouseRef.current.down = 0; };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("touchend", onUp);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchstart", onDown);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  const stopAudio = useCallback(() => {
    if (stopTimeoutRef.current) {
      clearTimeout(stopTimeoutRef.current);
      stopTimeoutRef.current = null;
    }
    const a = audioRef.current;
    if (!a) return;
    try {
      a.gain.gain.cancelScheduledValues(a.ctx.currentTime);
      a.gain.gain.setValueAtTime(a.gain.gain.value, a.ctx.currentTime);
      a.gain.gain.exponentialRampToValueAtTime(0.0001, a.ctx.currentTime + 0.5);
      stopTimeoutRef.current = setTimeout(() => {
        try {
          a.osc.stop();
          a.lfo.stop();
          a.osc.disconnect();
          a.lfo.disconnect();
          a.gain.disconnect();
          a.ctx.close();
        } catch (_) {}
        audioRef.current = null;
        stopTimeoutRef.current = null;
      }, 600);
    } catch (_) {
      audioRef.current = null;
    }
  }, []);

  const toggleAmbient = useCallback(() => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
      return;
    }

    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.value = 110;
    filter.type = "lowpass";
    filter.frequency.value = 400;
    filter.Q.value = 1;
    gain.gain.value = 0.0001;
    gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = "sine";
    lfo.frequency.value = 0.05;
    lfoGain.gain.value = 20;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start();

    audioRef.current = { ctx, osc, lfo, gain };
    setIsPlaying(true);
  }, [isPlaying, stopAudio]);

  useEffect(() => {
    return () => {
      if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
      const a = audioRef.current;
      if (a) {
        try {
          a.osc.stop();
          a.lfo.stop();
          a.osc.disconnect();
          a.lfo.disconnect();
          a.gain.disconnect();
          a.ctx.close();
        } catch (_) {}
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className="relative overflow-hidden bg-black"
      style={{ width: "100vw", height: "100vh", touchAction: "none" }}
      data-testid="page-experience"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
        data-testid="canvas-fluid"
      />

      <div className="absolute bottom-6 right-6 flex items-center gap-2 z-10">
        <Button
          size="icon"
          variant="outline"
          className="bg-white/10 backdrop-blur-md border-white/20 text-white"
          onClick={toggleAmbient}
          data-testid="button-toggle-ambient"
        >
          {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="bg-white/10 backdrop-blur-md border-white/20 text-white"
          onClick={() => setShowSettings((s) => !s)}
          data-testid="button-toggle-settings"
        >
          {showSettings ? <X className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
        </Button>
      </div>

      {showSettings && (
        <div
          className="absolute top-14 right-0 w-72 sm:w-80 bg-gray-900/90 backdrop-blur-md border-l border-white/10 p-4 z-10 flex flex-col gap-3"
          style={{ bottom: 0 }}
          data-testid="panel-settings"
        >
          <SettingsSlider
            label="Density Diffusion"
            value={config.densityDiffusion}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) => updateConfig("densityDiffusion", v)}
          />
          <SettingsSlider
            label="Velocity Diffusion"
            value={config.velocityDiffusion}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) => updateConfig("velocityDiffusion", v)}
          />
          <SettingsSlider
            label="Pressure Diffusion"
            value={config.pressureDiffusion}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) => updateConfig("pressureDiffusion", v)}
          />
          <SettingsSlider
            label="Pressure Iterations"
            value={config.pressureIterations}
            min={1}
            max={50}
            step={1}
            onChange={(v) => updateConfig("pressureIterations", v)}
          />
          <SettingsSlider
            label="Curl"
            value={config.curl}
            min={0}
            max={50}
            step={1}
            onChange={(v) => updateConfig("curl", v)}
          />
          <SettingsSlider
            label="Splat Radius"
            value={config.splatRadius}
            min={0.001}
            max={0.05}
            step={0.001}
            onChange={(v) => updateConfig("splatRadius", v)}
          />

          <div className="flex flex-col gap-2 mt-2">
            <Button
              variant="outline"
              className="w-full bg-white/5 border-white/15 text-white text-xs"
              onClick={randomSplats}
              data-testid="button-random-splats"
            >
              Random Splats
            </Button>
            <Button
              variant="outline"
              className="w-full bg-white/5 border-white/15 text-white text-xs"
              onClick={resetConfig}
              data-testid="button-reset-config"
            >
              Reset Config
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}