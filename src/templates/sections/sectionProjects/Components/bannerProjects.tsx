import { useRef } from "react";
import Image from "next/image";
import { FaLock, FaArrowRight, FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useAnimationEnabled } from "@/hooks/useAnimationDesktop";
import type { MergedProject } from "../sectionProjects";
import { deriveAccent } from "../utils/projectTheme";

type ProjectProps = {
  project: MergedProject;
  onClick: () => void;
  hero?: boolean;
};

export function BannerProjects({ project, onClick, hero = false }: ProjectProps) {
  const { t } = useTranslation("projects");
  const { isAnimationEnabled } = useAnimationEnabled();
  const cardRef = useRef<HTMLElement>(null);
  const accent = deriveAccent(project.category);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (!isAnimationEnabled || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    cardRef.current.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    cardRef.current.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    if (hero) {
      cardRef.current.style.transform = "translateY(-5px)";
    } else {
      const ry = (px - 0.5) * 9;
      const rx = (0.5 - py) * 9;
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-6px) scale(1.012)`;
    }
  }

  function handleMouseEnter() {
    if (!cardRef.current) return;
    cardRef.current.style.borderColor = `${accent}70`;
    cardRef.current.style.boxShadow = `0 22px 55px -14px ${accent}55`;
    const spot = cardRef.current.querySelector<HTMLSpanElement>(".card-spot");
    if (spot) spot.style.opacity = "1";
  }

  function handleMouseLeave() {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "none";
    cardRef.current.style.borderColor = "rgba(255,255,255,0.09)";
    cardRef.current.style.boxShadow = "none";
    const spot = cardRef.current.querySelector<HTMLSpanElement>(".card-spot");
    if (spot) spot.style.opacity = "0";
  }

  return (
    <article
      ref={cardRef as React.RefObject<HTMLElement>}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex overflow-hidden rounded-[18px] cursor-pointer h-full ${
        hero ? "flex-col md:flex-row" : "flex-col"
      }`}
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,.02), rgba(0,0,0,.2)), #0c0c0c",
        border: "1px solid rgba(255,255,255,.09)",
        transformStyle: "preserve-3d",
        willChange: "transform",
        transition: "transform .2s ease, border-color .35s ease, box-shadow .35s ease",
      }}
    >
      {/* spotlight que segue o cursor */}
      <span
        className="card-spot absolute inset-0 z-[4] pointer-events-none rounded-[18px]"
        aria-hidden
        style={{
          opacity: 0,
          transition: "opacity .35s ease",
          background: `radial-gradient(220px circle at var(--mx, 50%) var(--my, 0%), ${accent}33, transparent 60%)`,
        }}
      />
      {/* faixa de cor da categoria */}
      <span
        className="absolute top-0 left-0 right-0 h-[3px] z-[3]"
        style={{ background: accent, opacity: 0.9 }}
      />

      {/* mídia */}
      <div
        className={`relative overflow-hidden bg-[#0a0a0a] shrink-0 ${
          hero ? "md:w-[46%] min-h-[240px] h-full" : "h-[158px]"
        }`}
      >
        {project.imgs.length > 0 ? (
          <>
            <Image
              src={project.imgs[0]}
              alt={project.nameProject}
              width={hero ? 600 : 500}
              height={hero ? 320 : 160}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/85 to-transparent" />
          </>
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2"
            style={{
              background:
                "repeating-linear-gradient(135deg, rgba(255,255,255,.025) 0 14px, rgba(255,255,255,0) 14px 28px), #101010",
            }}
          >
            <span
              className="w-8 h-8 rounded-lg border border-dashed flex items-center justify-center text-sm font-bold"
              style={{ borderColor: `${accent}8C`, color: accent }}
            >
              +
            </span>
            <span
              className="text-[10px] tracking-widest uppercase font-mono"
              style={{ color: `${accent}CC` }}
            >
              {project.isPrivate ? t("private_project") : "em breve"}
            </span>
          </div>
        )}

        {/* badge categoria */}
        <div className="absolute top-3 left-3 flex gap-1.5 z-[4]">
          <span
            className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-[3px] rounded-full text-black font-inter"
            style={{ background: accent }}
          >
            {project.category}
          </span>
          {project.featured && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2.5 py-[3px] rounded-full text-black font-inter" style={{ background: "#FFC857" }}>
              <FaStar className="w-2.5 h-2.5" />
              Destaque
            </span>
          )}
        </div>
        {project.isPrivate && (
          <span className="absolute top-3 right-3 z-[4] inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2.5 py-[3px] rounded-full text-white/70 bg-black/60 border border-white/10">
            <FaLock className="w-2.5 h-2.5" />
            {t("private_badge")}
          </span>
        )}
      </div>

      {/* conteúdo */}
      <div
        className={`flex flex-col gap-3 flex-1 min-w-0 ${hero ? "p-6 md:p-7" : "p-[18px] pb-5"}`}
      >
        <div>
          <h3
            className="font-bold leading-tight tracking-tight mb-0"
            style={{
              color: "#ededed",
              fontFamily: "'Inter', sans-serif",
              fontSize: hero ? "26px" : "17px",
            }}
          >
            {project.nameProject}
          </h3>
          <div
            className="mt-2 h-[2px] w-10 rounded-full"
            style={{ background: accent, opacity: 0.8 }}
          />
        </div>

        <p
          className="leading-[1.55] mb-0 line-clamp-3"
          style={{ color: "#9b9b9b", fontSize: hero ? "15px" : "13.5px" }}
        >
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto pt-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] rounded-full px-2.5 py-[2px] whitespace-nowrap"
              style={{
                border: "1px solid rgba(255,255,255,.1)",
                background: "rgba(255,255,255,.04)",
                color: "#9a9a9a",
                transition: "all .4s ease",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold mt-1 font-inter"
          style={{ color: accent }}
        >
          {t("view_details")}
          <FaArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </article>
  );
}
