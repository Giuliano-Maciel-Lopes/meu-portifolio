import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { networks } from "../utils/networking";
import { fadeInFromLeft } from "@/styles/animaçoes/animaçoes";
import { useAnimationEnabled } from "@/hooks/useAnimationDesktop";
import { useTranslation } from "react-i18next";

export function LeftContent() {
  const { isAnimationEnabled } = useAnimationEnabled();
  const { t } = useTranslation("hero");

  return (
    <motion.div
      className="md:w-1/2 w-full flex flex-col justify-between items-start h-[400px]"
      key={isAnimationEnabled ? "anim" : "no-anim"}
      initial={isAnimationEnabled ? "hidden" : undefined}
      whileInView={isAnimationEnabled ? "visible" : undefined}
      viewport={isAnimationEnabled ? { once: false, amount: 0.5 } : undefined}
      variants={isAnimationEnabled ? fadeInFromLeft : undefined}
    >
      <div>
        <span className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/40 font-semibold mb-4">
          <span className="w-5 h-[1px] bg-amber/50 inline-block" />
          {t("developer_label")}
        </span>

        <h1 className="text-6xl tracking-tight">
          Giuliano{" "}
          <span className="bg-gradient-to-r from-amber via-gold to-goldDark bg-clip-text text-transparent">
            Maciel
          </span>
        </h1>

        <motion.div
          className="h-[5px] bg-yellow-500 mt-4 rounded-full"
          initial={{ width: isAnimationEnabled ? 0 : "170px" }}
          animate={{ width: "170px" }}
          transition={isAnimationEnabled ? { duration: 0.8, ease: "easeOut" } : { duration: 0 }}
        />
      </div>

      <div className="flex flex-col gap-4">
        <Button variant="fancy" className="text-lg md:hidden">
          {t("cta_cv")}
        </Button>
        <div className="flex gap-4">
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
      </div>
    </motion.div>
  );
}
