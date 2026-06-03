import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getDocContent(slugArray: string[] = []) {
  const docsDir = path.join(process.cwd(), 'docs');
  let slugPath = slugArray.join('/');
  if (slugPath === '') slugPath = 'index';
  
  let filePath = path.join(docsDir, `${slugPath}.mdx`);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(docsDir, slugPath, 'index.mdx');
  }

  if (fs.existsSync(filePath)) {
    const rawContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(rawContent);
    return { content, frontmatter };
  }
  
  return null;
}
