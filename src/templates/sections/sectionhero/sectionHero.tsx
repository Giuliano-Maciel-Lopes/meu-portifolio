import { LeftContent } from "./components/leftcontent";
import { RigthContet } from "./components/rigthContent";
import { motion } from "framer-motion";


export function SectionHero() {
  return (
    <section id="home" className="relative pt-20 scroll-mt-24 text-white  ">
      <motion.div
        className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, #ffd700, #bfa058, transparent 70%)",
          filter: "blur(120px)",
          opacity: 0.4,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      <div className="container flex md:flex-row flex-col gap-8 relative z-10">
        <div className="flex flex-col">

          <div className=" flex md:flex-row flex-col gap-8">
          <LeftContent />
          <RigthContet />
          </div>
         
        </div>
      </div>
    </section>
  );
}
