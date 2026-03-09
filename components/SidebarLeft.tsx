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
    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block md:w-64 border-r border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a]">
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
