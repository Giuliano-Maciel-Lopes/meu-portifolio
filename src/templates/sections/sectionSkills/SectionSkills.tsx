import { useState } from "react";
import { categorys, skills } from "./utils/skills";
import { BoxSkills } from "./components/boxSkills";
import { motion } from "framer-motion";
import { useAnimationEnabled } from "@/hooks/useAnimationDesktop";
import { fadeInFromBottom } from "@/styles/animaçoes/animaçoes";
import { useTranslation } from "react-i18next";

export function SectionSkills() {
  const [categorySelected, setCategorySelected] = useState<string | null>("Back-end");
  const { isAnimationEnabled } = useAnimationEnabled();
  const { t } = useTranslation("skills");

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
    <section id="skills" className="flex bg-background py-20 scroll-mt-24">
      <motion.div
        key={String(isAnimationEnabled)}
        className="container flex flex-col items-center"
        initial={isAnimationEnabled ? "hidden" : undefined}
        whileInView={isAnimationEnabled ? "visible" : undefined}
        viewport={isAnimationEnabled ? { once: false, amount: 0.15 } : undefined}
        variants={isAnimationEnabled ? fadeInFromBottom : undefined}
      >
        <h3 className="text-center">{t("title")}</h3>

        <div className="mt-16 flex items-center gap-1 bg-white/[0.04] border border-white/10 rounded-full p-1 flex-wrap justify-center">
          {categorys.map((category, index) => (
            <button
              key={index}
              onClick={() => setCategorySelected(category)}
              className={`
                px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap
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

        <div className="mt-20">
          <BoxSkills category={categorySelected} items={skillsToShow} />
        </div>
      </motion.div>
    </section>
  );
}
