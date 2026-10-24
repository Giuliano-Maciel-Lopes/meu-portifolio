import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useAnimationEnabled } from "@/hooks/useAnimationDesktop";
import { StarField } from "@/templates/sections/sectionhero/components/StarField";

// three.js só no cliente e fora do bundle inicial
const SpaceScene = dynamic(
  () => import("@/components/space/SpaceScene").then((m) => m.SpaceScene),
  { ssr: false }
);

/**
 * Fundo fixo atrás de todo o site.
 * - Desktop com animação liberada: viagem 3D pelo espaço (SpaceScene)
 * - Mobile ou prefers-reduced-motion: campo de estrelas leve em CSS (sem Canvas)
 */
export function SpaceBackground() {
  const { isAnimationEnabled } = useAnimationEnabled();
  const [lite, setLite] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // máquinas mais fracas recebem menos partículas
    setLite((navigator.hardwareConcurrency ?? 8) <= 4);
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none bg-black">
      {isAnimationEnabled ? (
        <div className="hidden md:block absolute inset-0">
          <SpaceScene lite={lite} reduced={false} />
        </div>
      ) : (
        // estrelas aleatórias só no cliente, evitando diferença entre SSR e hidratação
        mounted && <StarField />
      )}
      {/* vinheta: escurece as bordas e mantém a leitura do conteúdo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
