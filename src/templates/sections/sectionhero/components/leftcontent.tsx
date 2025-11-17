import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { networks } from "../utils/networking";
import { fadeInFromLeft } from "@/styles/animaçoes/animaçoes";
import { useAnimationEnabled } from "@/hooks/useAnimationDesktop";

export function LeftContent() {
  const {isAnimationEnabled} = useAnimationEnabled()
  return (
    <motion.div
      className="md:w-1/2 w-full flex flex-col items-start"
      initial={ isAnimationEnabled ?"hidden":undefined}
      whileInView={isAnimationEnabled ?"visible": undefined}
      viewport={isAnimationEnabled? { once: false, amount: 0.5 }: undefined}
      variants={isAnimationEnabled ? fadeInFromLeft : undefined}
    >
      <h1 className="text-6xl">Giuliano</h1>
      <h1 className="text-6xl">Maciel</h1>

      <motion.div
        className="h-[5px] bg-yellow-500 mt-4 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: "170px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <div className="flex gap-4 mt-48">
        {networks.map((network) => (
          <Button
            key={network.name}
            variant="icon"
            className="group border border-white/30 rounded-full p-3 transition-all duration-300 hover:border-amber hover:shadow-[0_0_15px_rgba(255,200,87,0.6)]"
            asChild
          >
            <a
              href={network.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              <network.icone className="w-5 h-5 text-white transition-all duration-300 group-hover:text-amber group-hover:scale-110" />
            </a>
          </Button>
        ))}
      </div>
    </motion.div>
  );
}
