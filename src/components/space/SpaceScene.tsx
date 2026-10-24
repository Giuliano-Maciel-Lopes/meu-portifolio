import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, PerformanceMonitor, Preload, useTexture } from "@react-three/drei";
import * as THREE from "three";

/**
 * Fundo 3D global: viagem pelo espaço guiada pelo scroll.
 * - Estrelas em túnel que vêm na direção da câmera (wrap infinito)
 * - Riscos de "dobra espacial" que esticam conforme a velocidade do scroll
 * - Objetos dourados flutuando ao lado do conteúdo
 * - Nebulosas douradas suaves
 * Nada aqui chama setState em useFrame: tudo vive em refs/uniforms.
 */

const DEPTH = 220; // comprimento do túnel de estrelas
const SCROLL_TO_TRAVEL = 0.045; // unidades 3D por pixel de scroll
const GOLD = ["#FFC857", "#D4A373", "#F5E6C8", "#A67C52", "#FFFFFF"];

type Motion = { travel: number; velocity: number; mx: number; my: number; scrollY: number };

/* ------------------------------------------------------------------ */
/* Controlador: lê scroll e mouse, calcula travel/velocidade           */
/* ------------------------------------------------------------------ */
function useTravel(reduced: boolean) {
  const motion = useRef<Motion>({ travel: 0, velocity: 0, mx: 0, my: 0, scrollY: 0 });
  const target = useRef({ mx: 0, my: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.mx = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.my = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const start = useRef<number | null>(null);
  const drift = useRef(0);

  useFrame((state, delta) => {
    const m = motion.current;
    const dt = Math.min(delta, 0.05);
    if (start.current === null) start.current = state.clock.elapsedTime;
    const t = state.clock.elapsedTime - start.current;

    // "salto para o hiperespaço" na entrada: rápido e desacelera
    const intro = reduced ? 0 : Math.pow(Math.max(0, 1 - t / 2.6), 2) * 70;
    drift.current += (reduced ? 0 : 0.9 + intro) * dt;

    m.scrollY = window.scrollY;
    const scrollTravel = reduced ? 0 : window.scrollY * SCROLL_TO_TRAVEL;
    const next = scrollTravel + drift.current;
    const v = (next - m.travel) / Math.max(dt, 0.001);
    m.travel = next;
    m.velocity += (Math.abs(v) - m.velocity) * Math.min(1, dt * 6);

    m.mx += (target.current.mx - m.mx) * Math.min(1, dt * 2.5);
    m.my += (target.current.my - m.my) * Math.min(1, dt * 2.5);
  });

  return motion;
}

/* ------------------------------------------------------------------ */
/* Estrelas                                                            */
/* ------------------------------------------------------------------ */
const starVertex = /* glsl */ `
  uniform float uTravel;
  uniform float uDepth;
  uniform float uPixelRatio;
  uniform float uTime;
  attribute float aSize;
  attribute float aSeed;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.z = mod(p.z + uTravel, uDepth) - uDepth + 6.0;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float twinkle = 0.65 + 0.35 * sin(uTime * (1.5 + aSeed * 3.0) + aSeed * 40.0);
    gl_PointSize = max(aSize * uPixelRatio * (160.0 / -mv.z), 1.2 * uPixelRatio);
    float near = smoothstep(0.0, 3.0, -mv.z);
    float far = smoothstep(uDepth, uDepth * 0.7, -mv.z);
    // estrelas mais suaves atrás da coluna de conteúdo, para não brigar com o texto
    float ndcX = gl_Position.x / gl_Position.w;
    float side = mix(0.45, 1.0, smoothstep(0.35, 0.8, abs(ndcX)));
    vAlpha = twinkle * near * far * side;
    vColor = aColor;
  }
`;
const starFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.5, 0.0, d);
    float a = pow(core, 1.6) * vAlpha * 1.4;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor, a);
  }
`;

function Stars({ count, motion }: { count: number; motion: React.MutableRefObject<Motion> }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { gl } = useThree();

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const seed = new Float32Array(count);
    const col = new Float32Array(count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      // distribuição em "túnel": mais densa nas bordas, abre espaço no centro
      const r = 3 + Math.pow(Math.random(), 0.7) * 55;
      const a = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = Math.sin(a) * r * 0.65;
      pos[i * 3 + 2] = -Math.random() * DEPTH;
      size[i] = Math.random() < 0.06 ? 3.2 + Math.random() * 2 : 0.8 + Math.random() * 1.6;
      seed[i] = Math.random();
      c.set(GOLD[Math.random() < 0.55 ? 4 : Math.floor(Math.random() * 4)]);
      col.set([c.r, c.g, c.b], i * 3);
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    g.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTravel: { value: 0 },
      uDepth: { value: DEPTH },
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 1.5) },
    }),
    [gl]
  );

  useFrame((state) => {
    if (!mat.current) return;
    mat.current.uniforms.uTravel.value = motion.current.travel;
    mat.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <points geometry={geo} frustumCulled={false}>
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={starVertex}
        fragmentShader={starFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Riscos de velocidade (efeito dobra espacial)                        */
/* ------------------------------------------------------------------ */
const warpVertex = /* glsl */ `
  uniform float uTravel;
  uniform float uDepth;
  uniform float uStretch;
  attribute float aEnd;
  varying float vAlpha;
  varying float vEnd;
  void main() {
    vec3 p = position;
    p.z = mod(p.z + uTravel, uDepth) - uDepth + 6.0;
    p.z -= aEnd * uStretch;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    vAlpha = smoothstep(uDepth, uDepth * 0.4, -mv.z) * smoothstep(0.0, 6.0, -mv.z);
    vEnd = aEnd;
  }
`;
const warpFragment = /* glsl */ `
  uniform float uOpacity;
  varying float vAlpha;
  varying float vEnd;
  void main() {
    float a = vAlpha * uOpacity * (1.0 - vEnd);
    gl_FragColor = vec4(1.0, 0.82, 0.48, a);
  }
`;

function WarpLines({ count, motion }: { count: number; motion: React.MutableRefObject<Motion> }) {
  const mat = useRef<THREE.ShaderMaterial>(null);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 6);
    const end = new Float32Array(count * 2);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 40;
      const a = Math.random() * Math.PI * 2;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r * 0.65;
      const z = -Math.random() * DEPTH;
      pos.set([x, y, z, x, y, z], i * 6);
      end.set([0, 1], i * 2);
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aEnd", new THREE.BufferAttribute(end, 1));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTravel: { value: 0 },
      uDepth: { value: DEPTH },
      uStretch: { value: 0 },
      uOpacity: { value: 0 },
    }),
    []
  );

  useFrame(() => {
    if (!mat.current) return;
    const v = motion.current.velocity;
    const u = mat.current.uniforms;
    u.uTravel.value = motion.current.travel;
    u.uStretch.value = Math.min(v * 0.22, 26);
    u.uOpacity.value = THREE.MathUtils.clamp((v - 4) / 40, 0, 0.75);
  });

  return (
    <lineSegments geometry={geo} frustumCulled={false}>
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={warpVertex}
        fragmentShader={warpFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

/* ------------------------------------------------------------------ */
/* Nebulosas douradas                                                  */
/* ------------------------------------------------------------------ */
function useGlowTexture() {
  return useMemo(() => {
    const s = 256;
    const cv = document.createElement("canvas");
    cv.width = cv.height = s;
    const ctx = cv.getContext("2d")!;
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.25, "rgba(255,255,255,0.45)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

const NEBULAS = [
  { x: -26, y: 10, z: -40, s: 60, c: "#A67C52", o: 0.22 },
  { x: 30, y: -14, z: -95, s: 80, c: "#D4A373", o: 0.16 },
  { x: -18, y: -18, z: -150, s: 70, c: "#FFC857", o: 0.12 },
  { x: 22, y: 16, z: -200, s: 90, c: "#7A4E2A", o: 0.2 },
];

function Nebulas({ motion }: { motion: React.MutableRefObject<Motion> }) {
  const tex = useGlowTexture();
  const refs = useRef<(THREE.Sprite | null)[]>([]);
  useFrame(() => {
    const travel = motion.current.travel * 0.35; // paralaxe: mais lentas que as estrelas
    NEBULAS.forEach((n, i) => {
      const s = refs.current[i];
      if (s) s.position.z = ((n.z + travel) % DEPTH + DEPTH) % DEPTH - DEPTH + 10;
    });
  });
  return (
    <>
      {NEBULAS.map((n, i) => (
        <sprite
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={[n.x, n.y, n.z]}
          scale={[n.s, n.s * 0.7, 1]}
        >
          <spriteMaterial
            map={tex}
            color={n.c}
            transparent
            opacity={n.o}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Objetos dourados                                                    */
/* ------------------------------------------------------------------ */
type Shape = "ico" | "octa" | "dode" | "torus" | "knot";
type Obj = { shape: Shape; x: number; y: number; z: number; s: number; wire?: boolean; spin: number };

const SPAN = 180; // distância de repetição dos objetos

// objetos ficam nas laterais (|x| alto) para nunca cobrir o conteúdo
const OBJECTS: Obj[] = [
  { shape: "ico", x: 13, y: 4, z: -20, s: 1.6, spin: 0.35 },
  { shape: "torus", x: -15, y: -4, z: -40, s: 2, wire: true, spin: 0.25 },
  { shape: "octa", x: -13, y: 6, z: -62, s: 1.5, spin: 0.5 },
  { shape: "dode", x: -16, y: -6, z: -108, s: 1.8, wire: true, spin: 0.3 },
  { shape: "knot", x: 15, y: 7, z: -128, s: 1.5, spin: 0.4 },
  { shape: "ico", x: -18, y: 2, z: -148, s: 2.6, wire: true, spin: 0.2 },
  { shape: "octa", x: 14, y: -7, z: -168, s: 1.6, spin: 0.45 },
];

function Geometry({ shape }: { shape: Shape }) {
  switch (shape) {
    case "ico":
      return <icosahedronGeometry args={[1, 0]} />;
    case "octa":
      return <octahedronGeometry args={[1, 0]} />;
    case "dode":
      return <dodecahedronGeometry args={[1, 0]} />;
    case "torus":
      return <torusGeometry args={[1, 0.28, 16, 64]} />;
    default:
      return <torusKnotGeometry args={[0.8, 0.25, 128, 16]} />;
  }
}

function GoldObject({ o, index, motion }: { o: Obj; index: number; motion: React.MutableRefObject<Motion> }) {
  const ref = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const phase = useMemo(() => index * 1.7, [index]);

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const travel = motion.current.travel * 0.8;
    const z = ((o.z + travel) % SPAN + SPAN) % SPAN - SPAN + 8;
    g.position.z = z;
    g.position.y = o.y + Math.sin(t * 0.6 + phase) * 0.6;
    // "materializa" ao se aproximar: longe demais ele cairia no centro da tela, atrás do conteúdo
    const appear = THREE.MathUtils.smoothstep(z, -55, -28);
    g.scale.setScalar(o.s * appear);
    g.visible = appear > 0.001;
    if (inner.current) {
      const boost = 1 + Math.min(motion.current.velocity * 0.03, 3);
      inner.current.rotation.x += delta * o.spin * boost;
      inner.current.rotation.y += delta * o.spin * 0.7 * boost;
    }
  });

  return (
    <group ref={ref} position={[o.x, o.y, o.z]} scale={o.s}>
      <group ref={inner}>
        <mesh>
          <Geometry shape={o.shape} />
          {o.wire ? (
            <meshBasicMaterial color="#FFC857" wireframe transparent opacity={0.7} fog={false} />
          ) : (
            <meshStandardMaterial
              color="#D4A373"
              metalness={1}
              roughness={0.22}
              flatShading={o.shape !== "knot"}
              envMapIntensity={1.4}
            />
          )}
        </mesh>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Planetas da NASA: aparecem só depois da home, ancorados nas seções  */
/* ------------------------------------------------------------------ */
type PlanetDef = {
  texture: string;
  anchor: string; // id da seção onde o planeta passa
  x: number;
  y: number;
  radius: number;
  tilt: number;
};

// Textura de domínio público: Blue Marble (Terra), NASA. A Lua tem pouso próprio (MoonLanding)
const PLANETS: PlanetDef[] = [
  { texture: "/models/planets/earth.jpg", anchor: "projects", x: 24, y: -4, radius: 5.5, tilt: 0.41 },
];

const PLANET_FAR = -60;
const PLANET_NEAR = 6;

function NasaPlanet({ def, motion }: { def: PlanetDef; motion: React.MutableRefObject<Motion> }) {
  const texture = useTexture(def.texture);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  const group = useRef<THREE.Group>(null);
  const globe = useRef<THREE.Mesh>(null);
  const anchorTop = useRef<number | null>(null);
  const anchorHeight = useRef(1);

  useEffect(() => {
    const measure = () => {
      const el = document.getElementById(def.anchor);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      anchorTop.current = rect.top + window.scrollY;
      anchorHeight.current = Math.max(rect.height, window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, [def.anchor]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g || anchorTop.current === null) return;
    const vh = window.innerHeight;
    // 0 quando a seção começa a entrar na tela, 1 quando ela termina de sair
    const p = (motion.current.scrollY - (anchorTop.current - vh)) / (anchorHeight.current + vh);
    const visible = p > 0 && p < 1;
    g.visible = visible;
    if (!visible) return;
    const eased = p * p * (3 - 2 * p);
    g.position.set(def.x, def.y + Math.sin(state.clock.elapsedTime * 0.3) * 0.4, THREE.MathUtils.lerp(PLANET_FAR, PLANET_NEAR, eased));
    // cresce do nada ao surgir, para não aparecer atrás do texto no centro da tela
    g.scale.setScalar(THREE.MathUtils.smoothstep(p, 0.05, 0.3));
    if (globe.current) globe.current.rotation.y += delta * 0.06;
  });

  return (
    <group ref={group} visible={false} rotation={[def.tilt, 0, 0]}>
      <mesh ref={globe}>
        <sphereGeometry args={[def.radius, 64, 64]} />
        <meshStandardMaterial map={texture} roughness={0.9} metalness={0} />
      </mesh>
      {/* halo atmosférico dourado */}
      <mesh scale={1.06}>
        <sphereGeometry args={[def.radius, 48, 48]} />
        <meshBasicMaterial color="#FFC857" transparent opacity={0.08} side={THREE.BackSide} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Pouso na Lua: a Lua cresce no fundo até quase encostar na tela e    */
/* o fundo vira a superfície lunar enquanto a seção de skills está ali */
/* ------------------------------------------------------------------ */
const MOON_ANCHOR = "skills";
const MOON_Z = -120;
const MOON_MIN_SCALE = 2; // raio da Lua quando surge no fundo
const MOON_GROWTH = 55; // crescimento total (exponencial, sensação de aproximação)
const MOON_SWING_X = 70; // abertura do zigue-zague na chegada (esquerda → direita → centro)
const MOON_SWING_Y = 22;
const MOON_TURNS = 1.25; // voltas da espiral até parar no centro
const SURFACE_DISTANCE = 240; // a foto fica no fundo da cena, atrás das estrelas (far = 260)
const SURFACE_ROLL = 0.18; // giro da foto que assenta no pouso, continuando a espiral

function MoonLanding({ motion }: { motion: React.MutableRefObject<Motion> }) {
  // CGI Moon Kit / LRO e foto do Hadley Delta pela Apollo 15 (AS15-87-11748), NASA, domínio público
  const [moonMap, surfaceMap] = useTexture(["/models/planets/moon.jpg", "/models/planets/moon-surface.jpg"]);
  moonMap.colorSpace = THREE.SRGBColorSpace;
  surfaceMap.colorSpace = THREE.SRGBColorSpace;
  const { camera } = useThree();
  const moon = useRef<THREE.Mesh>(null);
  const moonMat = useRef<THREE.MeshStandardMaterial>(null);
  const surface = useRef<THREE.Mesh>(null);
  const surfaceMat = useRef<THREE.MeshBasicMaterial>(null);
  const anchor = useRef<{ top: number; bottom: number } | null>(null);
  const forward = useMemo(() => new THREE.Vector3(), []);
  const up = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const measure = () => {
      const el = document.getElementById(MOON_ANCHOR);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      anchor.current = { top: rect.top + window.scrollY, bottom: rect.bottom + window.scrollY };
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, []);

  useFrame((state) => {
    const m = moon.current;
    const s = surface.current;
    const a = anchor.current;
    if (!m || !s || !moonMat.current || !surfaceMat.current || !a) return;
    const vh = window.innerHeight;
    const y = motion.current.scrollY;
    // aproximação: da saída do hero até o título das skills chegar ao topo
    const arrive = THREE.MathUtils.smoothstep(y, a.top - vh * 0.95, a.top - vh * 0.1);
    // decolagem: quando o fim da seção chega ao pé da tela
    const leave = THREE.MathUtils.smoothstep(y, a.bottom - vh, a.bottom - vh * 0.3);
    // percurso dentro da seção: 0 logo após o pouso, 1 no início da decolagem
    const explore = THREE.MathUtils.smoothstep(y, a.top - vh * 0.1, a.bottom - vh);
    // pouso: a bola quase encosta na tela e o fundo vira a superfície
    const touchdown = THREE.MathUtils.smootherstep(arrive, 0.7, 0.99) * (1 - THREE.MathUtils.smoothstep(leave, 0, 0.35));

    // a bola some enquanto a foto da superfície aparece por trás dela
    moonMat.current.opacity = 1 - touchdown;
    m.visible = arrive > 0.001 && leave < 0.999 && touchdown < 0.999;
    if (m.visible) {
      // na decolagem a Lua diminui e cai para baixo da nave
      const scale = MOON_MIN_SCALE * Math.pow(MOON_GROWTH, arrive) * (1 - 0.85 * leave);
      m.scale.setScalar(scale);
      // chegada em espiral: começa na esquerda, cruza para a direita e assenta no centro
      const swing = 1 - arrive;
      const angle = Math.PI * 2 * MOON_TURNS * arrive;
      m.position.set(
        -MOON_SWING_X * swing * Math.cos(angle),
        MOON_SWING_Y * swing * Math.sin(angle) - leave * 90,
        MOON_Z
      );
      // gira sobre o próprio eixo na aproximação e desacelera ao pousar
      m.rotation.y = Math.PI * 1.5 * (1 - swing * swing) + state.clock.elapsedTime * 0.03;
      m.rotation.z = 0.35 * swing * Math.sin(angle);
    }

    s.visible = touchdown > 0.001;
    if (s.visible) {
      // foto presa à câmera, sempre cobrindo a tela inteira (corte "cover" da foto quadrada)
      const h = 2 * SURFACE_DISTANCE * Math.tan(THREE.MathUtils.degToRad((camera as THREE.PerspectiveCamera).fov / 2));
      const image = surfaceMap.image as HTMLImageElement;
      const ratio = image.height / image.width;
      const width = Math.max((h * state.size.width) / state.size.height, h / ratio);
      const height = width * ratio;
      // zoom e giro que assentam no pouso
      const settle = 1.3 - 0.3 * touchdown;
      s.scale.set(width * settle, height * settle, 1);
      // a foto corre com a rolagem: céu no pouso, montanha no meio e o chão no fim da seção
      const pan = ((height - h) / 2) * (1 - 2 * explore);
      camera.getWorldDirection(forward);
      up.set(0, 1, 0).applyQuaternion(camera.quaternion);
      s.position.copy(camera.position).addScaledVector(forward, SURFACE_DISTANCE).addScaledVector(up, -pan);
      s.quaternion.copy(camera.quaternion);
      s.rotateZ(SURFACE_ROLL * (1 - touchdown));
      // mais clara no meio da seção, mais escura nas bordas onde ficam título e filtros
      surfaceMat.current.color.setScalar(0.24 + 0.14 * Math.sin(Math.PI * explore));
      surfaceMat.current.opacity = touchdown;
    }
  });

  return (
    <>
      <mesh ref={moon} visible={false}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial ref={moonMat} map={moonMap} roughness={1} metalness={0} transparent fog={false} />
      </mesh>
      <mesh ref={surface} visible={false} renderOrder={-1} frustumCulled={false}>
        <planeGeometry args={[1, 1]} />
        {/* brilho controlado no useFrame para o texto e os cards continuarem legíveis */}
        <meshBasicMaterial
          ref={surfaceMat}
          map={surfaceMap}
          transparent
          opacity={0}
          depthWrite={false}
          fog={false}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Câmera com paralaxe do mouse                                        */
/* ------------------------------------------------------------------ */
function CameraRig({ motion }: { motion: React.MutableRefObject<Motion> }) {
  const look = useMemo(() => new THREE.Vector3(0, 0, -60), []);
  useFrame(({ camera }) => {
    const m = motion.current;
    camera.position.x = m.mx * 1.6;
    camera.position.y = -m.my * 1.0;
    // leve "roll" ao rolar rápido, sensação de nave
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, m.mx * 0.04, 0.05);
    camera.lookAt(look);
  });
  return null;
}

function Scene({ lite, reduced }: { lite: boolean; reduced: boolean }) {
  const motion = useTravel(reduced);
  return (
    <>
      <fog attach="fog" args={["#000000", 40, 170]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[-6, 4, 6]} intensity={2.2} color="#FFF1D6" />
      <pointLight position={[0, 0, 6]} intensity={60} color="#FFE2A8" distance={80} decay={1.5} />
      <Stars count={lite ? 1400 : 4200} motion={motion} />
      {!lite && <WarpLines count={420} motion={motion} />}
      <Nebulas motion={motion} />
      <Suspense fallback={null}>
        {PLANETS.map((def) => (
          <NasaPlanet key={def.anchor} def={def} motion={motion} />
        ))}
        <MoonLanding motion={motion} />
        {/* compila os shaders e sobe as texturas já no carregamento, não no meio da rolagem */}
        <Preload all />
      </Suspense>
      {(lite ? OBJECTS.filter((_, i) => i % 2 === 0) : OBJECTS).map((o, i) => (
        <GoldObject key={i} o={o} index={i} motion={motion} />
      ))}
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={4} color="#FFE2A8" position={[0, 5, -5]} scale={[10, 3, 1]} />
        <Lightformer form="ring" intensity={3} color="#FFC857" position={[-6, 0, 3]} scale={4} />
        <Lightformer form="rect" intensity={1.5} color="#ffffff" position={[6, -2, 2]} scale={[4, 6, 1]} />
      </Environment>
      <CameraRig motion={motion} />
    </>
  );
}

type SceneProps = {
  lite: boolean;
  reduced: boolean;
};

export function SpaceScene({ lite, reduced }: SceneProps) {
  // resolução cai uma vez quando o FPS não aguenta (sem voltar: cada troca realoca o canvas)
  const [dpr, setDpr] = useState(lite ? 1 : 1.5);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 260 }}
      gl={{ antialias: !lite, alpha: false, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor("#000000")}
      style={{ pointerEvents: "none" }}
    >
      {!lite && <PerformanceMonitor onDecline={() => setDpr(1)} />}
      <Scene lite={lite} reduced={reduced} />
    </Canvas>
  );
}
