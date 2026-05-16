import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export function Venus3d() {
  const texture = useLoader(TextureLoader, "/models/Venusnasa.jpg");

  return (
    <group position={[0, 0, -5]}>
      <mesh scale={[1.5, 1.5, 1.5]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
}
