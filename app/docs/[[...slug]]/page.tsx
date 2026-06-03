import { getDocContent } from "@/lib/docs";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { SidebarRight } from "@/components/SidebarRight";
import { components } from "@/components/MDXComponents";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { DocsFooter } from "@/components/DocsFooter";
import { getDocsConfig } from "@/config/docs";

export default async function DocPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params;
  const doc = await getDocContent(resolvedParams.slug || []);

  if (!doc) {
    notFound();
  }

  const docsConfig = getDocsConfig();
  const allLinks = docsConfig.flatMap((group) => group.items);
  const currentPath = resolvedParams.slug && resolvedParams.slug.length > 0 
    ? `/docs/${resolvedParams.slug.join('/')}` 
    : '/docs';

  const currentIndex = allLinks.findIndex((link) => link.href === currentPath);
  const previous = currentIndex > 0 ? allLinks[currentIndex - 1] : null;
  const next = currentIndex !== -1 && currentIndex < allLinks.length - 1 ? allLinks[currentIndex + 1] : null;

  return (
    <div className="lg:grid lg:grid-cols-[1fr_200px] xl:grid-cols-[1fr_250px] lg:gap-8 h-full overflow-hidden">
      <div className="h-full overflow-y-auto custom-scrollbar px-2 lg:px-8 pb-16 pt-6 lg:pt-8 w-full">
        <div className="mx-auto w-full min-w-0 text-foreground dark:text-white">
          <div className="prose dark:prose-invert max-w-none font-sans">
            <MDXRemote 
              source={doc.content} 
              components={components as any}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypePrettyCode as any, { 
                      theme: { light: "github-light", dark: "github-dark" },
                      keepBackground: false 
                    }]
                  ]
                }
              }}
            />
          </div>
          <DocsFooter 
            previous={previous} 
            next={next} 
            frontmatter={doc.frontmatter || {}} 
          />
        </div>
      </div>
      <SidebarRight />
    </div>
  );
}
