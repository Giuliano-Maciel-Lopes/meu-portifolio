import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Retorna true se animações podem rodar:
 * - Só no desktop (min-width 768px)
 * - Respeita prefers-reduced-motion
 * - SSR-safe
 */
export function useAnimationEnabled() {
  const reduceMotion = useReducedMotion();
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(false);

  useEffect(() => {
    const check = () => {
      const isDesktop = window.innerWidth >= 768;
      setIsAnimationEnabled(isDesktop && !reduceMotion);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [reduceMotion]);

  return {isAnimationEnabled};
}
