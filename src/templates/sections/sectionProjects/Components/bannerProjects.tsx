import Image from "next/image";
import { FaLock } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import type { MergedProject } from "../sectionProjects";

type ProjectProps = {
  project: MergedProject;
  onClick: () => void;
};

export function BannerProjects({ project, onClick }: ProjectProps) {
  const { t } = useTranslation("projects");

  return (
    <div
      onClick={onClick}
      className="
        group
        w-full h-full
        flex flex-col
        relative
        border border-white/10
        rounded-2xl
        bg-[#0d0d0d]/80
        backdrop-blur-sm
        shadow-[0_4px_24px_rgba(0,0,0,0.5)]
        hover:shadow-[0_12px_48px_rgba(212,163,115,0.15)]
        hover:border-gold/35
        hover:scale-[1.02]
        hover:-translate-y-1
        transition-all duration-300 ease-in-out
        cursor-pointer
        p-5
      "
    >
      {project.isPrivate && (
        <div className="absolute top-3 right-3 z-10">
          <div className="flex items-center gap-1 bg-zinc-800/90 text-white/50 text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wide uppercase">
            <FaLock className="w-2.5 h-2.5" />
            {t("private_badge")}
          </div>
        </div>
      )}

      <div className="w-full h-[160px] overflow-hidden rounded-xl relative shrink-0">
        {project.img ? (
          <>
            <Image
              src={project.img}
              alt={project.nameProject}
              width={500}
              height={160}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
              <span className="text-white/90 text-xs font-medium bg-white/10 border border-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                {t("view_details")}
              </span>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex flex-col items-center justify-center gap-2 border border-white/5 rounded-xl group-hover:border-white/10 transition-colors">
            <FaLock className="w-5 h-5 text-white/15" />
            <span className="text-white/20 text-[10px] tracking-widest uppercase font-medium">
              {t("private_project")}
            </span>
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white/60 text-xs font-medium bg-white/10 border border-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full">
                {t("view_details")}
              </span>
            </span>
          </div>
        )}
      </div>

      <h3 className="mt-4 text-base font-bold border-b border-gold/20 pb-2 tracking-tight text-textPrimary leading-snug">
        {project.nameProject}
      </h3>

      <p className="text-gray-400 mt-2.5 text-sm leading-relaxed flex-1 mb-0 line-clamp-3">
        {project.shortDescription}
      </p>

      <div className="flex flex-wrap items-center gap-1.5 mt-4">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="text-[11px] border border-white/10 bg-white/[0.04] rounded-full px-2.5 py-0.5 text-gray-400 group-hover:border-gold/20 transition-colors duration-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
