import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export type PostFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  coverImage?: string;
};

export type Post = PostFrontmatter & {
  slug: string;
  content: string;
  htmlContent: string;
  readingTime: string;
};

function readingTimeFromContent(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

async function markdownToHtml(markdown: string) {
  const file = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);

  return file.toString();
}

export async function getAllPosts(): Promise<Post[]> {
  const fileNames = await fs.readdir(postsDirectory);
  const posts = await Promise.all(
    fileNames
      .filter((fileName) => /\.(md|mdx)$/.test(fileName))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.(md|mdx)$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = await fs.readFile(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const htmlContent = await markdownToHtml(content);

        return {
          slug,
          title: data.title,
          date: data.date,
          excerpt: data.excerpt,
          author: data.author,
          tags: data.tags ?? [],
          coverImage: data.coverImage,
          content,
          htmlContent,
          readingTime: readingTimeFromContent(content),
        } satisfies Post;
      }),
  );

  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const possibleFileNames = [`${slug}.md`, `${slug}.mdx`];
  for (const fileName of possibleFileNames) {
    try {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = await fs.readFile(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const htmlContent = await markdownToHtml(content);

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        author: data.author,
        tags: data.tags ?? [],
        coverImage: data.coverImage,
        content,
        htmlContent,
        readingTime: readingTimeFromContent(content),
      } satisfies Post;
    } catch {
      // Keep searching other supported extensions.
    }
  }

  return null;
}

export async function getAllPostSlugs() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export function formatDate(dateString: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString));
}
