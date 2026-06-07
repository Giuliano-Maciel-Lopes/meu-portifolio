import { useState } from "react";
import { motion } from "framer-motion";
import { FaIdCard, FaMedal } from "react-icons/fa";
import { itemVariants, containerVariants } from "@/styles/animaçoes/animaçoes";
import { experienci, certificates } from "./utils/expert";
import { BoxExp } from "./components/boxExp";
import { BoxCertificate } from "./components/boxCerificate";
import { JSX } from "react";
import { useAnimationEnabled } from "@/hooks/useAnimationDesktop";
import { useTranslation } from "react-i18next";

type TranslatedExpItem = { name: string; tempo: string; description: string };
type TranslatedCertItem = { name: string; institution: string; description: string };

export function SectionExperience() {
  const { isAnimationEnabled } = useAnimationEnabled();
  const { t } = useTranslation("experience");
  const [categorySelected, setCategorySelected] = useState<"certificados" | "experiencias">("experiencias");

  const translatedItems = t("items", { returnObjects: true }) as TranslatedExpItem[];
  const translatedCerts = t("certificates", { returnObjects: true }) as TranslatedCertItem[];

  const mergedExp = experienci.map((exp, i) => ({
    ...exp,
    ...(translatedItems[i] ?? {}),
  }));

  const mergedCerts = certificates.map((cert, i) => ({
    ...cert,
    ...(translatedCerts[i] ?? {}),
  }));

  const buttonsFilters: { name: string; Icon: JSX.Element; key: "certificados" | "experiencias" }[] = [
    { name: t("tabs.experiences"), Icon: <FaIdCard />, key: "experiencias" },
    { name: t("tabs.certificates"), Icon: <FaMedal />, key: "certificados" },
  ];

  return (
    <section id="experienci" className="flex flex-col scroll-mt-24">
      <div className="container flex flex-col gap-10">
        <div className="text-center space-y-2">
          <h3 className="text-center text-3xl font-bold tracking-tight">
            {t("title")}{" "}
            <span className="bg-gradient-to-r from-amber to-gold bg-clip-text text-transparent">
              {t("title_highlight")}
            </span>
          </h3>
        </div>

        <div className="flex justify-center">
          <div className="flex items-center gap-1 bg-white/[0.04] border border-white/10 rounded-full p-1">
            {buttonsFilters.map((btn) => (
              <button
                key={btn.key}
                onClick={() => setCategorySelected(btn.key)}
                className={`
                  flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                  ${
                    categorySelected === btn.key
                      ? "bg-amber/90 text-black"
                      : "text-white/40 hover:text-white/70"
                  }
                `}
              >
                {btn.Icon}
                {btn.name}
              </button>
            ))}
          </div>
        </div>

        {categorySelected === "experiencias" && (
          <div key={String(isAnimationEnabled)} className="flex flex-col gap-5">
            {mergedExp.map((exp, index) => (
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {mergedCerts.map((cert, index) => (
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
