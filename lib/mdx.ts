import fs from "fs";
import path from "path";
import matter from "gray-matter";

const docsDirectory = path.join(process.cwd(), "docs");

export interface DocMeta {
  title: string;
  description?: string;
  date?: string;
  slug: string;
  order?: number;
}

export function getDocSlugs() {
  if (!fs.existsSync(docsDirectory)) return [];
  return fs
    .readdirSync(docsDirectory)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
}

export function getDocBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx?$/, "");
  const fullPathMd = path.join(docsDirectory, `${realSlug}.md`);
  const fullPathMdx = path.join(docsDirectory, `${realSlug}.mdx`);

  let fullPath = fullPathMd;
  if (fs.existsSync(fullPathMdx)) {
    fullPath = fullPathMdx;
  } else if (!fs.existsSync(fullPathMd)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: {
      ...data,
      slug: realSlug,
    } as DocMeta,
    content,
  };
}

export function getAllDocs() {
  const slugs = getDocSlugs();
  const docs = slugs
    .map((slug) => getDocBySlug(slug))
    .filter((doc) => doc !== null)
    .sort((a, b) => {
      const orderA = a?.meta.order ?? 999;
      const orderB = b?.meta.order ?? 999;
      return orderA - orderB;
    });
  return docs;
}
