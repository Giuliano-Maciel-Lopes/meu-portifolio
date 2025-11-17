import { LeftContent } from "./components/leftcontent";
import { RigthContet } from "./components/rigthContent";
import { motion } from "framer-motion";

export function SectionHero() {
  return (
    <section className="relative mt-20 text-white  ">
    
      <motion.div
        className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full"
        style={{
          background: "radial-gradient(circle, #ffd700, #bfa058, transparent 70%)",
          filter: "blur(120px)",
          opacity: 0.4,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      <div className="container flex md:flex-row flex-col gap-8 relative z-10">
        <LeftContent />
        <RigthContet />
      </div>
    </section>
  );
}
