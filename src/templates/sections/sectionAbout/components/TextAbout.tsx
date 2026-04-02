import { motion } from "framer-motion";
import { fadeInFromLeft } from "@/styles/animaçoes/animaçoes";
import { useAnimationEnabled } from "@/hooks/useAnimationDesktop";

const highlights = [
  { value: "+20", label: "Projetos entregues" },
  { value: "FS", label: "Front + Back-end" },
  { value: "IA", label: "Automações reais" },
];

const bullets = [
  "Atuo no mercado como desenvolvedor Full Stack",
  "Front-end moderno e Back-end robusto",
  "Automações com IA — n8n, WhatsApp API e disparos",
  "Arquitetura limpa, SOLID e código que escala",
 
];

export function TextContentAbout() {
  const { isAnimationEnabled } = useAnimationEnabled();

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
          Quem sou eu
        </span>
        <h2 className="text-white text-2xl font-bold mt-1">
          olá, sou{" "}
          <span className="bg-gradient-to-r from-amber to-gold bg-clip-text text-transparent">
            Giuliano
          </span>
        </h2>
      </div>

      <p className="text-gray-400 text-base leading-relaxed">
        Desenvolvedor Full Stack atuando no mercado com foco em automações com IA,
        arquitetura de software e desenvolvimento web completo. Gosto de resolver
        problemas reais — do banco de dados à interface, com código limpo,
        bem estruturado e que faz sentido para quem usa.
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
