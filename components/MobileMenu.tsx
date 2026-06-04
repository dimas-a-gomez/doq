"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { getDocsConfig } from "@/config/docs";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const docs = getDocsConfig();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Open menu</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background font-mono flex flex-col h-[100dvh]">
          <div className="flex h-14 items-center px-4 justify-between">
            <Link href="/" className="font-bold text-xl tracking-tight font-sans">
              DOQMEN
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 py-6">
            <div className="flex flex-col gap-6">
              {docs.map((group) => (
                <div key={group.title} className="flex flex-col gap-2">
                  <h4 className="font-semibold text-sm text-foreground">{group.title}</h4>
                  <div className="flex flex-col gap-1">
                    {group.items.map((item: any) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`text-sm px-2 py-2 rounded-md transition-colors flex items-center justify-between font-bold ${
                          pathname === item.href
                            ? "bg-accent/10 text-accent"
                            : "text-foreground/60 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                        }`}
                      >
                        <span className="truncate">{item.title}</span>
                        {item.badge && (
                          <span className="shrink-0 ml-2 rounded-md bg-[#183933] px-1.5 py-0.5 text-[10px] font-bold leading-none text-[#5DE4c7]">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
