import { useEffect, useRef, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Settings, X, ExternalLink } from "lucide-react";
import { PETITION_LINK } from "@/lib/constants";

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

function getWebGLContext(canvas: HTMLCanvasElement) {
  const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
  let gl = canvas.getContext("webgl2", params) as WebGL2RenderingContext | null;
  const isWebGL2 = !!gl;
  if (!gl) {
    gl = canvas.getContext("webgl", params) as any;
  }
  if (!gl) return null;

  let halfFloatExt: any = null;
  let supportLinearFiltering = false;

  if (isWebGL2) {
    (gl as WebGL2RenderingContext).getExtension("EXT_color_buffer_float");
    supportLinearFiltering = !!(gl as WebGL2RenderingContext).getExtension("OES_texture_float_linear");
  } else {
    halfFloatExt = gl.getExtension("OES_texture_half_float");
    supportLinearFiltering = !!gl.getExtension("OES_texture_half_float_linear");
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  const halfFloatTexType = isWebGL2
    ? (gl as WebGL2RenderingContext).HALF_FLOAT
    : halfFloatExt
      ? halfFloatExt.HALF_FLOAT_OES
      : gl.UNSIGNED_BYTE;

  const formatRGBA = isWebGL2
    ? { internalFormat: (gl as any).RGBA16F, format: gl.RGBA }
    : { internalFormat: gl.RGBA, format: gl.RGBA };

  const formatRG = isWebGL2
    ? { internalFormat: (gl as any).RG16F, format: (gl as any).RG }
    : { internalFormat: gl.RGBA, format: gl.RGBA };

  const formatR = isWebGL2
    ? { internalFormat: (gl as any).R16F, format: (gl as any).RED }
    : { internalFormat: gl.RGBA, format: gl.RGBA };

  return { gl, isWebGL2, halfFloatTexType, supportLinearFiltering, formatRGBA, formatRG, formatR };
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vertSrc: string, fragSrc: string) {
  const vert = compileShader(gl, gl.VERTEX_SHADER, vertSrc);
  const frag = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc);
  if (!vert || !frag) return null;
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vert);
  gl.attachShader(prog, frag);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(prog));
    return null;
  }
  return prog;
}

function getUniforms(gl: WebGLRenderingContext, program: WebGLProgram) {
  const uniforms: Record<string, WebGLUniformLocation> = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i++) {
    const info = gl.getActiveUniform(program, i);
    if (info) {
      const loc = gl.getUniformLocation(program, info.name);
      if (loc) uniforms[info.name] = loc;
    }
  }
  return uniforms;
}

class GLProgram {
  program: WebGLProgram;
  uniforms: Record<string, WebGLUniformLocation>;
  constructor(public gl: WebGLRenderingContext, vertSrc: string, fragSrc: string) {
    this.program = createProgram(gl, vertSrc, fragSrc)!;
    this.uniforms = getUniforms(gl, this.program);
  }
  bind() {
    this.gl.useProgram(this.program);
  }
}

interface FBO {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  attach: (id: number) => number;
}

interface DoubleFBO {
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  read: FBO;
  write: FBO;
  swap: () => void;
}

function createFBO(
  gl: WebGLRenderingContext,
  w: number, h: number,
  internalFormat: number, format: number,
  type: number, filter: number
): FBO {
  gl.activeTexture(gl.TEXTURE0);
  const texture = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

  const fbo = gl.createFramebuffer()!;
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  gl.viewport(0, 0, w, h);
  gl.clear(gl.COLOR_BUFFER_BIT);

  return {
    texture, fbo, width: w, height: h,
    attach(id: number) {
      gl.activeTexture(gl.TEXTURE0 + id);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      return id;
    },
  };
}

function createDoubleFBO(
  gl: WebGLRenderingContext,
  w: number, h: number,
  internalFormat: number, format: number,
  type: number, filter: number
): DoubleFBO {
  let fbo1 = createFBO(gl, w, h, internalFormat, format, type, filter);
  let fbo2 = createFBO(gl, w, h, internalFormat, format, type, filter);
  return {
    width: w, height: h,
    texelSizeX: 1.0 / w,
    texelSizeY: 1.0 / h,
    get read() { return fbo1; },
    set read(v) { fbo1 = v; },
    get write() { return fbo2; },
    set write(v) { fbo2 = v; },
    swap() { const t = fbo1; fbo1 = fbo2; fbo2 = t; },
  };
}

const baseVertexShader = `
  precision highp float;
  attribute vec2 aPosition;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform vec2 texelSize;
  void main () {
    vUv = aPosition * 0.5 + 0.5;
    vL = vUv - vec2(texelSize.x, 0.0);
    vR = vUv + vec2(texelSize.x, 0.0);
    vT = vUv + vec2(0.0, texelSize.y);
    vB = vUv - vec2(0.0, texelSize.y);
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const displayShader = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  void main () {
    vec3 c = texture2D(uTexture, vUv).rgb;
    float a = max(c.r, max(c.g, c.b));
    gl_FragColor = vec4(c, a);
  }
`;

const splatShader = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTarget;
  uniform float aspectRatio;
  uniform vec3 color;
  uniform vec2 point;
  uniform float radius;
  void main () {
    vec2 p = vUv - point.xy;
    p.x *= aspectRatio;
    vec3 splat = exp(-dot(p, p) / radius) * color;
    vec3 base = texture2D(uTarget, vUv).xyz;
    gl_FragColor = vec4(base + splat, 1.0);
  }
`;

const advectionShader = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 texelSize;
  uniform float dt;
  uniform float dissipation;
  void main () {
    vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
    vec3 result = dissipation * texture2D(uSource, coord).xyz;
    float decay = 1.0 - 0.0002;
    gl_FragColor = vec4(result * decay, 1.0);
  }
`;

const divergenceShader = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  void main () {
    float L = texture2D(uVelocity, vL).x;
    float R = texture2D(uVelocity, vR).x;
    float T = texture2D(uVelocity, vT).y;
    float B = texture2D(uVelocity, vB).y;
    vec2 C = texture2D(uVelocity, vUv).xy;
    if (vL.x < 0.0) L = -C.x;
    if (vR.x > 1.0) R = -C.x;
    if (vT.y > 1.0) T = -C.y;
    if (vB.y < 0.0) B = -C.y;
    float div = 0.5 * (R - L + T - B);
    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
  }
`;

const curlShader = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  void main () {
    float L = texture2D(uVelocity, vL).y;
    float R = texture2D(uVelocity, vR).y;
    float T = texture2D(uVelocity, vT).x;
    float B = texture2D(uVelocity, vB).x;
    float vorticity = R - L - T + B;
    gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
  }
`;

const vorticityShader = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  uniform sampler2D uCurl;
  uniform float curl;
  uniform float dt;
  void main () {
    float L = texture2D(uCurl, vL).x;
    float R = texture2D(uCurl, vR).x;
    float T = texture2D(uCurl, vT).x;
    float B = texture2D(uCurl, vB).x;
    float C = texture2D(uCurl, vUv).x;
    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
    force /= length(force) + 0.0001;
    force *= curl * C;
    force.y *= -1.0;
    vec2 vel = texture2D(uVelocity, vUv).xy;
    gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
  }
`;

const pressureShader = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;
  void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    float C = texture2D(uPressure, vUv).x;
    float divergence = texture2D(uDivergence, vUv).x;
    float pressure = (L + R + B + T - divergence) * 0.25;
    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
  }
`;

const gradientSubtractShader = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;
  void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    vec2 vel = texture2D(uVelocity, vUv).xy;
    vel.xy -= vec2(R - L, T - B);
    gl_FragColor = vec4(vel, 0.0, 1.0);
  }
`;

const clearShader = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float value;
  void main () {
    gl_FragColor = value * texture2D(uTexture, vUv);
  }
`;

function HSVtoRGB(h: number, s: number, v: number) {
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  let r: number, g: number, b: number;
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    default: r = v; g = p; b = q; break;
  }
  return { r, g, b };
}

function generateColor() {
  const c = HSVtoRGB(Math.random(), 1.0, 1.0);
  c.r *= 0.15;
  c.g *= 0.15;
  c.b *= 0.15;
  return c;
}

export default function ExperiencePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const configRef = useRef<FluidConfig>({ ...DEFAULT_CONFIG });
  const splatQueueRef = useRef<Array<{ x: number; y: number; dx: number; dy: number }>>([]);

  const [config, setConfig] = useState<FluidConfig>({ ...DEFAULT_CONFIG });
  const [showSettings, setShowSettings] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(true);
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

  const hintDismissedRef = useRef(false);
  const dismissHint = useCallback(() => {
    if (!hintDismissedRef.current) {
      hintDismissedRef.current = true;
      setShowHint(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const randomSplats = useCallback(() => {
    const count = Math.floor(Math.random() * 10) + 5;
    for (let i = 0; i < count; i++) {
      splatQueueRef.current.push({
        x: Math.random(),
        y: Math.random(),
        dx: (Math.random() - 0.5) * 1000,
        dy: (Math.random() - 0.5) * 1000,
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = getWebGLContext(canvas);
    if (!ctx) return;
    const { gl, halfFloatTexType, supportLinearFiltering, formatRGBA, formatRG, formatR } = ctx;

    const SIM_RES = 128;
    const DYE_RES = 1024;

    const blit = (() => {
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
      const idxBuf = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuf);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);

      return (target: FBO | null) => {
        if (target) {
          gl.viewport(0, 0, target.width, target.height);
          gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        } else {
          gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      };
    })();

    const texFilter = supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    const getResolution = (res: number) => {
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
      const min = Math.round(res);
      const max = Math.round(res * aspectRatio);
      return gl.drawingBufferWidth > gl.drawingBufferHeight
        ? { width: max, height: min }
        : { width: min, height: max };
    };

    const simRes = getResolution(SIM_RES);
    const dyeRes = getResolution(DYE_RES);

    let dye = createDoubleFBO(gl, dyeRes.width, dyeRes.height, formatRGBA.internalFormat, formatRGBA.format, halfFloatTexType, texFilter);
    let velocity = createDoubleFBO(gl, simRes.width, simRes.height, formatRG.internalFormat, formatRG.format, halfFloatTexType, texFilter);
    let divergenceFBO = createFBO(gl, simRes.width, simRes.height, formatR.internalFormat, formatR.format, halfFloatTexType, gl.NEAREST);
    let curlFBO = createFBO(gl, simRes.width, simRes.height, formatR.internalFormat, formatR.format, halfFloatTexType, gl.NEAREST);
    let pressure = createDoubleFBO(gl, simRes.width, simRes.height, formatR.internalFormat, formatR.format, halfFloatTexType, gl.NEAREST);

    const displayProg = new GLProgram(gl, baseVertexShader, displayShader);
    const splatProg = new GLProgram(gl, baseVertexShader, splatShader);
    const advectionProg = new GLProgram(gl, baseVertexShader, advectionShader);
    const divergenceProg = new GLProgram(gl, baseVertexShader, divergenceShader);
    const curlProg = new GLProgram(gl, baseVertexShader, curlShader);
    const vorticityProg = new GLProgram(gl, baseVertexShader, vorticityShader);
    const pressureProg = new GLProgram(gl, baseVertexShader, pressureShader);
    const gradSubProg = new GLProgram(gl, baseVertexShader, gradientSubtractShader);
    const clearProg = new GLProgram(gl, baseVertexShader, clearShader);

    const aPos = gl.getAttribLocation(displayProg.program, "aPosition");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    function splatAt(x: number, y: number, dx: number, dy: number, color?: { r: number; g: number; b: number }) {
      const c = color || generateColor();
      splatProg.bind();
      gl.uniform1i(splatProg.uniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(splatProg.uniforms.aspectRatio, canvas!.width / canvas!.height);
      gl.uniform2f(splatProg.uniforms.point, x, y);
      gl.uniform3f(splatProg.uniforms.color, dx, dy, 0.0);
      gl.uniform1f(splatProg.uniforms.radius, correctRadius(configRef.current.splatRadius));
      blit(velocity.write);
      velocity.swap();

      gl.uniform1i(splatProg.uniforms.uTarget, dye.read.attach(0));
      gl.uniform3f(splatProg.uniforms.color, c.r, c.g, c.b);
      blit(dye.write);
      dye.swap();
    }

    function correctRadius(r: number) {
      const aspect = canvas!.width / canvas!.height;
      if (aspect > 1) return r * aspect;
      return r;
    }

    const pointers: Array<{
      id: number;
      texcoordX: number;
      texcoordY: number;
      prevTexcoordX: number;
      prevTexcoordY: number;
      deltaX: number;
      deltaY: number;
      down: boolean;
      moved: boolean;
      color: { r: number; g: number; b: number };
    }> = [{
      id: -1,
      texcoordX: 0, texcoordY: 0,
      prevTexcoordX: 0, prevTexcoordY: 0,
      deltaX: 0, deltaY: 0,
      down: false, moved: false,
      color: generateColor(),
    }];

    function updatePointerDownData(pointer: typeof pointers[0], id: number, posX: number, posY: number) {
      pointer.id = id;
      pointer.down = true;
      pointer.moved = false;
      pointer.texcoordX = posX / canvas!.clientWidth;
      pointer.texcoordY = 1.0 - posY / canvas!.clientHeight;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.deltaX = 0;
      pointer.deltaY = 0;
      pointer.color = generateColor();
      splatAt(pointer.texcoordX, pointer.texcoordY, 0, 0, pointer.color);
    }

    function updatePointerMoveData(pointer: typeof pointers[0], posX: number, posY: number) {
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.texcoordX = posX / canvas!.clientWidth;
      pointer.texcoordY = 1.0 - posY / canvas!.clientHeight;
      pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
      pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
      pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
    }

    function correctDeltaX(delta: number) {
      const aspect = canvas!.width / canvas!.height;
      if (aspect < 1) delta *= aspect;
      return delta;
    }

    function correctDeltaY(delta: number) {
      const aspect = canvas!.width / canvas!.height;
      if (aspect > 1) delta /= aspect;
      return delta;
    }

    const onMouseDown = (e: MouseEvent) => {
      dismissHint();
      const rect = canvas!.getBoundingClientRect();
      const posX = e.clientX - rect.left;
      const posY = e.clientY - rect.top;
      updatePointerDownData(pointers[0], -1, posX, posY);
    };

    const onMouseMove = (e: MouseEvent) => {
      dismissHint();
      const rect = canvas!.getBoundingClientRect();
      const posX = e.clientX - rect.left;
      const posY = e.clientY - rect.top;
      if (!pointers[0].down) {
        pointers[0].down = true;
        pointers[0].color = generateColor();
        pointers[0].texcoordX = posX / canvas!.clientWidth;
        pointers[0].texcoordY = 1.0 - posY / canvas!.clientHeight;
        pointers[0].prevTexcoordX = pointers[0].texcoordX;
        pointers[0].prevTexcoordY = pointers[0].texcoordY;
      }
      updatePointerMoveData(pointers[0], posX, posY);
    };

    const onMouseUp = () => {
      pointers[0].down = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      dismissHint();
      const touches = e.targetTouches;
      const rect = canvas!.getBoundingClientRect();
      while (pointers.length < touches.length) {
        pointers.push({
          id: -1, texcoordX: 0, texcoordY: 0,
          prevTexcoordX: 0, prevTexcoordY: 0,
          deltaX: 0, deltaY: 0,
          down: false, moved: false,
          color: generateColor(),
        });
      }
      for (let i = 0; i < touches.length; i++) {
        const posX = touches[i].clientX - rect.left;
        const posY = touches[i].clientY - rect.top;
        updatePointerDownData(pointers[i], touches[i].identifier, posX, posY);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      const touches = e.targetTouches;
      const rect = canvas!.getBoundingClientRect();
      for (let i = 0; i < touches.length; i++) {
        const ptr = pointers.find(p => p.id === touches[i].identifier);
        if (!ptr || !ptr.down) continue;
        const posX = touches[i].clientX - rect.left;
        const posY = touches[i].clientY - rect.top;
        updatePointerMoveData(ptr, posX, posY);
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      const touches = e.changedTouches;
      for (let i = 0; i < touches.length; i++) {
        const ptr = pointers.find(p => p.id === touches[i].identifier);
        if (ptr) ptr.down = false;
      }
    };

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    let lastTime = Date.now();
    let paused = false;

    function step() {
      const now = Date.now();
      let dt = (now - lastTime) / 1000;
      dt = Math.min(dt, 0.016666);
      lastTime = now;

      if (paused) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      const cfg = configRef.current;

      gl.disable(gl.BLEND);

      while (splatQueueRef.current.length > 0) {
        const s = splatQueueRef.current.pop()!;
        splatAt(s.x, s.y, s.dx, s.dy);
      }

      for (const p of pointers) {
        if (p.down && p.moved) {
          p.moved = false;
          const dx = p.deltaX * 5000;
          const dy = p.deltaY * 5000;
          splatAt(p.texcoordX, p.texcoordY, dx, dy, p.color);
        }
      }

      // 1. Curl
      curlProg.bind();
      gl.uniform2f(curlProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(curlProg.uniforms.uVelocity, velocity.read.attach(0));
      blit(curlFBO);

      // 2. Vorticity confinement
      vorticityProg.bind();
      gl.uniform2f(vorticityProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(vorticityProg.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(vorticityProg.uniforms.uCurl, curlFBO.attach(1));
      gl.uniform1f(vorticityProg.uniforms.curl, cfg.curl);
      gl.uniform1f(vorticityProg.uniforms.dt, dt);
      blit(velocity.write);
      velocity.swap();

      // 3. Divergence
      divergenceProg.bind();
      gl.uniform2f(divergenceProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(divergenceProg.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergenceFBO);

      // 4. Clear pressure (decay towards zero)
      clearProg.bind();
      gl.uniform1i(clearProg.uniforms.uTexture, pressure.read.attach(0));
      gl.uniform1f(clearProg.uniforms.value, cfg.pressureDiffusion);
      blit(pressure.write);
      pressure.swap();

      // 5. Pressure solve (Jacobi iterations)
      pressureProg.bind();
      gl.uniform2f(pressureProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(pressureProg.uniforms.uDivergence, divergenceFBO.attach(0));
      for (let i = 0; i < cfg.pressureIterations; i++) {
        gl.uniform1i(pressureProg.uniforms.uPressure, pressure.read.attach(1));
        blit(pressure.write);
        pressure.swap();
      }

      // 6. Gradient subtract (make velocity divergence-free)
      gradSubProg.bind();
      gl.uniform2f(gradSubProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gradSubProg.uniforms.uPressure, pressure.read.attach(0));
      gl.uniform1i(gradSubProg.uniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write);
      velocity.swap();

      // 7. Advect velocity
      advectionProg.bind();
      gl.uniform2f(advectionProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      const velId = velocity.read.attach(0);
      gl.uniform1i(advectionProg.uniforms.uVelocity, velId);
      gl.uniform1i(advectionProg.uniforms.uSource, velId);
      gl.uniform1f(advectionProg.uniforms.dt, dt);
      gl.uniform1f(advectionProg.uniforms.dissipation, cfg.velocityDiffusion);
      blit(velocity.write);
      velocity.swap();

      // 8. Advect dye
      gl.uniform1i(advectionProg.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advectionProg.uniforms.uSource, dye.read.attach(1));
      gl.uniform1f(advectionProg.uniforms.dissipation, cfg.densityDiffusion);
      blit(dye.write);
      dye.swap();

      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);

      displayProg.bind();
      gl.uniform1i(displayProg.uniforms.uTexture, dye.read.attach(0));
      blit(null);

      rafRef.current = requestAnimationFrame(step);
    }

    step();

    const handleVisibility = () => { paused = document.hidden; };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
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

      {showHint && (
        <div
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          style={{ animation: "fadeOut 4s ease-in-out forwards" }}
          data-testid="hint-text"
        >
          <p className="text-white/70 text-lg sm:text-2xl font-light tracking-wide text-center px-6">
            Touch anywhere for magic
          </p>
        </div>
      )}

      <div className="absolute bottom-16 right-4 sm:right-6 flex flex-col sm:flex-row items-end sm:items-center gap-2 z-20">
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
          className="absolute top-14 right-0 w-72 sm:w-80 bg-gray-900/90 backdrop-blur-md border-l border-white/10 p-4 z-30 flex flex-col gap-3 overflow-y-auto"
          style={{ bottom: 48 }}
          data-testid="panel-settings"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-white/70 text-xs font-medium uppercase tracking-wider">Settings</span>
            <Button
              size="icon"
              variant="ghost"
              className="text-white/60 hover:text-white"
              onClick={() => setShowSettings(false)}
              data-testid="button-close-settings"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
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

      <footer className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-3 bg-black/60 backdrop-blur-sm border-t border-white/10" data-testid="footer-experience">
        <span className="text-white/50 text-xs hidden sm:block">Protect the Birthplace of Goa Trance</span>
        <a
          href={PETITION_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto"
        >
          <Button
            variant="outline"
            className="bg-white/10 border-white/20 text-white text-xs gap-1.5"
            data-testid="button-sign-petition-footer"
          >
            Sign the Petition
            <ExternalLink className="w-3 h-3" />
          </Button>
        </a>
      </footer>
    </div>
  );
}
