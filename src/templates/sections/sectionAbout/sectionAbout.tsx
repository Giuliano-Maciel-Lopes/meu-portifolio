import { MediaContentAbout } from "./components/MediaContentAbout";
import { TextContentAbout } from "./components/TextAbout";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "@/components/sectionTitle/SectionTitle";

export function SectionAbout() {
  const { t } = useTranslation("about");

  return (
    <section id="about" className="scroll-mt-24 relative overflow-hidden md:py-20">
      {/* nebulosas em CSS: animam no compositor, sem trabalho de JS por frame */}
      <div aria-hidden className="hidden md:block pointer-events-none">
        <div
          className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full blur-[60px] will-change-transform motion-safe:animate-nebula"
          style={{
            background: "radial-gradient(circle, rgba(99,57,255,0.12), transparent 70%)",
            animationDuration: "8s",
          }}
        />
        <div
          className="absolute -bottom-10 -left-20 w-[350px] h-[350px] rounded-full blur-[70px] will-change-transform motion-safe:animate-nebula"
          style={{
            background: "radial-gradient(circle, rgba(20,120,255,0.1), transparent 70%)",
            animationDelay: "2s",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-[300px] h-[300px] rounded-full blur-[80px] will-change-transform motion-safe:animate-nebula"
            style={{
              background: "radial-gradient(circle, rgba(212,163,115,0.06), transparent 70%)",
              animationDuration: "12s",
              animationDelay: "4s",
            }}
          />
        </div>
      </div>

      <div className="container flex flex-col relative z-10">
        <SectionTitle index="04" title={t("title")} />

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12 pb-16 md:pb-0">
          <TextContentAbout />
          <MediaContentAbout />
        </div>
      </div>
    </section>
  );
}
