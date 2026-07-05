import { LeftContent } from "./components/leftcontent";
import { RigthContet } from "./components/rigthContent";
import { StarField } from "./components/StarField";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Venus3d } from "./components/venus3d";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";

export function SectionHero() {
  return (
    <section id="home" className="relative pt-20 pb-16 md:pb-0 md:min-h-[85vh] md:flex md:items-center scroll-mt-24 text-white">

      <div className="hidden md:block">
        <StarField />
      </div>

 <div className=" hidden md:block absolute inset-0 z-0 opacity-80 pointer-events-none ">
 <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>

    <ambientLight intensity={0.4} />
    <directionalLight position={[3, 3, 3]} />

    <Suspense fallback={null}>
      <Venus3d />
    </Suspense>

    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
  </Canvas>
</div>

     
      <div
        className="absolute top-0 left-0 w-[180px] h-[180px] md:w-[300px] md:h-[300px] rounded-full z-10 pointer-events-none blur-[70px] md:blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, #ffd700, #bfa058, transparent 70%)",
          opacity: 0.4,
        }}
      />

      <div className="container flex md:flex-row flex-col gap-8 relative z-20">
        <div className="flex flex-col">
          <div className="flex md:flex-row flex-col gap-8">
            <LeftContent />
            <RigthContet />
          </div>
        </div>
      </div>

    </section>
  );
}
