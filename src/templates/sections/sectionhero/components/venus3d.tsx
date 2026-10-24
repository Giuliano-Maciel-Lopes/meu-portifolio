import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Group, TextureLoader } from "three";

// uma volta a cada 30s, o mesmo ritmo do antigo OrbitControls com autoRotateSpeed 1
const SPIN_SPEED = (Math.PI * 2) / 30;

export function Venus3d() {
  const texture = useLoader(TextureLoader, "/models/Venusnasa.jpg");
  const planet = useRef<Group>(null);

  useFrame((_, delta) => {
    if (planet.current) planet.current.rotation.y += delta * SPIN_SPEED;
  });

  return (
    <group position={[-0.7, 0.2, -5]}>
      <group ref={planet}>
        <mesh scale={[1.2, 1.2, 1.2]}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial map={texture} />
        </mesh>
      </group>
    </group>
  );
}
