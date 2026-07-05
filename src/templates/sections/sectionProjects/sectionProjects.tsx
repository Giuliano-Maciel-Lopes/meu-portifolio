import { useState, useEffect } from "react";
import { projects } from "./utils/projects";
import type { ProjectCategory } from "./utils/projects";
import { BannerProjects } from "./Components/bannerProjects";
import { ProjectModal } from "./Components/ProjectModal";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useAnimationEnabled } from "@/hooks/useAnimationDesktop";
import { cn } from "@/lib/utils";
import { getWorkingDuration } from "@/templates/sections/sectionExperience/utils/duration";
import { PRATIQUE_START_DATE } from "@/templates/sections/sectionExperience/utils/expert";

type StaticProject = (typeof projects)[number];

type TranslatedProjectItem = {
  key: string;
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

const CATEGORY_COLOR: Record<ProjectCategory, string> = {
  "Full Stack": "#FFC857",
  "Front-end": "#4FA9E8",
  "Back-end": "#46C98A",
  "Automações": "#B07CE8",
};

const CATEGORY_ORDER: ProjectCategory[] = ["Full Stack", "Front-end", "Back-end", "Automações"];

const FILTERS = [
  { key: "all" as const, label: "Todos", color: "#D4A373" },
  ...CATEGORY_ORDER.map((cat) => ({ key: cat, label: cat, color: CATEGORY_COLOR[cat] })),
];

export function SectionProjects() {
  const [selected, setSelected] = useState<MergedProject | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | ProjectCategory>("all");
  const { t, i18n } = useTranslation("projects");
  const { isAnimationEnabled } = useAnimationEnabled();

  const translatedItems = t("items", { returnObjects: true }) as TranslatedProjectItem[];

  const mergedProjects: MergedProject[] = projects.map((p) => {
    const ti = translatedItems.find((item) => item.key === p.id);
    const duration = p.id === "pratique" ? getWorkingDuration(PRATIQUE_START_DATE, i18n.language) : null;
    const description = duration
      ? (ti?.description ?? "").replace("{duration}", duration)
      : ti?.description ?? "";
    const differential = duration
      ? (ti?.differential ?? "").replace("{duration}", duration)
      : ti?.differential ?? "";

    return {
      ...p,
      nameProject: ti?.name ?? "",
      shortDescription: ti?.short_description ?? "",
      description,
      features: ti?.features ?? [],
      differential,
    };
  });

  const DESKTOP_LIMIT = 7;
  const MOBILE_LIMIT = 4;

  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    setShowAll(false);
  }, [activeFilter]);

  const hero = mergedProjects[0] ?? null;
  const showHero = activeFilter === "all";

  const allGridProjects = showHero
    ? mergedProjects.slice(1)
    : mergedProjects.filter((p) => p.category === activeFilter);

  const limit = isMobile ? MOBILE_LIMIT : DESKTOP_LIMIT;
  const gridLimit = showHero ? limit - 1 : limit;
  const gridProjects = showAll ? allGridProjects : allGridProjects.slice(0, gridLimit);
  const hasMore = !showAll && allGridProjects.length > gridProjects.length;

  const countFor = (key: "all" | ProjectCategory) =>
    key === "all"
      ? mergedProjects.length
      : mergedProjects.filter((p) => p.category === key).length;


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

        {/* ver mais / ver menos */}
        {(hasMore || showAll) && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="flex items-center gap-2 text-sm text-textSecondary hover:text-amber transition-all duration-200 group border border-white/10 hover:border-amber/30 px-6 py-2.5 rounded-full"
            >
              {showAll ? "Ver menos" : "Ver mais projetos"}
              <span className={`transition-transform duration-200 inline-block ${showAll ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}`}>
                {showAll ? "↑" : "↓"}
              </span>
            </button>
          </div>
        )}

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
