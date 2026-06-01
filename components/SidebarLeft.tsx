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
    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block md:w-[220px] lg:w-[240px]">
      <div className="h-full overflow-y-auto py-6 pr-6 lg:py-8 border-r border-border min-h-[calc(100vh-3.5rem)]">
        <div className="w-full">
          {navItems.map((item) => (
            <NavGroup key={item.slug} item={item} pathname={pathname} />
          ))}
        </div>
      </div>
    </aside>
  );
}
