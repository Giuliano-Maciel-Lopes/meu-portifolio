import React from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export function ActiveLinkBorder({ children, className }: Props) {
  return (
    <div className={`border rounded-full border-blue-400 flex px-2 w-full py-2 hover:shadow-md transition-shadow duration-200  ${className || ""}`}>
      {children}
    </div>
  );
}