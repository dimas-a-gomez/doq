"use client";
import { useEffect, useState } from "react";

export function SidebarRight() {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("main h2, main h3"))
      .map((element) => {
        let text = element.textContent || "";
        if (element.tagName === "H3") {
          text = text.replace(/^#\s*/, "");
        }
        return {
          id: element.id,
          text: text,
          level: Number(element.tagName.replace("H", ""))
        };
      })
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
    <div className="hidden lg:block w-[200px] xl:w-[250px] shrink-0 font-mono h-full">
      <aside className="h-full overflow-y-auto py-6 px-6 lg:py-8 custom-scrollbar">
        <div className="space-y-4">
          <p className="font-semibold text-sm">En esta página</p>
          <div className="flex flex-col text-sm">
            {headings.map((heading) => {
              const isH3 = heading.level === 3;
              const isActive = activeId === heading.id;

              return (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={`block transition-colors font-bold ${
                    isH3 
                      ? `pl-4 py-1.5 ml-2 border-l-2 ${
                          isActive 
                            ? '!border-foreground text-foreground' 
                            : '!border-black/10 dark:!border-white/10 text-foreground/60 hover:text-foreground hover:!border-black/20 dark:hover:!border-white/20'
                        }`
                      : `pb-2 pt-4 ${
                          isActive
                            ? "text-foreground"
                            : "text-foreground/60 hover:text-foreground"
                        }`
                  }`}
                >
                  {heading.text}
                </a>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}
