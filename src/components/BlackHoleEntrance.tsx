import { motion } from "framer-motion";
import { useAnimationEnabled } from "@/hooks/useAnimationDesktop";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function BlackHoleEntrance({ children, className }: Props) {
  const { isAnimationEnabled } = useAnimationEnabled();

  return (
    <motion.div
      key={String(isAnimationEnabled)}
      className={className}
      initial={isAnimationEnabled ? { opacity: 0, scale: 0.88, filter: "blur(18px)", y: 50 } : undefined}
      whileInView={isAnimationEnabled ? { opacity: 1, scale: 1, filter: "blur(0px)", y: 0 } : undefined}
      viewport={isAnimationEnabled ? { once: false, amount: 0.15 } : undefined}
      transition={{ duration: 1.05, ease: [0.22, 0.8, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
