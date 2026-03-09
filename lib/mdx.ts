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

export interface NavItem {
  title: string;
  slug: string;
  icon?: string;
  children?: NavItem[];
}

export function getDocSlugs(dir = docsDirectory, prefix = ""): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let slugs: string[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith("_")) continue; // Skip _meta.json etc.

    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(prefix, entry.name);

    if (entry.isDirectory()) {
      slugs = slugs.concat(getDocSlugs(fullPath, relativePath));
    } else if (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) {
      slugs.push(relativePath.replace(/\.mdx?$/, ""));
    }
  }
  return slugs;
}

export function getDocBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx?$/, "");
  const fullPathMd = path.join(docsDirectory, `${realSlug}.md`);
  const fullPathMdx = path.join(docsDirectory, `${realSlug}.mdx`);
  // Also check if it's a directory with an index file
  const fullPathDirIndexMd = path.join(docsDirectory, realSlug, "index.md");
  const fullPathDirIndexMdx = path.join(docsDirectory, realSlug, "index.mdx");

  let fullPath = fullPathMd;
  if (fs.existsSync(fullPathMdx)) {
    fullPath = fullPathMdx;
  } else if (fs.existsSync(fullPathDirIndexMdx)) {
    fullPath = fullPathDirIndexMdx;
  } else if (fs.existsSync(fullPathDirIndexMd)) {
    fullPath = fullPathDirIndexMd;
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
    .filter((doc) => doc !== null);
  return docs;
}

// Parse _meta.json for navigation structure
export function getNavStructure(dir = docsDirectory, prefix = ""): NavItem[] {
  if (!fs.existsSync(dir)) return [];
  
  const metaPath = path.join(dir, "_meta.json");
  let meta: Record<string, any> = {};
  
  if (fs.existsSync(metaPath)) {
    meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const items: NavItem[] = [];

  // Add items based on _meta.json order if available
  const orderedKeys = Object.keys(meta);
  
  // First process items defined in _meta.json
  for (const key of orderedKeys) {
    const metaItem = meta[key];
    const isDir = entries.find(e => e.name === key && e.isDirectory());
    const isFile = entries.find(e => e.name === `${key}.md` || e.name === `${key}.mdx`);
    
    if (isDir) {
      const fullPath = path.join(dir, key);
      const relativePath = path.join(prefix, key).replace(/\\/g, '/');
      items.push({
        title: metaItem.title || key,
        slug: relativePath,
        icon: metaItem.icon,
        children: getNavStructure(fullPath, relativePath),
      });
    } else if (isFile || key === "index") {
      const relativePath = key === "index" ? prefix : path.join(prefix, key).replace(/\\/g, '/');
      items.push({
        title: metaItem.title || key,
        slug: relativePath,
        icon: metaItem.icon,
      });
    }
  }

  // Add remaining items not in _meta.json
  for (const entry of entries) {
    if (entry.name.startsWith("_")) continue;
    
    const nameWithoutExt = entry.name.replace(/\.mdx?$/, "");
    if (orderedKeys.includes(nameWithoutExt) || (nameWithoutExt === "index" && orderedKeys.includes("index"))) {
      continue;
    }

    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(prefix, nameWithoutExt).replace(/\\/g, '/');
    const title = nameWithoutExt.charAt(0).toUpperCase() + nameWithoutExt.slice(1);

    if (entry.isDirectory()) {
      items.push({
        title,
        slug: relativePath,
        children: getNavStructure(fullPath, relativePath),
      });
    } else if (nameWithoutExt !== "index") {
      items.push({
        title,
        slug: relativePath,
      });
    }
  }

  return items;
}
