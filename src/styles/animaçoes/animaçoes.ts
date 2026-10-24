import { Variants, easeOut } from "framer-motion";
export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const fadeInFromLeft: Variants = {
  hidden: {
    x: -150,
    opacity: 0,
    transition: { duration: 1.2, ease: easeOut }
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1.2, ease: easeOut }
  }
};

export const fadeInFromRight: Variants = {
  hidden: {
    x: 150,
    opacity: 0,
    transition: { duration: 1.2, ease: easeOut }
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1.2, ease: easeOut }
  }
};

export const fadeInFromTop: Variants = {
  hidden: {
    y: -50,
    opacity: 0,
    transition: { duration: 1.2, ease: easeOut }
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1.2, ease: easeOut }
  }
};

export const fadeInFromBottom: Variants = {
  hidden: {
    y: 50,
    opacity: 0,
    transition: { duration: 1.2, ease: easeOut }
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1.2, ease: easeOut }
  }
};

/**
 * Card "chegando do espaço": vem do fundo (pequeno, inclinado e desfocado)
 * e encaixa com uma mola. Use `custom={index}` para escalonar a entrada.
 */
export const warpIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.4,
    y: 60,
    rotateX: 28,
    filter: "blur(14px)",
    transformPerspective: 1200,
  },
  visible: (index: number = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transformPerspective: 1200,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      mass: 0.9,
      delay: index * 0.09,
      filter: { duration: 0.6, delay: index * 0.09 },
      opacity: { duration: 0.5, delay: index * 0.09 },
    },
  }),
};
