import { Variants, easeOut } from "framer-motion";

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
