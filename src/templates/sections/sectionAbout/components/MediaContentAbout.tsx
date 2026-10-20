import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { fadeInFromRight } from "@/styles/animaçoes/animaçoes";
import { useAnimationEnabled } from "@/hooks/useAnimationDesktop";
import { SiNextdotjs, SiNodedotjs, SiTypescript, SiDocker, SiPostgresql, SiN8N } from "react-icons/si";

const floatingIcons = [
  { Icon: SiNextdotjs, color: "#ffffff", angle: 0 },
  { Icon: SiNodedotjs, color: "#3C873A", angle: 60 },
  { Icon: SiTypescript, color: "#3178C6", angle: 120 },
  { Icon: SiDocker, color: "#2496ED", angle: 180 },
  { Icon: SiPostgresql, color: "#336791", angle: 240 },
  { Icon: SiN8N, color: "#EA4B71", angle: 300 },
];

const ORBIT_RADIUS = 200;
const PHOTO = "/linkdingiu.png";

// three.js só no cliente
const AstronautHelmet = dynamic(
  () => import("@/templates/sections/sectionAbout/components/AstronautHelmet").then((m) => m.AstronautHelmet),
  { ssr: false }
);

export function MediaContentAbout() {
  const { isAnimationEnabled } = useAnimationEnabled();

  return (
    <motion.div
      key={isAnimationEnabled ? "anim" : "no-anim"}
      initial={isAnimationEnabled ? "hidden" : false}
      whileInView={isAnimationEnabled ? "visible" : undefined}
      viewport={isAnimationEnabled ? { once: false, amount: 0.5 } : undefined}
      variants={isAnimationEnabled ? fadeInFromRight : undefined}
      className="relative md:w-1/2 md:flex justify-center items-center hidden"
      style={{ height: 420 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute"
        style={{ width: ORBIT_RADIUS * 2, height: ORBIT_RADIUS * 2 }}
      >
        {floatingIcons.map(({ Icon, color, angle }, index) => {
          const rad = (angle * Math.PI) / 180;
          const x = ORBIT_RADIUS + ORBIT_RADIUS * Math.cos(rad) - 18;
          const y = ORBIT_RADIUS + ORBIT_RADIUS * Math.sin(rad) - 18;

          return (
            <motion.div
              key={index}
              className="absolute w-9 h-9 flex items-center justify-center rounded-full bg-zinc-900 border border-white/10"
              style={{ left: x, top: y }}
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Icon color={color} size={18} />
            </motion.div>
          );
        })}
      </motion.div>

      {isAnimationEnabled ? (
        <div className="hidden md:block relative z-10 w-[380px] h-[380px]">
          <AstronautHelmet photo={PHOTO} />
        </div>
      ) : (
        <div className="relative z-10 rounded-full p-1 border-4 border-amber shadow-[0_0_25px_rgba(255,200,87,0.4)]">
          <Image
            src={PHOTO}
            alt="Giuliano Maciel"
            width={280}
            height={280}
            className="rounded-full object-cover w-[280px] h-[280px]"
          />
        </div>
      )}
    </motion.div>
  );
}
