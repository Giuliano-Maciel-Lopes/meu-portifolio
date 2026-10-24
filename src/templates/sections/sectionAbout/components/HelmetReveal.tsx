import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useAnimationEnabled } from "@/hooks/useAnimationDesktop";
import { cn } from "@/lib/utils";

// As duas fotos têm o mesmo enquadramento; a do rosto fica por cima, recortada pela lente
const HELMET_PHOTO = "/about/astronauta-capacete.webp";
const FACE_PHOTO = "/about/astronauta-rosto.webp";
const PHOTO_POSITION = "object-[25%_50%]";

const LENS_RADIUS = 150;
// No toque a lente abre o suficiente para mostrar o rosto inteiro
const TAP_RADIUS = 260;
// Fração do raio que fica 100% visível antes da borda suave
const LENS_SOLID = 0.55;
const SPRING = { stiffness: 260, damping: 28, mass: 0.6 };

export function HelmetReveal() {
  const { t } = useTranslation("about");
  const { isAnimationEnabled } = useAnimationEnabled();
  const [revealed, setRevealed] = useState(false);
  const tapOpen = useRef(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const radius = useMotionValue(0);

  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);
  const springRadius = useSpring(radius, SPRING);

  const lensX = isAnimationEnabled ? springX : x;
  const lensY = isAnimationEnabled ? springY : y;
  const lensRadius = isAnimationEnabled ? springRadius : radius;
  const lensSolid = useTransform(lensRadius, (r) => r * LENS_SOLID);
  const ringSize = useTransform(lensSolid, (r) => r * 2);
  const ringOpacity = useTransform(lensRadius, [0, 40], [0, 1]);

  const mask = useMotionTemplate`radial-gradient(circle at ${lensX}px ${lensY}px, #000 ${lensSolid}px, transparent ${lensRadius}px)`;

  const moveLens = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    // a lente nasce no ponto onde o mouse entrou, sem atravessar a foto
    const rect = event.currentTarget.getBoundingClientRect();
    springX.jump(event.clientX - rect.left);
    springY.jump(event.clientY - rect.top);
    moveLens(event);
    radius.set(LENS_RADIUS);
    setRevealed(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") moveLens(event);
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    radius.set(0);
  };

  // No celular não existe hover: cada toque abre ou fecha a lente
  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    tapOpen.current = !tapOpen.current;
    moveLens(event);
    radius.set(tapOpen.current ? TAP_RADIUS : 0);
    setRevealed(true);
  };

  return (
    <div className="relative w-full">
      <div
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerUp={handlePointerUp}
        className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gold/30 bg-card shadow-[0_0_40px_rgba(212,163,115,0.15)] cursor-none touch-manipulation select-none"
      >
        <Image
          src={HELMET_PHOTO}
          alt={t("photo_alt")}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className={cn("object-cover", PHOTO_POSITION)}
          draggable={false}
        />

        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{ maskImage: mask, WebkitMaskImage: mask }}
        >
          <Image
            src={FACE_PHOTO}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className={cn("object-cover", PHOTO_POSITION)}
            draggable={false}
          />
        </motion.div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 hidden md:block rounded-full border border-gold/50 shadow-[0_0_25px_rgba(255,200,87,0.35)]"
          style={{
            x: lensX,
            y: lensY,
            width: ringSize,
            height: ringSize,
            opacity: ringOpacity,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />

        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
      </div>

      <span
        className={cn(
          "mt-3 block text-center text-xs uppercase tracking-[0.2em] text-textSecondary transition-opacity duration-500",
          revealed && "opacity-0"
        )}
      >
        <span className="hidden md:inline">{t("reveal_hint_hover")}</span>
        <span className="md:hidden">{t("reveal_hint_tap")}</span>
      </span>
    </div>
  );
}
