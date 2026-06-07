import Image from "next/image";
import { FaGithub, FaPlay, FaExternalLinkAlt, FaTimes, FaLock } from "react-icons/fa";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { MergedProject } from "../sectionProjects";
import { deriveAccent, deriveCategoryLabel } from "../utils/projectTheme";

type Props = {
  project: MergedProject;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: Props) {
  const { t } = useTranslation("projects");
  const accent = deriveAccent(project.stack);
  const categoryLabel = deriveCategoryLabel(project.stack);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const hasLinks = project.linkdGitHub || project.linkdVideo || project.linkSite;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full flex flex-col overflow-hidden"
        style={{
          maxWidth: "760px",
          maxHeight: "90vh",
          background: "#0b0b0b",
          border: `1px solid ${accent}40`,
          borderRadius: "22px",
          boxShadow: `0 40px 120px rgba(0,0,0,0.8), 0 0 60px -20px ${accent}55`,
        }}
      >
        {/* botão fechar */}
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 grid place-items-center rounded-full text-white/60 hover:text-white transition-colors"
          style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,.14)" }}
        >
          <FaTimes className="w-3.5 h-3.5" />
        </button>

        {/* header com imagem */}
        <div className="relative h-[200px] shrink-0 overflow-hidden bg-[#0a0a0a]">
          {project.img ? (
            <Image
              src={project.img}
              alt={project.nameProject}
              width={760}
              height={200}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-2"
              style={{
                background:
                  "repeating-linear-gradient(135deg, rgba(255,255,255,.025) 0 14px, rgba(255,255,255,0) 14px 28px), #101010",
              }}
            >
              <FaLock className="w-5 h-5" style={{ color: `${accent}44` }} />
              <span
                className="text-[11px] tracking-widest uppercase font-medium"
                style={{ color: `${accent}66` }}
              >
                {t("private_project")}
              </span>
            </div>
          )}
          {/* gradiente overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, #0b0b0b 4%, ${accent}1A 70%)`,
            }}
          />
          {/* badges */}
          <div className="absolute left-6 bottom-4 right-14 flex items-center gap-2 flex-wrap">
            <span
              className="text-[11px] font-bold uppercase tracking-[.09em] px-3 py-1 rounded-full text-black font-inter"
              style={{ background: accent }}
            >
              {categoryLabel}
            </span>
            {project.isPrivate && (
              <span
                className="inline-flex items-center gap-1 text-[11px] text-white/80 px-2.5 py-1 rounded-full border border-white/10"
                style={{ background: "rgba(0,0,0,0.5)" }}
              >
                <FaLock className="w-2.5 h-2.5" />
                {t("private_badge")}
              </span>
            )}
          </div>
        </div>

        {/* corpo com scroll */}
        <div className="overflow-y-auto custom-scrollbar flex flex-col gap-5 p-6 pb-7">
          <h3
            className="mb-0 leading-tight"
            style={{
              fontSize: "23px",
              fontWeight: 700,
              color: "#f0f0f0",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {project.nameProject}
          </h3>

          <p className="mb-0" style={{ color: "#a6a6a6", fontSize: "14.5px", lineHeight: 1.6 }}>
            {project.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-5">
            {project.features && project.features.length > 0 && (
              <div>
                <p
                  className="text-[10.5px] uppercase tracking-[.14em] font-bold mb-2.5"
                  style={{ color: "#6a6a6a" }}
                >
                  {t("modal.features_title")}
                </p>
                <ul className="flex flex-col gap-2">
                  {project.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-[13.5px] leading-[1.45]"
                      style={{ color: "#a8a8a8" }}
                    >
                      <span className="shrink-0 mt-0.5 text-xs" style={{ color: accent }}>
                        ▸
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <p
                className="text-[10.5px] uppercase tracking-[.14em] font-bold mb-2.5"
                style={{ color: "#6a6a6a" }}
              >
                {t("modal.technologies")}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] rounded-full px-2.5 py-[2px]"
                    style={{
                      border: `1px solid ${accent}55`,
                      background: `${accent}18`,
                      color: `${accent}DD`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {project.differential && (
            <div className="py-0.5 pl-3.5" style={{ borderLeft: `2px solid ${accent}` }}>
              <p
                className="text-[10.5px] uppercase tracking-[.14em] mb-1.5 font-bold"
                style={{ color: "#6a6a6a" }}
              >
                {t("modal.differential_title")}
              </p>
              <p className="text-[14px] mb-0 leading-[1.55]" style={{ color: "#cfcfcf" }}>
                {project.differential}
              </p>
            </div>
          )}

          {hasLinks ? (
            <div className="flex flex-wrap gap-2.5 pt-1">
              {project.linkSite && (
                <a
                  href={project.linkSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] font-bold px-4 py-2 rounded-[10px] text-black no-underline"
                  style={{ background: accent }}
                >
                  <FaExternalLinkAlt className="w-3 h-3" />
                  {t("modal.view_site")}
                </a>
              )}
              {project.linkdVideo && (
                <a
                  href={project.linkdVideo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] font-semibold px-4 py-2 rounded-[10px] text-white/80 no-underline border border-white/15"
                  style={{ background: "rgba(255,255,255,.03)" }}
                >
                  <FaPlay className="w-3 h-3" />
                  {t("modal.view_video")}
                </a>
              )}
              {project.linkdGitHub && (
                <a
                  href={project.linkdGitHub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] font-semibold px-4 py-2 rounded-[10px] text-white/80 no-underline border border-white/15"
                  style={{ background: "rgba(255,255,255,.03)" }}
                >
                  <FaGithub className="w-3.5 h-3.5" />
                  GitHub
                </a>
              )}
            </div>
          ) : (
            <p className="text-[12.5px] italic mb-0" style={{ color: "#6a6a6a" }}>
              {project.isPrivate
                ? "Projeto privado — sem links públicos."
                : "Em breve."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
