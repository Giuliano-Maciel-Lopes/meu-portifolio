"use client";

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
        block w-full h-full px-4 py-2 rounded-md transition
        ${isActive ? "bg-yellow-900 text-yellow-400 font-semibold" : "text-black hover:text-yellow-400 hover:bg-gray-900"}
      `}
    >
      {children}
    </Link>
  );
}
