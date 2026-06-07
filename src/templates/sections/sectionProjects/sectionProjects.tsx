import { useState } from "react";
import { projects } from "./utils/projects";
import { BannerProjects } from "./Components/bannerProjects";
import { ProjectModal } from "./Components/ProjectModal";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useAnimationEnabled } from "@/hooks/useAnimationDesktop";
import { deriveCategoryLabel } from "./utils/projectTheme";
import { cn } from "@/lib/utils";

type StaticProject = (typeof projects)[number];

type TranslatedProjectItem = {
  name: string;
  short_description: string;
  description: string;
  features: string[];
  differential: string;
};

export type MergedProject = StaticProject & {
  nameProject: string;
  shortDescription: string;
  description: string;
  features: string[];
  differential: string;
};

const FILTERS = [
  { key: "all", label: "Todos", color: "#D4A373" },
  { key: "Full Stack", label: "Full Stack", color: "#FFC857" },
  { key: "Front-end", label: "Front-end", color: "#4FA9E8" },
  { key: "Back-end", label: "Back-end", color: "#46C98A" },
  { key: "Automações", label: "Automações", color: "#B07CE8" },
];

export function SectionProjects() {
  const [selected, setSelected] = useState<MergedProject | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { t } = useTranslation("projects");
  const { isAnimationEnabled } = useAnimationEnabled();

  const translatedItems = t("items", { returnObjects: true }) as TranslatedProjectItem[];

  const mergedProjects: MergedProject[] = projects.map((p, i) => {
    const ti = translatedItems[i];
    return {
      ...p,
      nameProject: ti?.name ?? "",
      shortDescription: ti?.short_description ?? "",
      description: ti?.description ?? "",
      features: ti?.features ?? [],
      differential: ti?.differential ?? "",
    };
  });

  const heroProject = mergedProjects.find((p) => p.featured);
  const hero = heroProject ?? mergedProjects.find((p) => !!p.img) ?? null;

  const showHero = activeFilter === "all";
  const featuredProjects = mergedProjects.filter((p) => p.featured);

  const gridProjects = showHero
    ? mergedProjects.filter((p) => !p.featured)
    : [
        ...featuredProjects,
        ...mergedProjects.filter((p) => !p.featured && deriveCategoryLabel(p.stack) === activeFilter),
      ];

  const countFor = (key: string) =>
    key === "all"
      ? mergedProjects.length
      : mergedProjects.filter((p) => deriveCategoryLabel(p.stack) === key).length;


  return (
    <section id="projects" className="scroll-mt-24 relative overflow-hidden bg-background py-20">
      {/* sombra de entrada no topo */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)" }}
      />

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

      <div className="container flex flex-col gap-10 relative z-20">
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

        {/* filtros de categoria */}
        <div className="flex justify-center">
          <div className="flex items-center gap-1 bg-white/[0.04] border border-white/10 rounded-full p-1 flex-wrap justify-center">
            {FILTERS.map((f) => {
              const count = countFor(f.key);
              const isActive = activeFilter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
                    isActive ? "text-[#0B0B0B]" : "text-white/40 hover:text-white/70"
                  )}
                  style={isActive ? { background: f.color } : undefined}
                >
                  {f.label}
                  <span
                    className={cn(
                      "text-xs font-bold leading-none",
                      isActive ? "text-[#0B0B0B]" : "text-white/20"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* grid */}
        <div className="flex flex-col gap-5">
          {showHero && hero && (
            <motion.div
              initial={isAnimationEnabled ? { opacity: 0, y: 24 } : undefined}
              whileInView={isAnimationEnabled ? { opacity: 1, y: 0 } : undefined}
              viewport={isAnimationEnabled ? { once: true, amount: 0.1 } : undefined}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <BannerProjects project={hero} hero onClick={() => setSelected(hero)} />
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {gridProjects.map((project, index) => (
                <motion.div
                  key={project.nameProject}
                  className="h-full"
                  initial={isAnimationEnabled ? { opacity: 0, y: 24 } : undefined}
                  whileInView={isAnimationEnabled ? { opacity: 1, y: 0 } : undefined}
                  viewport={isAnimationEnabled ? { once: true, amount: 0.05 } : undefined}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                >
                  <BannerProjects project={project} onClick={() => setSelected(project)} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
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
      </div>

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
