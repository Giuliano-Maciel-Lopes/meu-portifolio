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
