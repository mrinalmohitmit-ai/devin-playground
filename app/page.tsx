import Link from 'next/link';
import { PostCard } from '@/components/post-card';
import { getAllPosts } from '@/lib/posts';

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <section className="relative overflow-hidden rounded-[2rem] border border-border bg-card px-6 py-14 shadow-soft sm:px-10 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.14),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.10),transparent_28%)]" />
        <div className="relative max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">Editorial blog</p>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-card-foreground sm:text-5xl lg:text-6xl">
            Notes on product thinking, writing, and the craft of building.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            A minimal, beautiful blog for long-form posts, hands-on experiments, and the kind of writing that deserves a calm
            reading experience.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#posts" className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              Browse posts
            </Link>
            <Link href="/about" className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              About this site
            </Link>
          </div>
        </div>
      </section>

      <section id="posts" className="pt-14 sm:pt-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">Latest posts</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Fresh writing, newest first</h2>
          </div>
          <p className="hidden max-w-sm text-right text-sm leading-6 text-muted-foreground sm:block">
            Each article is rendered from markdown and styled for a comfortable editorial reading rhythm.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
