import React, { SVGProps } from "react";
import { motion } from "framer-motion";
import { warpIn } from "@/styles/animaçoes/animaçoes";
import { useAnimationEnabled } from "@/hooks/useAnimationDesktop";

type SkillItem = {
  name: string;
  Icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  description?: string;
  color: string;
};

type BoxProps = {
  items: SkillItem[];
  category: string | null;
};

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "255, 255, 255";
}

export function BoxSkills({ items, category }: BoxProps) {
  const { isAnimationEnabled } = useAnimationEnabled();

  return (
    <div key={category || "all"} className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {items.map((item, index) => {
        const rgb = hexToRgb(item.color);
        const iconColor =
          item.color === "#000000" || item.color === "#20232A" || item.color === "#0C344B"
            ? "#ffffff"
            : item.color;

        return (
          <motion.div
            key={index}
            custom={index % 4}
            variants={isAnimationEnabled ? warpIn : undefined}
            initial={isAnimationEnabled ? "hidden" : undefined}
            whileInView={isAnimationEnabled ? "visible" : undefined}
            viewport={isAnimationEnabled ? { once: true, amount: 0.2 } : undefined}
            className="group relative flex flex-col items-center p-4 rounded-xl bg-zinc-900 overflow-hidden cursor-default transition-all duration-300 ease-out hover:-translate-y-1"
            style={{
              border: `1px solid rgba(${rgb}, 0.25)`,
              boxShadow: `0 0 0px rgba(${rgb}, 0)`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.border = `1px solid rgba(${rgb}, 0.7)`;
              (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px rgba(${rgb}, 0.2)`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.border = `1px solid rgba(${rgb}, 0.25)`;
              (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0px rgba(${rgb}, 0)`;
            }}
          >
            <div
              className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 0%, rgba(${rgb}, 0.15) 0%, transparent 70%)`,
              }}
            />

            <div className="text-4xl mb-2 relative z-10 transition-transform duration-300 group-hover:scale-110">
              <item.Icon color={iconColor} />
            </div>

            <h4 className="font-semibold text-white mb-1 relative z-10 text-center">
              {item.name}
            </h4>
            {item.description && (
              <p className="text-sm text-textSecondary text-center relative z-10">
                {item.description}
              </p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
