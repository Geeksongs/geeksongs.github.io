/*
 * Liquid hero background: a compact WebGL2 fluid simulation (stable fluids:
 * advection, vorticity, pressure projection) that reacts to the pointer.
 * Algorithm and shader structure follow Pavel Dobryakov's WebGL-Fluid-Simulation
 * (MIT License, https://github.com/PavelDoGreat/WebGL-Fluid-Simulation).
 */
(() => {
  const hero = document.getElementById("biography");
  if (!hero) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.className = "liquid-bg";
  canvas.setAttribute("aria-hidden", "true");
  hero.prepend(canvas);

  const gl = canvas.getContext("webgl2", { alpha: true, antialias: false, premultipliedAlpha: false });
  if (!gl || !gl.getExtension("EXT_color_buffer_float")) {
    canvas.remove();
    return;
  }
  gl.getExtension("OES_texture_float_linear");

  const SIM = 128;
  const DYE = 512;
  const CFG = { pressureIter: 20, pressure: 0.8, velDissipation: 0.2, dyeDissipation: 0.7, curl: 28, radius: 0.32, force: 5200 };
  const PALETTE = [
    [0.55, 0.42, 0.95],
    [0.86, 0.5, 0.92],
    [0.45, 0.62, 0.98],
    [0.7, 0.55, 0.96],
  ];

  const VERT = `#version 300 es
  precision highp float;
  in vec2 aPos;
  out vec2 vUv; out vec2 vL; out vec2 vR; out vec2 vT; out vec2 vB;
  uniform vec2 texel;
  void main() {
    vUv = aPos * 0.5 + 0.5;
    vL = vUv - vec2(texel.x, 0.0); vR = vUv + vec2(texel.x, 0.0);
    vT = vUv + vec2(0.0, texel.y); vB = vUv - vec2(0.0, texel.y);
    gl_Position = vec4(aPos, 0.0, 1.0);
  }`;
  const FRAG_HEAD = `#version 300 es
  precision highp float; precision highp sampler2D;
  in vec2 vUv; in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB;
  out vec4 o;`;

  const SRC = {
    splat: `uniform sampler2D uTarget; uniform float aspect; uniform vec3 color; uniform vec2 point; uniform float radius;
      void main() {
        vec2 p = vUv - point; p.x *= aspect;
        vec3 s = exp(-dot(p, p) / radius) * color;
        o = vec4(texture(uTarget, vUv).xyz + s, 1.0);
      }`,
    advect: `uniform sampler2D uVelocity; uniform sampler2D uSource; uniform vec2 texel; uniform float dt; uniform float dissipation;
      void main() {
        vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * texel;
        o = texture(uSource, coord) / (1.0 + dissipation * dt);
      }`,
    divergence: `uniform sampler2D uVelocity;
      void main() {
        float L = texture(uVelocity, vL).x; float R = texture(uVelocity, vR).x;
        float T = texture(uVelocity, vT).y; float B = texture(uVelocity, vB).y;
        vec2 C = texture(uVelocity, vUv).xy;
        if (vL.x < 0.0) L = -C.x; if (vR.x > 1.0) R = -C.x;
        if (vT.y > 1.0) T = -C.y; if (vB.y < 0.0) B = -C.y;
        o = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
      }`,
    curl: `uniform sampler2D uVelocity;
      void main() {
        float L = texture(uVelocity, vL).y; float R = texture(uVelocity, vR).y;
        float T = texture(uVelocity, vT).x; float B = texture(uVelocity, vB).x;
        o = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
      }`,
    vorticity: `uniform sampler2D uVelocity; uniform sampler2D uCurl; uniform float curl; uniform float dt;
      void main() {
        float L = texture(uCurl, vL).x; float R = texture(uCurl, vR).x;
        float T = texture(uCurl, vT).x; float B = texture(uCurl, vB).x;
        float C = texture(uCurl, vUv).x;
        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C; force.y *= -1.0;
        vec2 v = texture(uVelocity, vUv).xy + force * dt;
        o = vec4(clamp(v, -1000.0, 1000.0), 0.0, 1.0);
      }`,
    pressure: `uniform sampler2D uPressure; uniform sampler2D uDivergence;
      void main() {
        float L = texture(uPressure, vL).x; float R = texture(uPressure, vR).x;
        float T = texture(uPressure, vT).x; float B = texture(uPressure, vB).x;
        float d = texture(uDivergence, vUv).x;
        o = vec4((L + R + B + T - d) * 0.25, 0.0, 0.0, 1.0);
      }`,
    gradient: `uniform sampler2D uPressure; uniform sampler2D uVelocity;
      void main() {
        float L = texture(uPressure, vL).x; float R = texture(uPressure, vR).x;
        float T = texture(uPressure, vT).x; float B = texture(uPressure, vB).x;
        vec2 v = texture(uVelocity, vUv).xy - vec2(R - L, T - B);
        o = vec4(v, 0.0, 1.0);
      }`,
    clear: `uniform sampler2D uTexture; uniform float value;
      void main() { o = value * texture(uTexture, vUv); }`,
    display: `uniform sampler2D uDye; uniform float uTime; uniform vec2 uMouse; uniform float uAspect;
      vec3 glow(vec2 uv, vec2 c, float r) {
        vec2 q = uv - c; q.x *= uAspect;
        return vec3(exp(-dot(q, q) / r));
      }
      void main() {
        // ambient lilac field: three slow blobs that lean toward the pointer
        float t = uTime;
        vec2 p1 = vec2(0.28, 0.35) + 0.10 * vec2(sin(t * 0.31), cos(t * 0.23));
        vec2 p2 = vec2(0.72, 0.62) + 0.12 * vec2(cos(t * 0.27 + 1.3), sin(t * 0.21 + 0.4));
        vec2 p3 = vec2(0.55, 0.22) + 0.09 * vec2(sin(t * 0.19 + 2.1), cos(t * 0.33 + 0.9));
        p1 += (uMouse - p1) * 0.30; p2 += (uMouse - p2) * 0.18; p3 += (uMouse - p3) * 0.42;
        float g1 = glow(vUv, p1, 0.16).x, g2 = glow(vUv, p2, 0.20).x, g3 = glow(vUv, p3, 0.10).x;
        float gs = g1 + g2 + g3;
        vec3 gc = (vec3(0.73, 0.64, 0.94) * g1 + vec3(0.90, 0.72, 0.92) * g2 + vec3(0.66, 0.77, 0.96) * g3) / max(gs, 0.001);
        float ga = clamp(gs, 0.0, 1.0) * 0.55;

        vec3 d = max(texture(uDye, vUv).rgb, 0.0);
        float m = max(d.r, max(d.g, d.b));
        float da = smoothstep(0.0, 0.8, m) * 0.6;
        vec3 dc = d / max(m, 0.001);

        float a = da + ga * (1.0 - da);
        vec3 c = (dc * da + gc * ga * (1.0 - da)) / max(a, 0.001);
        o = vec4(c, a);
      }`,
  };

  const compile = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };
  const vs = compile(gl.VERTEX_SHADER, VERT);
  const programs = {};
  let ok = !!vs;
  Object.entries(SRC).forEach(([name, body]) => {
    const fs = compile(gl.FRAGMENT_SHADER, FRAG_HEAD + body);
    if (!fs || !vs) return (ok = false);
    const p = gl.createProgram();
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.bindAttribLocation(p, 0, "aPos");
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) return (ok = false);
    const u = {};
    const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < n; i++) {
      const info = gl.getActiveUniform(p, i);
      u[info.name] = gl.getUniformLocation(p, info.name);
    }
    programs[name] = { p, u };
  });
  if (!ok) {
    canvas.remove();
    return;
  }

  const quad = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  const makeFBO = (w, h, internal, format) => {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internal, w, h, 0, format, gl.HALF_FLOAT, null);
    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    return { tex, fbo, w, h, texel: [1 / w, 1 / h] };
  };
  const makeDouble = (w, h, internal, format) => {
    let a = makeFBO(w, h, internal, format);
    let b = makeFBO(w, h, internal, format);
    return {
      w,
      h,
      texel: a.texel,
      get read() {
        return a;
      },
      get write() {
        return b;
      },
      swap() {
        [a, b] = [b, a];
      },
    };
  };

  let simW, simH, dyeW, dyeH, velocity, dye, pressure, divergence, curlFBO;
  const resolution = (base) => {
    const ratio = canvas.width / canvas.height;
    return ratio >= 1 ? [Math.round(base * ratio), base] : [base, Math.round(base / ratio)];
  };
  const initBuffers = () => {
    [simW, simH] = resolution(SIM);
    [dyeW, dyeH] = resolution(DYE);
    velocity = makeDouble(simW, simH, gl.RG16F, gl.RG);
    dye = makeDouble(dyeW, dyeH, gl.RGBA16F, gl.RGBA);
    pressure = makeDouble(simW, simH, gl.R16F, gl.RED);
    divergence = makeFBO(simW, simH, gl.R16F, gl.RED);
    curlFBO = makeFBO(simW, simH, gl.R16F, gl.RED);
  };

  const resize = () => {
    const r = hero.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.max(2, Math.round(r.width * dpr));
    const h = Math.max(2, Math.round(r.height * dpr));
    if (canvas.width === w && canvas.height === h) return;
    canvas.width = w;
    canvas.height = h;
    initBuffers();
  };

  const use = (name) => {
    gl.useProgram(programs[name].p);
    return programs[name].u;
  };
  const bindTex = (loc, tex, unit) => {
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.uniform1i(loc, unit);
  };
  const blit = (target) => {
    if (target) {
      gl.viewport(0, 0, target.w, target.h);
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    } else {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
  };
  const setTexel = (u, fbo) => gl.uniform2f(u.texel, fbo.texel[0], fbo.texel[1]);

  const splat = (x, y, dx, dy, color) => {
    let u = use("splat");
    setTexel(u, velocity);
    bindTex(u.uTarget, velocity.read.tex, 0);
    gl.uniform1f(u.aspect, canvas.width / canvas.height);
    gl.uniform2f(u.point, x, y);
    gl.uniform3f(u.color, dx, dy, 0);
    gl.uniform1f(u.radius, CFG.radius / 100);
    blit(velocity.write);
    velocity.swap();
    setTexel(u, dye);
    bindTex(u.uTarget, dye.read.tex, 0);
    gl.uniform3f(u.color, color[0], color[1], color[2]);
    blit(dye.write);
    dye.swap();
  };

  const step = (dt) => {
    let u = use("curl");
    setTexel(u, velocity);
    bindTex(u.uVelocity, velocity.read.tex, 0);
    blit(curlFBO);

    u = use("vorticity");
    setTexel(u, velocity);
    bindTex(u.uVelocity, velocity.read.tex, 0);
    bindTex(u.uCurl, curlFBO.tex, 1);
    gl.uniform1f(u.curl, CFG.curl);
    gl.uniform1f(u.dt, dt);
    blit(velocity.write);
    velocity.swap();

    u = use("divergence");
    setTexel(u, velocity);
    bindTex(u.uVelocity, velocity.read.tex, 0);
    blit(divergence);

    u = use("clear");
    setTexel(u, pressure);
    bindTex(u.uTexture, pressure.read.tex, 0);
    gl.uniform1f(u.value, CFG.pressure);
    blit(pressure.write);
    pressure.swap();

    u = use("pressure");
    setTexel(u, velocity);
    bindTex(u.uDivergence, divergence.tex, 1);
    for (let i = 0; i < CFG.pressureIter; i++) {
      bindTex(u.uPressure, pressure.read.tex, 0);
      blit(pressure.write);
      pressure.swap();
    }

    u = use("gradient");
    setTexel(u, velocity);
    bindTex(u.uPressure, pressure.read.tex, 0);
    bindTex(u.uVelocity, velocity.read.tex, 1);
    blit(velocity.write);
    velocity.swap();

    u = use("advect");
    setTexel(u, velocity);
    bindTex(u.uVelocity, velocity.read.tex, 0);
    bindTex(u.uSource, velocity.read.tex, 0);
    gl.uniform1f(u.dt, dt);
    gl.uniform1f(u.dissipation, CFG.velDissipation);
    blit(velocity.write);
    velocity.swap();

    gl.uniform2f(u.texel, dye.texel[0], dye.texel[1]);
    bindTex(u.uVelocity, velocity.read.tex, 0);
    bindTex(u.uSource, dye.read.tex, 1);
    gl.uniform1f(u.dissipation, CFG.dyeDissipation);
    blit(dye.write);
    dye.swap();
  };

  const render = () => {
    const u = use("display");
    setTexel(u, dye);
    bindTex(u.uDye, dye.read.tex, 0);
    gl.uniform1f(u.uTime, performance.now() / 1000);
    gl.uniform1f(u.uAspect, canvas.width / canvas.height);
    gl.uniform2f(u.uMouse, mouse.sx, mouse.sy);
    gl.clearColor(0, 0, 0, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
  };

  // smoothed pointer position (0..1, y up) used by the ambient glow field
  const mouse = { x: 0.5, y: 0.5, sx: 0.5, sy: 0.5 };

  // pointer input: stir the fluid wherever the cursor moves over the hero
  let last = null;
  let hue = 0;
  const onMove = (e) => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = 1 - (e.clientY - r.top) / r.height;
    if (x < 0 || x > 1 || y < 0 || y > 1) {
      last = null;
      return;
    }
    if (last) {
      const dx = (x - last.x) * CFG.force;
      const dy = (y - last.y) * CFG.force;
      if (Math.abs(dx) + Math.abs(dy) > 0.5) {
        hue = (hue + 0.07) % PALETTE.length;
        const a = PALETTE[Math.floor(hue)];
        const b = PALETTE[(Math.floor(hue) + 1) % PALETTE.length];
        const t = hue % 1;
        const c = a.map((v, i) => (v + (b[i] - v) * t) * 1.1);
        splat(x, y, dx, dy, c);
      }
    }
    mouse.x = x;
    mouse.y = y;
    last = { x, y };
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  hero.addEventListener("pointerleave", () => (last = null));

  // gentle ambient drift so the surface is alive before the first touch
  let ambient = 0;
  const idle = (t) => {
    if (t - ambient < 2600) return;
    ambient = t;
    const c = PALETTE[Math.floor(Math.random() * PALETTE.length)].map((v) => v * 0.4);
    splat(Math.random(), Math.random(), (Math.random() - 0.5) * 900, (Math.random() - 0.5) * 900, c);
  };

  let running = true;
  new IntersectionObserver((es) => (running = es[0].isIntersecting)).observe(hero);
  new ResizeObserver(resize).observe(hero);
  resize();

  let prev = performance.now();
  const frame = (now) => {
    requestAnimationFrame(frame);
    if (!running || document.hidden) {
      prev = now;
      return;
    }
    const dt = Math.min((now - prev) / 1000, 0.0166);
    prev = now;
    mouse.sx += (mouse.x - mouse.sx) * 0.05;
    mouse.sy += (mouse.y - mouse.sy) * 0.05;
    idle(now);
    step(dt);
    render();
  };
  requestAnimationFrame(frame);
})();
