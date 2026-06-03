"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDocsConfig } from "@/config/docs";

export function SidebarLeft() {
  const pathname = usePathname();
  const docs = getDocsConfig();

  return (
    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block md:w-[220px] lg:w-[240px] font-mono">
      <div className="h-full overflow-y-auto py-6 pr-6 lg:py-8 min-h-[calc(100vh-3.5rem)]">
        <div className="w-full flex flex-col gap-6">
          {docs.map((group) => (
            <div key={group.title} className="flex flex-col gap-2">
              <h4 className="font-semibold text-sm text-foreground">{group.title}</h4>
              <div className="flex flex-col gap-1">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm px-2 py-1.5 rounded-md transition-colors ${
                      pathname === item.href
                        ? "bg-accent/10 text-accent font-medium/10"
                        : "text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
