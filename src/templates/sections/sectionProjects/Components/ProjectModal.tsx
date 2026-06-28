import Image from "next/image";
import { FaGithub, FaPlay, FaExternalLinkAlt, FaTimes, FaLock, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { MergedProject } from "../sectionProjects";
import { deriveAccent } from "../utils/projectTheme";

type Props = {
  project: MergedProject;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: Props) {
  const { t } = useTranslation("projects");
  const accent = deriveAccent(project.category);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [fullscreenIdx, setFullscreenIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const carouselImages = project.imgs;
  const showCarousel = carouselImages.length > 1;
  const hasLinks = project.linkdGitHub || project.linkdVideo || project.linkSite;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (fullscreenIdx !== null) { setFullscreenIdx(null); return; }
        onClose();
      }
      if (fullscreenIdx !== null) {
        if (e.key === "ArrowRight") setFullscreenIdx((i) => Math.min((i ?? 0) + 1, carouselImages.length - 1));
        if (e.key === "ArrowLeft") setFullscreenIdx((i) => Math.max((i ?? 0) - 1, 0));
        return;
      }
      if (showCarousel && e.key === "ArrowRight") goToSlide(Math.min(currentSlide + 1, carouselImages.length - 1));
      if (showCarousel && e.key === "ArrowLeft") goToSlide(Math.max(currentSlide - 1, 0));
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, currentSlide, showCarousel, fullscreenIdx, carouselImages.length]);

  function handleScroll() {
    if (!scrollRef.current) return;
    const idx = Math.round(scrollRef.current.scrollLeft / scrollRef.current.offsetWidth);
    setCurrentSlide(idx);
  }

  function goToSlide(i: number) {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({ left: i * scrollRef.current.offsetWidth, behavior: "smooth" });
    setCurrentSlide(i);
  }

  function onDragStart(e: React.MouseEvent) {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftStart.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.scrollBehavior = "auto";
  }

  function onDragMove(e: React.MouseEvent) {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeftStart.current - (x - startX.current) * 1.2;
  }

  function onDragEnd() {
    if (!scrollRef.current) return;
    isDragging.current = false;
    scrollRef.current.style.scrollBehavior = "smooth";
  }

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

        {/* header com imagem / carousel */}
        <div className="relative h-[200px] shrink-0 overflow-hidden bg-[#0a0a0a]">
          {carouselImages.length > 0 ? (
            <div
              ref={scrollRef}
              className={`flex h-full overflow-x-scroll scrollbar-none ${showCarousel ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
              style={{ scrollSnapType: "x mandatory" }}
              onScroll={handleScroll}
              onMouseDown={showCarousel ? onDragStart : undefined}
              onMouseMove={showCarousel ? onDragMove : undefined}
              onMouseUp={showCarousel ? onDragEnd : undefined}
              onMouseLeave={showCarousel ? onDragEnd : undefined}
            >
              {carouselImages.map((src, i) => (
                <div
                  key={i}
                  className="relative shrink-0 w-full h-full cursor-zoom-in"
                  style={{ scrollSnapAlign: "start" }}
                  onClick={() => setFullscreenIdx(i)}
                >
                  <Image
                    src={src}
                    alt={`${project.nameProject} ${i + 1}`}
                    width={760}
                    height={200}
                    className="w-full h-full object-cover select-none"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
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
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to top, #0b0b0b 4%, ${accent}1A 70%)`,
            }}
          />

          {/* dot indicators */}
          {showCarousel && (
            <div className="absolute bottom-[52px] left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {carouselImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                  className="transition-all duration-200 rounded-full"
                  style={{
                    width: i === currentSlide ? "16px" : "6px",
                    height: "6px",
                    background: i === currentSlide ? "#fff" : "rgba(255,255,255,0.3)",
                  }}
                />
              ))}
            </div>
          )}

          {/* badges */}
          <div className="absolute left-6 bottom-4 right-14 flex items-center gap-2 flex-wrap z-10">
            <span
              className="text-[11px] font-bold uppercase tracking-[.09em] px-3 py-1 rounded-full text-black font-inter"
              style={{ background: accent }}
            >
              {project.category}
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

          {/* links no topo */}
          {hasLinks ? (
            <div className="flex flex-wrap gap-2.5">
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
              {project.isPrivate ? "Projeto privado — sem links públicos." : "Em breve."}
            </p>
          )}

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
        </div>
      </div>

      {/* lightbox carousel */}
      {fullscreenIdx !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(12px)" }}
          onClick={() => setFullscreenIdx(null)}
        >
          <div
            className="relative w-full flex flex-col overflow-hidden"
            style={{
              maxWidth: "820px",
              background: "#111",
              borderRadius: "18px",
              border: `1px solid ${accent}30`,
              boxShadow: `0 32px 80px rgba(0,0,0,0.8)`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setFullscreenIdx(null)}
              aria-label="Fechar"
              className="absolute top-3 right-3 z-20 w-8 h-8 grid place-items-center rounded-full text-white/60 hover:text-white transition-colors"
              style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.14)" }}
            >
              <FaTimes className="w-3.5 h-3.5" />
            </button>

            {/* imagem */}
            <div className="relative w-full" style={{ height: "min(55vh, 440px)" }}>
              <Image
                src={carouselImages[fullscreenIdx]}
                alt={`${project.nameProject} ${fullscreenIdx + 1}`}
                fill
                className="object-contain"
              />

              {carouselImages.length > 1 && (
                <>
                  <button
                    onClick={() => setFullscreenIdx((i) => Math.max((i ?? 0) - 1, 0))}
                    disabled={fullscreenIdx === 0}
                    aria-label="Anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 grid place-items-center rounded-full text-white/70 hover:text-white disabled:opacity-20 transition-all"
                    style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.15)" }}
                  >
                    <FaChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setFullscreenIdx((i) => Math.min((i ?? 0) + 1, carouselImages.length - 1))}
                    disabled={fullscreenIdx === carouselImages.length - 1}
                    aria-label="Próximo"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 grid place-items-center rounded-full text-white/70 hover:text-white disabled:opacity-20 transition-all"
                    style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.15)" }}
                  >
                    <FaChevronRight className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>

            {/* dots + contador */}
            {carouselImages.length > 1 && (
              <div className="flex items-center justify-center gap-3 py-3 border-t border-white/[0.06]">
                <div className="flex gap-1.5">
                  {carouselImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setFullscreenIdx(i)}
                      className="rounded-full transition-all duration-200"
                      style={{
                        width: i === fullscreenIdx ? "16px" : "6px",
                        height: "6px",
                        background: i === fullscreenIdx ? "#fff" : "rgba(255,255,255,0.25)",
                      }}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-white/30 font-inter">
                  {fullscreenIdx + 1} / {carouselImages.length}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
