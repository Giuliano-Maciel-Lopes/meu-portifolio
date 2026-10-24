import { motion } from "framer-motion";
import { fadeInFromRight } from "@/styles/animaçoes/animaçoes";
import { useAnimationEnabled } from "@/hooks/useAnimationDesktop";
import { HelmetReveal } from "@/templates/sections/sectionAbout/components/HelmetReveal";

export function MediaContentAbout() {
  const { isAnimationEnabled } = useAnimationEnabled();

  return (
    <motion.div
      key={isAnimationEnabled ? "anim" : "no-anim"}
      initial={isAnimationEnabled ? "hidden" : false}
      whileInView={isAnimationEnabled ? "visible" : undefined}
      viewport={isAnimationEnabled ? { once: false, amount: 0.4 } : undefined}
      variants={isAnimationEnabled ? fadeInFromRight : undefined}
      className="relative w-full md:w-1/2 flex justify-center items-center"
    >
      <HelmetReveal />
    </motion.div>
  );
}
