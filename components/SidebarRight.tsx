"use client";
import { useEffect, useState } from "react";

export function SidebarRight() {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("main h2, main h3"))
      .map((element) => ({
        id: element.id,
        text: element.textContent || "",
        level: Number(element.tagName.replace("H", ""))
      }))
      .filter((heading) => heading.id);
    
    setHeadings(elements);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    elements.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden lg:block w-[200px] xl:w-[250px] shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] font-mono">
      <div className="h-full overflow-y-auto py-6 px-6 lg:py-8">
        <div className="space-y-4">
          <p className="font-semibold text-sm">En esta página</p>
          <ul className="space-y-2.5 text-sm">
            {headings.map((heading) => (
              <li
                key={heading.id}
                style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
              >
                <a
                  href={`#${heading.id}`}
                  className={`inline-block transition-colors hover:text-foreground ${
                    activeId === heading.id
                      ? "text-accent font-medium"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
