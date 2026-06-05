"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDocsConfig } from "@/config/docs";
import { badgeStyles, BadgeVariant } from "./mdx/Badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./Tooltip";

export function SidebarLeft() {
  const pathname = usePathname();
  const docs = getDocsConfig();

  return (
    <aside className="hidden h-full min-h-0 shrink-0 md:block md:w-[220px] lg:w-[240px] font-mono overflow-y-auto py-6 pr-6 lg:py-8 custom-scrollbar">
      <TooltipProvider delayDuration={300}>
        <div className="w-full flex flex-col">
          {docs.map((group, index) => (
            <div key={group.title} className="flex flex-col">
              {index > 0 && <hr className="my-6 border-black/10 dark:border-white/10" />}
              <div className="flex flex-col gap-2">
                <h4 className="flex items-center gap-2 font-semibold text-sm text-foreground">
                  {group.icon && <group.icon className="h-4 w-4" />}
                  {group.title}
                </h4>
                <div className="flex flex-col gap-1">
                  {group.items.map((item: any) => {
                    const linkContent = (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`text-sm px-2 py-1.5 rounded-md transition-colors font-bold flex items-center justify-between ${
                          pathname === item.href
                            ? "bg-accent/10 text-accent"
                            : "text-foreground/60 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                        }`}
                      >
                        <span className="truncate">{item.title}</span>
                        {item.badge && (
                          <span className={`shrink-0 ml-2 rounded-md px-1.5 py-0.5 text-[10px] font-bold leading-none ${badgeStyles[(item.badgeVariant as BadgeVariant) || 'default']}`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );

                    if (item.description) {
                      return (
                        <Tooltip key={item.href}>
                          <TooltipTrigger asChild>
                            {linkContent}
                          </TooltipTrigger>
                          <TooltipContent side="right" sideOffset={12}>
                            <p className="font-sans">{item.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    }

                    return linkContent;
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </TooltipProvider>
    </aside>
  );
}
