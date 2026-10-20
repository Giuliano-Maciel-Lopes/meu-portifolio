import { motion, useScroll, useSpring } from "framer-motion";

/** Barra dourada no topo que mostra o quanto da "viagem" já foi percorrida. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-goldDark via-amber to-gold shadow-[0_0_12px_rgba(255,200,87,0.7)]"
    />
  );
}
