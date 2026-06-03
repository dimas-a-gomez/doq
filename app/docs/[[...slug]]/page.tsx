import { getDocContent } from "@/lib/docs";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { SidebarRight } from "@/components/SidebarRight";
import { components } from "@/components/MDXComponents";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

export default async function DocPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params;
  const doc = await getDocContent(resolvedParams.slug || []);

  if (!doc) {
    notFound();
  }

  return (
    <div className="lg:grid lg:grid-cols-[1fr_200px] xl:grid-cols-[1fr_250px] lg:gap-8 h-full overflow-hidden">
      <div className="h-full overflow-y-auto custom-scrollbar px-2 pb-16 pt-6 lg:pt-8 w-full">
        <div className="mx-auto w-full min-w-0 bg-[#F0F0F0] dark:bg-[#262626] rounded-2xl p-6 md:p-10 text-foreground dark:text-white">
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
        </div>
      </div>
      <SidebarRight />
    </div>
  );
}
