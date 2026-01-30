import { useState } from "react";
import { motion } from "framer-motion";
import { FaIdCard, FaMedal } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { itemVariants, fadeInFromLeft } from "@/styles/animaçoes/animaçoes";
import { containerVariants } from "@/styles/animaçoes/animaçoes";
import { experienci, certificates } from "./utils/expert";
import { BoxExp } from "./components/boxExp";
import { BoxCertificate } from "./components/boxCerificate";
import { JSX } from "react";
import { useAnimationEnabled } from "@/hooks/useAnimationDesktop";

export function SectionExperience() {
  const { isAnimationEnabled } = useAnimationEnabled();
  const [categorySelected, setCategorySelected] = useState<
    "certificados" | "experiencias"
  >("experiencias");

  const buttonsFilters: {
    name: string;
    Icon: JSX.Element;
    key: "certificados" | "experiencias";
  }[] = [
    { name: "Experiências", Icon: <FaIdCard />, key: "experiencias" },
    { name: "Certificados", Icon: <FaMedal />, key: "certificados" },
  ];

  return (
    <section id="experienci" className="flex flex-col">
      <div className="container flex flex-col gap-10">
        <h3 className="text-center text-2xl font-bold mb-8">Experiências</h3>

        <div className="flex justify-center gap-4 mb-10">
          {buttonsFilters.map((btn) => (
            <Button
              key={btn.key}
              variant={categorySelected === btn.key ? "default" : "fancy"}
              onClick={() => setCategorySelected(btn.key)}
            >
              {btn.Icon} {btn.name}
            </Button>
          ))}
        </div>

      {categorySelected === "experiencias" && (
  <div className="flex flex-col gap-6">
    {experienci.map((exp, index) => (
      <motion.div
        key={index}
        initial={isAnimationEnabled ? { x: -150, opacity: 0 } : undefined}
        whileInView={isAnimationEnabled ? { x: 0, opacity: 1 } : undefined}
        viewport={isAnimationEnabled ? { once: false, amount: 0.2 } : undefined}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <BoxExp experience={exp} />
      </motion.div>
    ))}
  </div>
)}

        {categorySelected === "certificados" && (
          <motion.div
            key={categorySelected}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certificates.map((cert, index) => (
              <motion.div key={index} variants={itemVariants}>
                <BoxCertificate certificate={cert} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
