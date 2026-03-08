"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarLeftProps {
  docs: { slug: string; meta: any }[];
}

export function SidebarLeft({ docs }: SidebarLeftProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block md:w-64 border-r border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="h-full overflow-y-auto py-6 pr-6 pl-8 lg:py-8">
        <div className="w-full">
          <div className="pb-4">
            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold text-white">
              Getting Started
            </h4>
            <div className="grid grid-flow-row auto-rows-max text-sm">
              {docs.map((doc) => {
                const href = `/docs/${doc.slug}`;
                const isActive = pathname === href;
                return (
                  <Link
                    key={doc.slug}
                    href={href}
                    className={cn(
                      "group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:underline",
                      isActive
                        ? "font-medium text-cyan-400 bg-cyan-400/10 border-cyan-400/20"
                        : "text-gray-400 hover:text-gray-100",
                    )}
                  >
                    {doc.meta.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
