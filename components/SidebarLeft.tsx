"use client";

import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/mdx";
import { NavGroup } from "./Navigation";

interface SidebarLeftProps {
  navItems: NavItem[];
}

export function SidebarLeft({ navItems }: SidebarLeftProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed top-24 z-30 hidden h-[calc(100vh-8rem)] w-full shrink-0 md:sticky md:block md:w-64 rounded-2xl border border-border bg-[var(--surface)] shadow-sm">
      <div className="h-full overflow-y-auto py-6 pr-6 pl-8 lg:py-8">
        <div className="w-full">
          {navItems.map((item) => (
            <NavGroup key={item.slug} item={item} pathname={pathname} />
          ))}
        </div>
      </div>
    </aside>
  );
}
