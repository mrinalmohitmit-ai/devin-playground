import Link from 'next/link';
import { notFound } from 'next/navigation';
import { lora } from '@/app/fonts';
import { formatDate, getAllPostSlugs, getPostBySlug } from '@/lib/posts';

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition hover:-translate-x-0.5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
          <span aria-hidden="true">←</span> Back to posts
        </Link>
      </div>

      <div className="rounded-[2rem] border border-border bg-card p-6 shadow-soft sm:p-10 lg:p-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">{post.tags.join(' · ')}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-card-foreground sm:text-5xl">{post.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span>By {post.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>
        </div>

        <div className={`${lora.className} prose prose-slate mt-10 max-w-none dark:prose-invert prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:leading-8 prose-li:my-1 prose-blockquote:not-italic prose-blockquote:font-medium prose-pre:rounded-2xl prose-pre:p-0 prose-pre:shadow-none`}>
          <div dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
        </div>
      </div>
    </article>
  );
}
