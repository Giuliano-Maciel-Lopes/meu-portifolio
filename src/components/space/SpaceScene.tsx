import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
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

type Motion = { travel: number; velocity: number; mx: number; my: number };

/* ------------------------------------------------------------------ */
/* Controlador: lê scroll e mouse, calcula travel/velocidade           */
/* ------------------------------------------------------------------ */
function useTravel(reduced: boolean) {
  const motion = useRef<Motion>({ travel: 0, velocity: 0, mx: 0, my: 0 });
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
    vAlpha = twinkle * near * far;
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
type Shape = "ico" | "octa" | "dode" | "torus" | "knot" | "planet";
type Obj = { shape: Shape; x: number; y: number; z: number; s: number; wire?: boolean; spin: number };

const SPAN = 180; // distância de repetição dos objetos

// objetos ficam nas laterais (|x| alto) para nunca cobrir o conteúdo
const OBJECTS: Obj[] = [
  { shape: "ico", x: 13, y: 4, z: -20, s: 1.6, spin: 0.35 },
  { shape: "torus", x: -15, y: -4, z: -40, s: 2, wire: true, spin: 0.25 },
  { shape: "octa", x: -13, y: 6, z: -62, s: 1.5, spin: 0.5 },
  { shape: "planet", x: 22, y: -3, z: -88, s: 4.5, spin: 0.08 },
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
    case "knot":
      return <torusKnotGeometry args={[0.8, 0.25, 128, 16]} />;
    default:
      return <sphereGeometry args={[1, 48, 48]} />;
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

  const isPlanet = o.shape === "planet";

  return (
    <group ref={ref} position={[o.x, o.y, o.z]} scale={o.s}>
      <group ref={inner}>
        <mesh>
          <Geometry shape={o.shape} />
          {o.wire ? (
            <meshBasicMaterial color="#FFC857" wireframe transparent opacity={0.7} fog={false} />
          ) : (
            <meshStandardMaterial
              color={isPlanet ? "#B8864B" : "#D4A373"}
              metalness={isPlanet ? 0.6 : 1}
              roughness={isPlanet ? 0.55 : 0.22}
              flatShading={!isPlanet && o.shape !== "knot"}
              envMapIntensity={1.4}
            />
          )}
        </mesh>
        {isPlanet && (
          <mesh rotation={[Math.PI / 2.3, 0.2, 0]}>
            <ringGeometry args={[1.45, 2.3, 96]} />
            <meshBasicMaterial color="#FFC857" side={THREE.DoubleSide} transparent opacity={0.35} />
          </mesh>
        )}
      </group>
    </group>
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
      <directionalLight position={[5, 6, 4]} intensity={1.6} color="#FFE2A8" />
      <pointLight position={[0, 0, 6]} intensity={60} color="#FFE2A8" distance={80} decay={1.5} />
      <Stars count={lite ? 1400 : 4200} motion={motion} />
      {!lite && <WarpLines count={420} motion={motion} />}
      <Nebulas motion={motion} />
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
  return (
    <Canvas
      dpr={lite ? 1 : [1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 260 }}
      gl={{ antialias: !lite, alpha: false, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor("#000000")}
      style={{ pointerEvents: "none" }}
    >
      <Scene lite={lite} reduced={reduced} />
    </Canvas>
  );
}
