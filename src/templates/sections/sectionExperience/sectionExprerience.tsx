import { useState } from "react";
import { motion } from "framer-motion";
import { FaIdCard, FaMedal } from "react-icons/fa";
import { warpIn } from "@/styles/animaçoes/animaçoes";
import { experienci, certificates, PRATIQUE_START_DATE, FREELANCE_START_DATE } from "./utils/expert";
import { getWorkingDuration } from "./utils/duration";
import { BoxExp } from "./components/boxExp";
import { BoxCertificate } from "./components/boxCerificate";
import { JSX } from "react";
import { useAnimationEnabled } from "@/hooks/useAnimationDesktop";
import { useTranslation } from "react-i18next";

type TranslatedExpItem = { name: string; tempo: string; description: string };
type TranslatedCertItem = { name: string; institution: string; description: string };

// Datas de início de cada atuação (ver utils/expert.ts) — nenhuma tem data final,
// então o tempo exibido é calculado automaticamente e nunca precisa ser editado à mão.
const START_DATES = [PRATIQUE_START_DATE, FREELANCE_START_DATE];

import { SectionTitle } from "@/components/sectionTitle/SectionTitle";

export function SectionExperience() {
  const { isAnimationEnabled } = useAnimationEnabled();
  const { t, i18n } = useTranslation("experience");
  const [categorySelected, setCategorySelected] = useState<"certificados" | "experiencias">("experiencias");

  const translatedItems = t("items", { returnObjects: true }) as TranslatedExpItem[];
  const translatedCerts = t("certificates", { returnObjects: true }) as TranslatedCertItem[];

  const mergedExp = experienci.map((exp, i) => {
    const translated = translatedItems[i] ?? {};
    const startDate = START_DATES[i];
    const tempo = startDate
      ? t("duration_label", { duration: getWorkingDuration(startDate, i18n.language) })
      : translated.tempo ?? exp.tempo;

    return { ...exp, ...translated, tempo };
  });

  const mergedCerts = certificates.map((cert, i) => ({
    ...cert,
    ...(translatedCerts[i] ?? {}),
  }));

  const buttonsFilters: { name: string; Icon: JSX.Element; key: "certificados" | "experiencias" }[] = [
    { name: t("tabs.experiences"), Icon: <FaIdCard />, key: "experiencias" },
    { name: t("tabs.certificates"), Icon: <FaMedal />, key: "certificados" },
  ];

  return (
    <section id="experienci" className="flex flex-col scroll-mt-24 md:py-20">
      <div className="container flex flex-col gap-10">
        <div className="text-center space-y-2">
          <SectionTitle index="03" title={t("title")} highlight={t("title_highlight")} />
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
                variants={isAnimationEnabled ? warpIn : undefined}
                initial={isAnimationEnabled ? "hidden" : undefined}
                whileInView={isAnimationEnabled ? "visible" : undefined}
                viewport={isAnimationEnabled ? { once: true, amount: 0.2 } : undefined}
              >
                <BoxExp experience={exp} />
              </motion.div>
            ))}
          </div>
        )}

        {categorySelected === "certificados" && (
          <div
            key={categorySelected}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {mergedCerts.map((cert, index) => (
              <motion.div
                key={index}
                custom={index % 3}
                variants={isAnimationEnabled ? warpIn : undefined}
                initial={isAnimationEnabled ? "hidden" : undefined}
                animate={isAnimationEnabled ? "visible" : undefined}
              >
                <BoxCertificate certificate={cert} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
