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

const customTheme = {
  name: "DigitalPro Slate",
  type: "dark",
  colors: {
    "editor.background": "#0D0D0D",
    "editor.foreground": "#A8A8A8",
  },
  tokenColors: [
    {
      scope: ["comment", "punctuation.definition.comment", "string.comment"],
      settings: {
        foreground: "#4A4A4A",
      },
    },
    {
      scope: [
        "keyword",
        "storage.type",
        "storage.modifier",
        "variable.language",
        "support.type.primitive",
        "entity.name.tag",
      ],
      settings: {
        foreground: "#FFFFFF",
      },
    },
    {
      scope: ["entity.name.function", "support.function", "meta.function-call"],
      settings: {
        foreground: "#70B1FF",
      },
    },
    {
      scope: [
        "variable",
        "entity.name.variable",
        "variable.other",
        "variable.parameter",
        "support.variable",
        "entity.name.type",
        "entity.other.inherited-class",
      ],
      settings: {
        foreground: "#A8A8A8",
      },
    },
    {
      scope: ["string", "punctuation.definition.string", "string.quoted"],
      settings: {
        foreground: "#52FFAD",
      },
    },
    {
      scope: ["keyword.operator"],
      settings: {
        foreground: "#FF7A5C",
      },
    },
    {
      scope: ["constant.numeric", "constant.language", "constant.character"],
      settings: {
        foreground: "#52FFAD",
      },
    },
    {
      scope: ["punctuation", "meta.brace"],
      settings: {
        foreground: "#A8A8A8",
      },
    },
  ],
};

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
    <div className="lg:grid lg:grid-cols-[1fr_200px] xl:grid-cols-[1fr_250px] lg:gap-8 items-start">
      <div className="mx-auto w-full min-w-0">
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-black dark:text-white mb-2 break-words">
            {doc.meta.title}
          </h1>
          {doc.meta.description && (
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
              {doc.meta.description}
            </p>
          )}
        </div>
        <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none w-full break-words">
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
                      theme: customTheme,
                      keepBackground: true,
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
