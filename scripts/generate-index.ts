import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

// Interfaz para el elemento de búsqueda
interface SearchIndexItem {
  id: string;
  title: string;
  path: string;
  keywords: string[];
  content_summary: string;
}

// Configuración básica
const DOCS_DIR = path.join(process.cwd(), 'docs');
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const BASE_URL = 'https://doqmen.vercel.app';

/**
 * Función para leer recursivamente todos los archivos de un directorio.
 */
async function getFiles(dir: string): Promise<string[]> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return Array.prototype.concat(...files);
}

/**
 * Función para generar un slug legible a partir de un texto (para anclas).
 */
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       // Reemplaza espacios con -
    .replace(/[^\w-]+/g, '')    // Elimina caracteres no alfanuméricos
    .replace(/--+/g, '-');      // Reemplaza múltiples - con uno solo
}

/**
 * Extrae encabezados H2 y H3 de un contenido Markdown.
 */
function extractHeadings(content: string): { level: number; text: string; slug: string }[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      level: match[1].length,
      text: match[2].trim(),
      slug: slugify(match[2].trim())
    });
  }

  return headings;
}

/**
 * Elimina marcadores markdown básicos para un resumen limpio.
 */
function stripMarkdown(content: string): string {
  return content
    .replace(/#+\s/g, '')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Enlaces
    .replace(/[_*~`]/g, '')
    .replace(/\n+/g, ' ')
    .trim();
}

/**
 * Crea el contenido del archivo sitemap.xml
 */
function generateSitemap(urls: { path: string; lastmod: string }[]): string {
  const xmlUrls = urls.map(url => `
  <url>
    <loc>${BASE_URL}${url.path}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <priority>${url.path === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${xmlUrls}
</urlset>`;
}

async function main() {
  console.log('Iniciando generación de Sitemap e Índice de Búsqueda...');

  try {
    // Asegurarse de que el directorio public exista
    await fs.mkdir(PUBLIC_DIR, { recursive: true });

    const allFiles = await getFiles(DOCS_DIR);
    const mdxFiles = allFiles.filter(file => file.endsWith('.md') || file.endsWith('.mdx'));

    const searchIndex: SearchIndexItem[] = [];
    const sitemapUrls: { path: string; lastmod: string }[] = [];

    // Incluir la ruta base para el sitemap
    sitemapUrls.push({
      path: '/',
      lastmod: new Date().toISOString().split('T')[0]
    });

    for (const file of mdxFiles) {
      const fileContent = await fs.readFile(file, 'utf-8');
      const { data: frontmatter, content } = matter(fileContent);

      // Calcular la ruta (URL) del archivo a partir de DOCS_DIR
      const relativePath = path.relative(DOCS_DIR, file);
      const isIndex = relativePath.endsWith('index.mdx') || relativePath.endsWith('index.md');
      
      let urlPath = `/docs/${relativePath.replace(/\.mdx?$/, '')}`;
      if (isIndex) {
        urlPath = urlPath.replace(/\/index$/, '');
        if (urlPath === '/docs/index') urlPath = '/docs'; // Fallback por si acaso
      }

      // 1. Agregar URL al Sitemap
      sitemapUrls.push({
        path: urlPath,
        lastmod: new Date().toISOString().split('T')[0] // Ideal usar mtime o la fecha del frontmatter
      });

      // Extraer título principal (si no hay frontmatter, tomar H1 o URL)
      const pageTitle = frontmatter.title || urlPath.split('/').pop() || 'Página sin título';
      const pageKeywords = frontmatter.tags || [];

      // Resumen del contenido (primeros 250 caracteres aprox)
      const contentSummary = stripMarkdown(content).substring(0, 250) + '...';

      // 2. Agregar ítem de la página principal al índice de búsqueda
      searchIndex.push({
        id: urlPath,
        title: pageTitle,
        path: urlPath,
        keywords: pageKeywords,
        content_summary: frontmatter.description || contentSummary
      });

      // 3. Extraer H2/H3 y crear entradas con anclas (#)
      const headings = extractHeadings(content);
      for (const heading of headings) {
        searchIndex.push({
          id: `${urlPath}#${heading.slug}`,
          title: `${heading.text} - ${pageTitle}`,
          path: `${urlPath}#${heading.slug}`,
          keywords: [...pageKeywords, heading.text.toLowerCase()],
          content_summary: `Sección sobre ${heading.text} en ${pageTitle}.`
        });
      }
    }

    // Guardar archivos
    const sitemapContent = generateSitemap(sitemapUrls);
    await fs.writeFile(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapContent, 'utf-8');
    console.log('✅ sitemap.xml generado con éxito.');

    await fs.writeFile(path.join(PUBLIC_DIR, 'search-index.json'), JSON.stringify(searchIndex, null, 2), 'utf-8');
    console.log('✅ search-index.json generado con éxito.');

  } catch (error) {
    console.error('❌ Error generando el índice:', error);
    process.exit(1);
  }
}

main();
