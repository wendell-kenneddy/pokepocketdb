"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface SidebarLinkProps {
  children: ReactNode;
  href: string;
}

export function SidebarLink({ children, href }: SidebarLinkProps) {
  const pathname = usePathname();
  const styles =
    pathname == href ? "text-teal-400 font-medium" : "text-gray-100/50 hover:text-gray-100";

  return (
    <Link href={href} className={`${styles} text-xs uppercase`}>
      {children}
    </Link>
  );
}
