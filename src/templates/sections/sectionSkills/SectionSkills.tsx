import { useState } from "react";
import { categorys, skills } from "./utils/skills";
import { Button } from "@/components/ui/button";
import {  BoxSkills  } from "./components/boxSkills";
import { motion } from "framer-motion";
import { useAnimationEnabled } from "@/hooks/useAnimationDesktop";
import { fadeInFromBottom } from "@/styles/animaçoes/animaçoes";
export function SectionSkills() {
  const [categorySelected, setCategorySelected] = useState<string | null>(
    "Front-end"
  );
  const { isAnimationEnabled } = useAnimationEnabled();

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
    <section className="flex bg-background py-20">
      <motion.div
        className="container flex flex-col items-center"
        initial={isAnimationEnabled ? "hidden" : undefined}
        whileInView={isAnimationEnabled ? "visible" : undefined}
        viewport={isAnimationEnabled ? { once: false, amount: 0.4 } : undefined}
        variants={isAnimationEnabled ? fadeInFromBottom : undefined}
      >
        <h3 className="text-center">Skills</h3>

        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {categorys.map((category, index) => (
            <Button
              key={index}
              variant={categorySelected === category ? "default" : "ghost"}
              className="px-5 py-2 text-white border-4 border-gold rounded-full transition-all duration-200"
              onClick={() =>
                setCategorySelected(
                  categorySelected === category ? null : category
                )
              }
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="mt-20">
          <BoxSkills  category={categorySelected} items={skillsToShow} />
        </div>
      </motion.div>
    </section>
  );
}
