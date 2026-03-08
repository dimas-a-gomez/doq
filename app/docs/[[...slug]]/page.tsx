import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getDocBySlug, getAllDocs } from "@/lib/mdx";
import { components } from "@/components/MDXComponents";
import { SidebarRight } from "@/components/SidebarRight";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import GithubSlugger from "github-slugger";

export async function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((doc) => ({
    slug: [doc.slug],
  }));
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.join("/") || "index";
  const doc = getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  // Extract headings for TOC
  const slugger = new GithubSlugger();
  const headings = Array.from(doc.content.matchAll(/^(#{2,3})\s+(.+)$/gm)).map(
    (match) => {
      const level = match[1].length;
      const text = match[2];
      const id = slugger.slug(text);
      return { id, text, level };
    },
  );

  return (
    <div className="xl:grid xl:grid-cols-[1fr_250px] xl:gap-10">
      <div className="mx-auto w-full min-w-0">
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white mb-2">
            {doc.meta.title}
          </h1>
          {doc.meta.description && (
            <p className="text-xl text-gray-400">{doc.meta.description}</p>
          )}
        </div>
        <div className="prose prose-invert max-w-none">
          <MDXRemote
            source={doc.content}
            components={components}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  rehypeSlug,
                  [
                    rehypePrettyCode,
                    {
                      theme: "github-dark",
                      keepBackground: false,
                    },
                  ],
                ],
              },
            }}
          />
        </div>
      </div>
      <SidebarRight headings={headings} />
    </div>
  );
}
