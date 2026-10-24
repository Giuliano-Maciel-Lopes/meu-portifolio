import { useEffect, useRef, useState } from "react";
import { categorys, skills } from "./utils/skills";
import { BoxSkills } from "./components/boxSkills";
import { motion } from "framer-motion";
import { useAnimationEnabled } from "@/hooks/useAnimationDesktop";
import { fadeInFromBottom } from "@/styles/animaçoes/animaçoes";
import { useTranslation } from "react-i18next";
import { BsChevronRight } from "react-icons/bs";
import { ArrowButton } from "@/components/arrow/arrow";

import { SectionTitle } from "@/components/sectionTitle/SectionTitle";

export function SectionSkills() {
  const [categorySelected, setCategorySelected] = useState<string | null>("Back-end");
  const { isAnimationEnabled } = useAnimationEnabled();
  const { t } = useTranslation("skills");
  const filterScrollRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);

  const updateScrollHint = () => {
    const el = filterScrollRef.current;
    if (!el) return;
    setShowScrollHint(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollHint();
    window.addEventListener("resize", updateScrollHint);
    return () => window.removeEventListener("resize", updateScrollHint);
  }, []);

  const filteredSkills = skills.filter(
    (skill) => skill.category === categorySelected
  );

  const skillsToShow = filteredSkills.map((skill) => ({
    name: skill.name,
    Icon: skill.img,
    description: skill.description,
    color: skill.color,
  }));

  return (
    <section id="skills" className="flex py-20 scroll-mt-24">
      <motion.div
        key={String(isAnimationEnabled)}
        className="container flex flex-col items-center"
        initial={isAnimationEnabled ? "hidden" : undefined}
        whileInView={isAnimationEnabled ? "visible" : undefined}
        viewport={isAnimationEnabled ? { once: false, amount: 0.15 } : undefined}
        variants={isAnimationEnabled ? fadeInFromBottom : undefined}
      >
        <SectionTitle index="01" mobileIndex="02" title={t("title")} />
        <p className="text-sm text-textSecondary text-center max-w-xl">{t("proven_subtitle")}</p>
        {/* no celular os projetos ficam acima, então a seta para baixo não faz sentido */}
        <div className="hidden md:block">
          <ArrowButton text={t("proven_link") as string} href="#projects" />
        </div>

        <div className="mt-16 w-full sticky top-16 z-30 py-2 bg-background/95 backdrop-blur-sm md:static md:w-auto md:py-0 md:bg-transparent md:backdrop-blur-none">
          <div className="relative">
            <div
              ref={filterScrollRef}
              onScroll={updateScrollHint}
              className="overflow-x-auto scrollbar-none"
            >
              <div className="flex items-center gap-1 bg-white/[0.04] border border-white/10 rounded-full p-1 w-max mx-auto md:w-auto md:flex-wrap md:justify-center">
                {categorys.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setCategorySelected(category)}
                    className={`
                      px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0
                      ${categorySelected === category
                        ? "bg-amber/90 text-black"
                        : "text-white/40 hover:text-white/70"
                      }
                    `}
                  >
                    {t(`categories.${category}`, category)}
                  </button>
                ))}
              </div>
            </div>

            {showScrollHint && (
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center pl-6 pr-1 bg-gradient-to-l from-background/95 to-transparent md:hidden">
                <BsChevronRight className="text-white/60 text-xs animate-pulse" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-20">
          <BoxSkills category={categorySelected} items={skillsToShow} />
        </div>
      </motion.div>
    </section>
  );
}
