import { useEffect, useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Volume2, VolumeX } from "lucide-react";
import { PETITION_LINK } from "@/lib/constants";
import Footer from "@/components/Footer";

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

  float t = u_time * 0.15;

  vec2 mouse = u_mouse;
  mouse.x *= aspect;
  float mouseDist = length(p - mouse);
  float mouseInfluence = smoothstep(0.5, 0.0, mouseDist) * (0.3 + u_mouseDown * 0.7);

  vec2 q = vec2(
    fbm(p + vec2(0.0, 0.0) + t * 0.4),
    fbm(p + vec2(5.2, 1.3) + t * 0.3)
  );

  vec2 r = vec2(
    fbm(p + 4.0 * q + vec2(1.7, 9.2) + t * 0.2 + mouseInfluence * 2.0),
    fbm(p + 4.0 * q + vec2(8.3, 2.8) + t * 0.25 + mouseInfluence * 1.5)
  );

  float f = fbm(p + 4.0 * r + mouseInfluence * 3.0);

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

function FluidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, down: 0 });
  const rafRef = useRef<number>(0);

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
        gl.useProgram(program);
        gl.uniform1f(uTime, elapsed);
        gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
        gl.uniform1f(uMouseDown, mouseRef.current.down);
        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      rafRef.current = requestAnimationFrame(render);
    };
    render();

    const handleVisibility = () => {
      paused = document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    mouseRef.current.x = (clientX - rect.left) / rect.width;
    mouseRef.current.y = 1.0 - (clientY - rect.top) / rect.height;
  }, []);

  const handleDown = useCallback(() => { mouseRef.current.down = 1; }, []);
  const handleUp = useCallback(() => { mouseRef.current.down = 0; }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onMouseDown={handleDown}
      onMouseUp={handleUp}
      onTouchStart={handleDown}
      onTouchEnd={handleUp}
      data-testid="canvas-fluid"
    />
  );
}

const QUOTES = [
  {
    text: "Music is the language of the spirit. It opens the secret of life bringing peace, abolishing strife.",
    author: "Kahlil Gibran",
  },
  {
    text: "The dance floor is a sacred space where ego dissolves and unity begins.",
    author: "Goa Gil",
  },
  {
    text: "We don't stop playing because we grow old; we grow old because we stop playing.",
    author: "George Bernard Shaw",
  },
];

export default function ExperiencePage() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<{
    ctx: AudioContext;
    osc: OscillatorNode;
    lfo: OscillatorNode;
    gain: GainNode;
  } | null>(null);
  const stopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % QUOTES.length);
    }, 8000);
    return () => clearInterval(interval);
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
    <div className="relative min-h-screen" data-testid="page-experience">
      <FluidCanvas />

      <div className="fixed inset-0 bg-black/30" style={{ zIndex: 1 }} />

      <div className="relative" style={{ zIndex: 2 }}>
        <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center max-w-2xl mx-auto"
          >
            <p
              className="text-white/50 text-xs uppercase tracking-[0.3em] mb-6 font-medium"
              data-testid="text-experience-label"
            >
              Move your cursor to interact
            </p>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight"
              data-testid="text-experience-title"
            >
              Feel the Flow
            </h1>
            <p
              className="text-white/70 text-base sm:text-lg leading-relaxed max-w-lg mx-auto mb-10"
              data-testid="text-experience-subtitle"
            >
              Goa trance was never just music. It was a living, breathing experience
              that dissolved boundaries between self and sound, dancer and rhythm,
              earth and cosmos.
            </p>

            <div className="flex items-center justify-center gap-3">
              <a href={PETITION_LINK} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="bg-white/10 backdrop-blur-md border-white/20 text-white"
                  data-testid="button-experience-petition"
                >
                  Sign the Petition
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </a>
              <Button
                size="icon"
                variant="outline"
                className="bg-white/10 backdrop-blur-md border-white/20 text-white"
                onClick={toggleAmbient}
                data-testid="button-toggle-ambient"
              >
                {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-0 right-0 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-white/40 text-xs tracking-widest uppercase"
              data-testid="text-scroll-hint"
            >
              Scroll to explore
            </motion.div>
          </motion.div>
        </div>

        <div className="min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="max-w-xl mx-auto text-center"
          >
            <div className="relative h-40 flex items-center justify-center" data-testid="quote-container">
              {QUOTES.map((q, i) => (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{
                    opacity: i === quoteIndex ? 1 : 0,
                    y: i === quoteIndex ? 0 : 20,
                  }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{ pointerEvents: i === quoteIndex ? "auto" : "none" }}
                >
                  <p
                    className="text-white/80 text-lg sm:text-xl md:text-2xl font-serif italic leading-relaxed"
                    data-testid={`text-quote-${i}`}
                  >
                    "{q.text}"
                  </p>
                  <p
                    className="text-white/40 text-sm mt-4 tracking-wide"
                    data-testid={`text-quote-author-${i}`}
                  >
                    - {q.author}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
              {[
                { value: "50+", label: "Years of Sonic Heritage", desc: "From 1970s beach parties to global movement" },
                { value: "148", label: "Countries Reached", desc: "Goa trance spread to every corner of the planet" },
                { value: "1", label: "Sacred Birthplace", desc: "Anjuna, Goa - where it all began" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  className="flex flex-col items-center"
                  data-testid={`stat-block-${i}`}
                >
                  <span className="text-4xl sm:text-5xl font-bold text-white mb-2" data-testid={`text-stat-value-${i}`}>
                    {stat.value}
                  </span>
                  <span className="text-white/70 text-sm font-medium mb-1" data-testid={`text-stat-label-${i}`}>
                    {stat.label}
                  </span>
                  <span className="text-white/40 text-xs" data-testid={`text-stat-desc-${i}`}>
                    {stat.desc}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-lg mx-auto text-center"
          >
            <h2
              className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4"
              data-testid="text-cta-heading"
            >
              This heritage belongs to everyone.
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-8" data-testid="text-cta-body">
              Anjuna is not just a location on a map. It is the cradle of a global
              musical revolution. Help us protect it for future generations.
            </p>
            <a href={PETITION_LINK} target="_blank" rel="noopener noreferrer">
              <Button
                className="bg-white text-black font-medium"
                data-testid="button-cta-petition"
              >
                Add Your Voice
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  );
}