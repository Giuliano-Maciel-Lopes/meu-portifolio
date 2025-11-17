import React from "react";

type SkillItem = {
  name: string;
  Icon: React.ElementType;
  description?: string;
};

type Props = {
  items: SkillItem[];
};

export function BoxSkills({ items }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center p-4 rounded-xl border bg-card border-gold"
        >
          <div className="text-4xl mb-2">
            <item.Icon />
          </div>
          <h4 className="font-semibold text-white mb-1">{item.name}</h4>
          {item.description && (
            <p className="text-sm text-textSecondary text-center">
              {item.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
