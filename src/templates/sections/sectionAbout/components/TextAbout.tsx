import { motion } from "framer-motion";
import { fadeInFromLeft } from "@/styles/animaçoes/animaçoes";
import { useAnimationEnabled } from "@/hooks/useAnimationDesktop";
import { useTranslation } from "react-i18next";

type Highlight = { value: string; label: string };

export function TextContentAbout() {
  const { isAnimationEnabled } = useAnimationEnabled();
  const { t } = useTranslation("about");

  const bullets = t("bullets", { returnObjects: true }) as string[];
  const highlights = t("highlights", { returnObjects: true }) as Highlight[];

  return (
    <motion.div
      key={isAnimationEnabled ? "anim" : "no-anim"}
      initial={isAnimationEnabled ? "hidden" : undefined}
      whileInView={isAnimationEnabled ? "visible" : undefined}
      viewport={isAnimationEnabled ? { once: false, amount: 0.5 } : undefined}
      variants={isAnimationEnabled ? fadeInFromLeft : undefined}
      className="md:w-1/2 mt-10 flex flex-col gap-6"
    >
      <div className="flex flex-col gap-1">
        <span className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/40 font-semibold">
          <span className="w-5 h-[1px] bg-amber/50 inline-block" />
          {t("who_label")}
        </span>
        <h2 className="text-white text-2xl font-bold mt-1">
          {t("greeting")}{" "}
          <span className="bg-gradient-to-r from-amber to-gold bg-clip-text text-transparent">
            Giuliano
          </span>
        </h2>
      </div>

      <p className="text-gray-400 text-base leading-relaxed">
        {t("description")}
      </p>

      <ul className="flex flex-col gap-2">
        {bullets.map((bullet, i) => (
          <motion.li
            key={i}
            initial={isAnimationEnabled ? { opacity: 0, x: -16 } : undefined}
            whileInView={isAnimationEnabled ? { opacity: 1, x: 0 } : undefined}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.4, delay: i * 0.12 }}
            className="flex items-start gap-2 text-sm text-gray-300"
          >
            <span className="text-amber mt-0.5 shrink-0">▸</span>
            {bullet}
          </motion.li>
        ))}
      </ul>

      <div className="flex gap-6 pt-2 border-t border-white/5">
        {highlights.map((h) => (
          <div key={h.label} className="flex flex-col">
            <span className="text-2xl font-bold text-amber leading-none">{h.value}</span>
            <span className="text-[11px] text-white/35 uppercase tracking-widest mt-0.5">{h.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
