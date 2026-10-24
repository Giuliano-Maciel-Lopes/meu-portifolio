import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Venus3d } from "@/templates/sections/sectionhero/components/venus3d";

type Props = {
  // fora da tela o Canvas para de renderizar
  active: boolean;
};

export function HeroVenus({ active }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      gl={{ powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 3, 3]} />

      <Suspense fallback={null}>
        <Venus3d />
      </Suspense>
    </Canvas>
  );
}
