import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { LeftContent } from "./components/leftcontent";
import { RigthContet } from "./components/rigthContent";
import { useAnimationEnabled } from "@/hooks/useAnimationDesktop";

// three.js só no cliente e fora do bundle inicial
const HeroVenus = dynamic(
  () => import("@/templates/sections/sectionhero/components/HeroVenus").then((m) => m.HeroVenus),
  { ssr: false }
);

export function SectionHero() {
  const { isAnimationEnabled } = useAnimationEnabled();
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative pt-20 pb-16 md:pb-0 md:min-h-[85vh] md:flex md:items-center scroll-mt-24 text-white">
      {isAnimationEnabled && (
        <div className="hidden md:block absolute inset-0 z-0 opacity-80 pointer-events-none">
          <HeroVenus active={inView} />
        </div>
      )}

      <div
        className="absolute top-0 left-0 w-[180px] h-[180px] md:w-[300px] md:h-[300px] rounded-full z-10 pointer-events-none blur-[70px] md:blur-[120px]"
        style={{
          background: "radial-gradient(circle, #ffd700, #bfa058, transparent 70%)",
          opacity: 0.4,
        }}
      />

      <div className="container flex md:flex-row flex-col gap-8 relative z-20">
        <div className="flex flex-col">
          <div className="flex md:flex-row flex-col gap-8">
            <LeftContent />
            <RigthContet />
          </div>
        </div>
      </div>
    </section>
  );
}
