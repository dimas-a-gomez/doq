"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function SidebarRight({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" },
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  if (!headings || headings.length === 0) {
    return null;
  }

  return (
    <aside className="hidden lg:block w-[200px] xl:w-[250px] shrink-0 sticky top-14 h-[calc(100vh-3.5rem)]">
      <div className="h-full overflow-y-auto py-6 px-6 lg:py-8">
        <div className="space-y-2">
          <p className="font-semibold text-sm text-black dark:text-white">
            On this page
          </p>
          <ul className="m-0 list-none text-sm">
            {headings.map((heading) => {
              const isActive = activeId === heading.id;
              return (
                <li
                  key={heading.id}
                  className={`mt-0 pt-2 ${heading.level > 2 ? "pl-4" : ""}`}
                >
                  <a
                    href={`#${heading.id}`}
                    className={`inline-block no-underline transition-colors hover:text-black dark:hover:text-white ${
                      isActive
                        ? "text-accent font-medium"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {heading.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}
