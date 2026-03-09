"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as Icons from "lucide-react";
import { useState } from "react";
import type { NavItem } from "@/lib/mdx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Función para convertir nombres como "arrow-down" o "house" a "ArrowDown" o "House"
function toPascalCase(str: string) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

export function IconRender({ name }: { name?: string }) {
  if (!name) return null;
  
  // Convertimos el nombre que pongas en _meta.json al formato que usa React (PascalCase)
  const pascalName = toPascalCase(name);
  
  // @ts-ignore
  const IconComponent = Icons[pascalName] || Icons[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" (tried "${pascalName}") not found in lucide-react.`);
    return null;
  }
  
  return <IconComponent className="mr-2 h-[18px] w-[18px]" />;
}

export function NavGroup({ item, pathname, level = 0, onClick }: { item: NavItem; pathname: string; level?: number; onClick?: () => void }) {
  const [isOpen, setIsOpen] = useState(true);
  
  const hasChildren = item.children && item.children.length > 0;
  const href = `/docs${item.slug ? `/${item.slug}` : ""}`;
  const isActive = pathname === href;

  if (hasChildren) {
    return (
      <div className="mb-4">
        <div className="flex w-full items-center justify-between rounded-md px-2 py-2 hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/10 dark:active:bg-white/10 transition-colors">
          <Link
            href={href}
            onClick={onClick}
            className={cn(
              "flex flex-1 items-center text-base md:text-sm font-semibold min-h-[44px] md:min-h-0",
              isActive ? "text-accent" : "text-black dark:text-white"
            )}
          >
            {level === 0 && <IconRender name={item.icon} />}
            {item.title}
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 md:p-1 text-gray-500 hover:text-black dark:hover:text-white min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0 flex items-center justify-center"
          >
            <Icons.ChevronDown
              className={cn("h-5 w-5 md:h-4 md:w-4 transition-transform", !isOpen && "-rotate-90")}
            />
          </button>
        </div>
        {isOpen && (
          <div className="mt-1 grid grid-flow-row auto-rows-max text-base md:text-sm pl-4 border-l border-black/10 dark:border-white/10 ml-2">
            {item.children!.filter(child => child.slug !== item.slug).map((child) => (
              <NavGroup key={child.slug} item={child} pathname={pathname} level={level + 1} onClick={onClick} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group flex w-full items-center rounded-md border border-transparent px-2 py-2 md:py-1.5 hover:underline min-h-[44px] md:min-h-0 active:bg-black/5 dark:active:bg-white/5 transition-colors",
        isActive
          ? "font-medium text-accent bg-accent/10 border-accent/20"
          : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-gray-100",
      )}
    >
      {level === 0 && <IconRender name={item.icon} />}
      {item.title}
    </Link>
  );
}
