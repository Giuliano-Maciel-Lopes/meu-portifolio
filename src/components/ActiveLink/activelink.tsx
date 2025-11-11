import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  children?: React.ReactNode;
} & LinkProps;

export function ActiveLinkContent({ children, href, ...rest }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      {...rest}
      className={`
        block w-full h-full px-4 py-2 rounded-md transition-all duration-300
        ${isActive
          ? "bg-amber-700 text-white font-semibold shadow-[0_0_10px_#FFD700]"
          : "bg-transparent text-white hover:text-amber-100 hover:bg-amber-600 hover:text-yellow-300 hover:shadow-[0_0_12px_#FFD700]"
        }
      `}
    >
      {children}
    </Link>
  );
}
