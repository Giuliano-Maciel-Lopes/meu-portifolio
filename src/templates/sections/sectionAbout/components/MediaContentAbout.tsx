import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInFromRight } from "@/styles/animaçoes/animaçoes";
import { useAnimationEnabled } from "@/hooks/useAnimationDesktop";

export function MediaContentAbout() {
  const { isAnimationEnabled } = useAnimationEnabled();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={fadeInFromRight}
      className="
        md:w-1/2 
        flex 
        justify-center 
        items-center 
        p-4 
      "
    >
      <motion.div
        whileHover={{ scale: 1.04 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="
          rounded-full 
          p-1 
          border-4 
          border-yellow-500 
          shadow-[0_0_25px_rgba(255,215,0,0.4)]
          hover:shadow-[0_0_35px_rgba(255,215,0,0.6)]
          transition-all 
          duration-300
        "
      >
        <Image
          src="/linkdingiu.png"
          alt="imagem Giuliano"
          width={300}
          height={300}
          className="rounded-full object-cover"
          style={{ width: 300, height: 300 }}
        />
      </motion.div>
    </motion.div>
  );
}
