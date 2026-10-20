import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, useTexture } from "@react-three/drei";
import * as THREE from "three";

/**
 * Capacete de astronauta 3D com a foto do Giuliano dentro do visor.
 * Tudo procedural (sem modelo externo): casco, visor dourado espelhado, aro dourado,
 * anel do pescoço e luzes laterais. Inclina na direção do mouse e, com o mouse em cima,
 * o visor sobe por cima do casco e revela o rosto.
 */

const R = 1.25; // raio do casco
const OPENING = 0.78; // meio-ângulo (rad) da abertura frontal do visor
const RIM_Z = R * Math.cos(OPENING);
const RIM_R = R * Math.sin(OPENING);
const VISOR_LIFT = OPENING * 2.05; // quanto o visor gira para cima quando aberto (rad)
const SPRING_STIFFNESS = 90;
const SPRING_DAMPING = 11;

type Props = {
  photo: string;
};

type HelmetProps = Props & {
  hovered: React.RefObject<boolean>;
};

function Photo({ photo }: Props) {
  const texture = useTexture(photo);
  texture.colorSpace = THREE.SRGBColorSpace;
  return (
    <mesh position={[0, 0.02, RIM_Z - 0.32]}>
      <circleGeometry args={[RIM_R * 0.98, 64]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function Helmet({ photo, hovered }: HelmetProps) {
  const group = useRef<THREE.Group>(null);
  const visor = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const lift = useRef({ value: 0, velocity: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const k = Math.min(1, delta * 3);
    g.rotation.y += (pointer.current.x * 0.45 - g.rotation.y) * k;
    g.rotation.x += (pointer.current.y * 0.25 - g.rotation.x) * k;

    // mola amortecida: o visor abre/fecha com um leve balanço no final
    const dt = Math.min(delta, 1 / 30);
    const l = lift.current;
    const target = hovered.current ? 1 : 0;
    l.velocity += (target - l.value) * SPRING_STIFFNESS * dt;
    l.velocity *= Math.exp(-SPRING_DAMPING * dt);
    l.value += l.velocity * dt;
    if (visor.current) visor.current.rotation.x = -l.value * VISOR_LIFT;
  });

  return (
    <group ref={group}>
      {/* casco: esfera sem a calota da frente (girada para +Z) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[R, 96, 64, 0, Math.PI * 2, OPENING, Math.PI - OPENING]} />
        <meshPhysicalMaterial color="#F2EEE6" roughness={0.35} metalness={0.05} clearcoat={1} clearcoatRoughness={0.25} side={THREE.DoubleSide} />
      </mesh>

      {/* forro interno escuro */}
      <mesh>
        <sphereGeometry args={[R * 0.96, 48, 48]} />
        <meshStandardMaterial color="#0d0d0f" roughness={1} side={THREE.BackSide} />
      </mesh>

      <Suspense fallback={null}>
        <Photo photo={photo} />
      </Suspense>

      {/* vidro interno, levemente dourado, que fica sobre o rosto */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.006}>
        <sphereGeometry args={[R, 96, 32, 0, Math.PI * 2, 0, OPENING]} />
        <meshPhysicalMaterial
          color="#FFE2A8"
          transparent
          opacity={0.12}
          roughness={0.04}
          metalness={0.2}
          clearcoat={1}
          envMapIntensity={2.4}
          depthWrite={false}
        />
      </mesh>

      {/* visor dourado espelhado: gira em volta do centro do casco e desliza por cima dele */}
      <group ref={visor}>
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.03}>
          <sphereGeometry args={[R, 96, 32, 0, Math.PI * 2, 0, OPENING]} />
          <meshPhysicalMaterial
            color="#D4A373"
            metalness={1}
            roughness={0.08}
            clearcoat={1}
            clearcoatRoughness={0.05}
            envMapIntensity={2.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* aro dourado do visor */}
      <mesh position={[0, 0, RIM_Z]}>
        <torusGeometry args={[RIM_R, 0.07, 24, 96]} />
        <meshStandardMaterial color="#D4A373" metalness={1} roughness={0.18} />
      </mesh>

      {/* anel do pescoço */}
      <mesh position={[0, -R * 0.92, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[R * 0.62, 0.13, 24, 96]} />
        <meshStandardMaterial color="#A67C52" metalness={1} roughness={0.28} />
      </mesh>

      {/* módulos laterais com luz */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * R * 0.98, 0.05, 0]} rotation={[0, 0, (side * Math.PI) / 2]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.2, 0.18, 32]} />
            <meshStandardMaterial color="#D4A373" metalness={1} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.04, 24]} />
            <meshBasicMaterial color="#FFC857" toneMapped={false} />
          </mesh>
        </group>
      ))}

      {/* antena (fora do caminho do visor quando ele sobe) */}
      <mesh position={[R * 0.75, R * 0.71, -0.35]} rotation={[0, 0, -0.35]}>
        <cylinderGeometry args={[0.018, 0.018, 0.6, 12]} />
        <meshStandardMaterial color="#A67C52" metalness={1} roughness={0.3} />
      </mesh>
      <mesh position={[R * 0.86, R * 0.98, -0.35]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#FFC857" toneMapped={false} />
      </mesh>
    </group>
  );
}

export function AstronautHelmet({ photo }: Props) {
  // hover lido direto no useFrame: abrir/fechar o visor não re-renderiza o Canvas
  const hovered = useRef(false);

  return (
    <div
      className="h-full w-full rounded-full"
      onPointerEnter={() => (hovered.current = true)}
      onPointerLeave={() => (hovered.current = false)}
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 4.6], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 4, 5]} intensity={2} color="#FFF1D6" />
        <pointLight position={[-3, -1, 2]} intensity={6} color="#FFC857" />
        <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
          <Helmet photo={photo} hovered={hovered} />
        </Float>
        <Environment resolution={128} frames={1}>
          <Lightformer form="rect" intensity={5} color="#FFE2A8" position={[0, 4, 3]} scale={[6, 2, 1]} />
          <Lightformer form="ring" intensity={3} color="#FFC857" position={[-4, 0, 3]} scale={3} />
          <Lightformer form="rect" intensity={2} color="#ffffff" position={[4, -1, 3]} scale={[2, 4, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}
