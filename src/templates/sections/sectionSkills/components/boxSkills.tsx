import React from "react";
import { motion, Variants } from "framer-motion";



type SkillItem = {
  name: string;
  Icon: React.ElementType;
  description?: string;
  color: string;
};


type BoxProps = {
  items: SkillItem[];
  category: string | null;
};


const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }, // intervalo de 15 em 15 
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function BoxSkills({ items, category }: BoxProps) {
  return (
    <motion.div
      key={category || "all"} // força recriação quando mudar categoria
      className="grid grid-cols-2 md:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center p-4 rounded-xl border bg-card border-gold"
          variants={itemVariants}
        >
          <div className="text-4xl mb-2">
            <item.Icon color={item.color} />
          </div>
          <h4 className="font-semibold text-white mb-1">{item.name}</h4>
          {item.description && (
            <p className="text-sm text-textSecondary text-center">
              {item.description}
            </p>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}