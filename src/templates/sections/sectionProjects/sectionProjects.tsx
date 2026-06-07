import { useState } from "react";
import { projects } from "./utils/projects";
import { BannerProjects } from "./Components/bannerProjects";
import { ProjectModal } from "./Components/ProjectModal";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { BlackHoleEntrance } from "@/components/BlackHoleEntrance";
import { useAnimationEnabled } from "@/hooks/useAnimationDesktop";

type StaticProject = (typeof projects)[number];

type TranslatedProjectItem = {
  name: string;
  short_description: string;
  description: string;
  features: string[];
  differential: string;
};

export type MergedProject = Omit<
  StaticProject,
  "nameProject" | "shortDescription" | "description" | "features" | "differential"
> & {
  nameProject: string;
  shortDescription: string;
  description: string;
  features?: string[];
  differential?: string;
};

export function SectionProjects() {
  const [selected, setSelected] = useState<MergedProject | null>(null);
  const { t } = useTranslation("projects");
  const { isAnimationEnabled } = useAnimationEnabled();

  const translatedItems = t("items", { returnObjects: true }) as TranslatedProjectItem[];

  const mergedProjects: MergedProject[] = projects.map((p, i) => {
    const ti = translatedItems[i];
    if (!ti) return p;
    return {
      ...p,
      nameProject: ti.name,
      shortDescription: ti.short_description,
      description: ti.description,
      features: ti.features,
      differential: ti.differential,
    };
  });

  const hero = mergedProjects.find((p) => !!p.img) ?? null;
  const rest = mergedProjects.filter((p) => p !== hero);

  return (
    <section id="projects" className="scroll-mt-24 relative overflow-hidden bg-background py-20">
      {/* aurora de fundo */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="animate-aurora-drift absolute left-1/2 -translate-x-1/2"
          style={{
            top: "-20%",
            width: "min(900px, 90vw)",
            height: "700px",
            background: "radial-gradient(closest-side, rgba(212,163,115,0.13), transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 80% at 50% 0%, transparent 40%, #0B0B0B 78%)" }}
        />
      </div>

      <BlackHoleEntrance className="container flex flex-col gap-10">
        {/* cabeçalho */}
        <header className="text-center flex flex-col items-center gap-3">
          <h3 className="text-center">
            {t("title")}{" "}
            <span className="bg-gradient-to-r from-amber to-gold bg-clip-text text-transparent">
              {t("title_highlight")}
            </span>
          </h3>

          <p className="text-textSecondary text-sm tracking-widest uppercase mb-0">
            {t("subtitle")}
          </p>

          <div className="inline-flex items-center gap-3 mt-1 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02]">
            <span className="text-sm text-textSecondary">
              {t("delivered_label", "projetos entregues")}
            </span>
            <span
              className="min-w-[48px] h-9 px-3 rounded-full grid place-items-center font-inter font-extrabold text-lg text-black"
              style={{ background: "#FFC857" }}
            >
              +20
            </span>
          </div>
        </header>

        {/* grid */}
        <div className="flex flex-col gap-5">
          {hero && (
            <motion.div
              initial={isAnimationEnabled ? { opacity: 0, y: 20 } : undefined}
              whileInView={isAnimationEnabled ? { opacity: 1, y: 0 } : undefined}
              viewport={isAnimationEnabled ? { once: true, amount: 0.15 } : undefined}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <BannerProjects project={hero} hero onClick={() => setSelected(hero)} />
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((project, index) => (
              <motion.div
                key={project.nameProject}
                className="h-full"
                initial={isAnimationEnabled ? { opacity: 0, y: 20, scale: 0.985 } : undefined}
                whileInView={isAnimationEnabled ? { opacity: 1, y: 0, scale: 1 } : undefined}
                viewport={isAnimationEnabled ? { once: true, amount: 0.1 } : undefined}
                transition={{ duration: 0.5, delay: index * 0.055, ease: "easeOut" }}
              >
                <BannerProjects project={project} onClick={() => setSelected(project)} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* link github */}
        <div className="flex justify-center">
          <a
            href="https://github.com/Giuliano-Maciel-Lopes"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-textSecondary hover:text-amber transition-all duration-200 group border border-white/10 hover:border-amber/30 px-5 py-2.5 rounded-full"
          >
            <FaGithub className="w-4 h-4 group-hover:text-amber transition-colors" />
            {t("github_link")}
            <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
          </a>
        </div>
      </BlackHoleEntrance>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ProjectModal project={selected} onClose={() => setSelected(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
