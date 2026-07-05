import { MediaContentAbout } from "./components/MediaContentAbout";
import { TextContentAbout } from "./components/TextAbout";
import { motion } from "framer-motion";

export function SectionAbout() {
  return (
    <section id="about" className="scroll-mt-24 relative overflow-hidden md:py-20">
      <div className="hidden md:block pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(99,57,255,0.12), transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-10 -left-20 w-[350px] h-[350px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(20,120,255,0.1), transparent 70%)",
            filter: "blur(70px)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(212,163,115,0.06), transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      <div className="container flex flex-col relative z-10">
        <h3 className="text-center">About</h3>

        <div className="flex items-center">
          <TextContentAbout />
          <MediaContentAbout />
        </div>
      </div>
    </section>
  );
}
