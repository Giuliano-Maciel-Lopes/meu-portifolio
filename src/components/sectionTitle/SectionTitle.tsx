import { motion } from "framer-motion";
import { useAnimationEnabled } from "@/hooks/useAnimationDesktop";
import { cn } from "@/lib/utils";

type Props = {
  index: string;
  // número quando a ordem das seções muda no celular
  mobileIndex?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Título padrão das seções: número da "parada" da viagem, linha dourada
 * que cresce e palavras que sobem de dentro de uma máscara.
 */
export function SectionTitle({ index, mobileIndex, title, highlight, subtitle, align = "center", className }: Props) {
  const { isAnimationEnabled } = useAnimationEnabled();
  const words = title.split(" ").filter(Boolean);
  const highlightWords = highlight ? highlight.split(" ").filter(Boolean) : [];
  const all = [
    ...words.map((w) => ({ w, gold: false })),
    ...highlightWords.map((w) => ({ w, gold: true })),
  ];

  const centered = align === "center";

  return (
    <motion.header
      className={cn("flex flex-col gap-4 mb-2", centered ? "items-center text-center" : "items-start", className)}
      initial={isAnimationEnabled ? "hidden" : undefined}
      whileInView={isAnimationEnabled ? "visible" : undefined}
      viewport={isAnimationEnabled ? { once: true, amount: 0.6 } : undefined}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
    >
      <div className="flex items-center gap-3 font-display text-sm font-medium tracking-[0.3em] text-amber/80">
        {mobileIndex ? (
          <>
            <span className="md:hidden">{mobileIndex}</span>
            <span className="hidden md:inline">{index}</span>
          </>
        ) : (
          <span>{index}</span>
        )}
        <motion.span
          className="h-px w-12 bg-gradient-to-r from-amber to-transparent origin-left"
          variants={{
            hidden: { scaleX: 0 },
            visible: { scaleX: 1, transition: { duration: 0.8, ease: EASE } },
          }}
        />
      </div>

      <h2 className="mb-0 text-textPrimary">
        {all.map(({ w, gold }, i) => (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.08em] mr-[0.25em] last:mr-0">
            <motion.span
              className={cn(
                "inline-block",
                gold && "bg-gradient-to-r from-amber via-gold to-goldDark bg-clip-text text-transparent"
              )}
              variants={{
                hidden: { y: "110%" },
                visible: { y: "0%", transition: { duration: 0.9, ease: EASE } },
              }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </h2>

      {subtitle && (
        <motion.p
          className="text-textSecondary text-sm tracking-[0.2em] uppercase mb-0"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.header>
  );
}
