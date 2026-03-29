import { useState } from "react";
import { projects } from "./utils/projects";
import { BannerProjects } from "./Components/bannerProjects";
import { ProjectModal } from "./Components/ProjectModal";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CARDS_PER_PAGE = 4;

type Project = (typeof projects)[number];

export function SectionProjects() {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);

  const totalPages = Math.ceil(projects.length / CARDS_PER_PAGE);
  const start = page * CARDS_PER_PAGE;
  const visible = projects.slice(start, start + CARDS_PER_PAGE);

  return (
    <section id="projects" className="scroll-mt-24">
      <div className="container grid gap-8">
        <div className="text-center space-y-2">
          <h3 className="text-center text-3xl font-bold tracking-tight">
            Projetos{" "}
            <span className="bg-gradient-to-r from-amber to-gold bg-clip-text text-transparent">
              Pessoais
            </span>
          </h3>
          <p className="text-textSecondary text-sm tracking-widest uppercase mb-0">
            Clique em um projeto para ver mais detalhes
          </p>
        </div>

        <motion.div
          className="mx-auto bg-yellow-500 text-white font-bold text-xl md:text-2xl rounded-full w-20 h-20 flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          +20
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {visible.map((project, index) => (
              <motion.div
                key={start + index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="h-full"
              >
                <BannerProjects
                  project={project}
                  onClick={() => setSelected(project)}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-white/50 hover:border-gold/40 hover:text-amber disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <FaChevronLeft className="w-3.5 h-3.5" />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    i === page
                      ? "bg-amber w-5"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-white/50 hover:border-gold/40 hover:text-amber disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <FaChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="flex justify-center">
          <a
            href="https://github.com/Giuliano-Maciel-Lopes"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-textSecondary hover:text-amber transition-colors duration-200 group"
          >
            <FaGithub className="w-4 h-4 group-hover:text-amber transition-colors" />
            Ver todos os projetos no GitHub
            <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
              →
            </span>
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
            <ProjectModal
              project={selected}
              onClose={() => setSelected(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
