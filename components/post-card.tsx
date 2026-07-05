import Link from 'next/link';
import { formatDate, type Post } from '@/lib/posts';

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group h-full rounded-3xl border border-border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-foreground/15 hover:shadow-soft">
      <div className="mb-5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime}</span>
      </div>
      <h2 className="text-2xl font-semibold tracking-tight text-card-foreground transition group-hover:text-primary">
        <Link href={`/blog/${post.slug}`} className="focus-visible:outline-none">
          {post.title}
        </Link>
      </h2>
      <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">{post.excerpt}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between text-sm">
        <p className="font-medium text-card-foreground">By {post.author}</p>
        <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 font-medium text-primary transition hover:gap-3">
          Read post <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
