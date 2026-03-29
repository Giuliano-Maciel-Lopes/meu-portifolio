import Image from "next/image";
import { FaGithub, FaPlay, FaExternalLinkAlt, FaTimes, FaLock } from "react-icons/fa";
import { useEffect } from "react";

type Project = {
  nameProject: string;
  img: string;
  isPrivate?: boolean;
  shortDescription: string;
  description: string;
  features?: string[];
  differential?: string;
  stack: string[];
  linkdVideo?: string;
  linkdGitHub?: string;
  linkSite?: string;
};

type Props = {
  project: Project;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const hasLinks = project.linkdGitHub || project.linkdVideo || project.linkSite;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-[0_32px_100px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-7 h-7 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white hover:border-white/25 transition-all"
        >
          <FaTimes className="w-3 h-3" />
        </button>

        <div className="w-full h-[180px] overflow-hidden relative">
          {project.img ? (
            <Image
              src={project.img}
              alt={project.nameProject}
              width={900}
              height={180}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex flex-col items-center justify-center gap-2">
              <FaLock className="w-6 h-6 text-white/10" />
              <span className="text-white/15 text-[11px] tracking-widest uppercase font-medium">
                Projeto Privado
              </span>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-0 -mt-4">
          <div className="px-6 pb-6 pt-2 border-r border-white/5 flex flex-col gap-5">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-2.5">
                Tecnologias
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] border border-white/10 bg-white/[0.04] rounded-full px-2.5 py-0.5 text-gray-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {hasLinks && (
              <div className="flex flex-col gap-2 mt-auto">
                {project.linkSite && (
                  <a
                    href={project.linkSite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-xs bg-amber/90 hover:bg-amber text-black font-bold px-3 py-2 rounded-lg transition-colors"
                  >
                    <FaExternalLinkAlt className="w-3 h-3" /> Ver projeto
                  </a>
                )}
                {project.linkdGitHub && (
                  <a
                    href={project.linkdGitHub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-xs border border-white/15 hover:border-gold/50 text-white/60 hover:text-amber px-3 py-2 rounded-lg transition-colors"
                  >
                    <FaGithub className="w-3.5 h-3.5" /> GitHub
                  </a>
                )}
                {project.linkdVideo && (
                  <a
                    href={project.linkdVideo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-xs bg-blue-700/70 hover:bg-blue-600 text-white px-3 py-2 rounded-lg border border-blue-500/20 transition-colors"
                  >
                    <FaPlay className="w-3 h-3" /> Ver vídeo
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="px-6 pb-6 pt-3 flex flex-col gap-4 max-h-[420px] overflow-y-auto custom-scrollbar">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold tracking-tight text-textPrimary mb-0 leading-tight">
                {project.nameProject}
              </h3>
              {project.isPrivate && (
                <span className="flex items-center gap-1 bg-zinc-800/90 text-white/50 text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wide uppercase shrink-0">
                  <FaLock className="w-2 h-2" /> Privado
                </span>
              )}
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-0">
              {project.description}
            </p>

            {project.features && project.features.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-2.5">
                  Funcionalidades
                </p>
                <ul className="space-y-1.5">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className="text-amber shrink-0 mt-0.5 text-xs">▸</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.differential && (
              <div className="border-l-2 border-gold/30 pl-3 py-0.5">
                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">
                  Diferencial
                </p>
                <p className="text-sm text-gray-300 mb-0 leading-relaxed">
                  {project.differential}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
