import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

export interface PostSummary {
  slug: string;
  title: string;
  description?: string | null;
  date?: string | null;
  tags?: readonly (string | null)[] | null;
  timeToRead?: number | null;
  image?: IGatsbyImageData | null;
}

interface Props {
  post: PostSummary;
  headingLevel?: 'h2' | 'h3';
}

const PostCard: React.FC<Props> = ({ post, headingLevel: Heading = 'h3' }) => (
  <article className="card group relative flex h-full flex-col overflow-hidden hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:border-zinc-700 dark:hover:shadow-black/30">
    {post.image && (
      <div className="overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        <GatsbyImage
          image={post.image}
          alt=""
          className="aspect-[16/9] transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
    )}
    <div className="flex flex-1 flex-col p-6">
      <p className="font-mono text-xs text-zinc-500">
        {post.timeToRead ? <span>{post.timeToRead} min read</span> : null}
      </p>
      <Heading className="mt-3 text-xl font-semibold tracking-tight">
        {/* stretched link makes the whole card clickable while keeping one accessible link */}
        <Link to={post.slug} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </Heading>
      {post.description && <p className="mt-2 leading-relaxed text-zinc-600 dark:text-zinc-400">{post.description}</p>}
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
        {post.tags?.map((tag) => tag && <span key={tag} className="chip">{tag}</span>)}
        <span className="ml-auto text-sm font-medium text-accent-700 transition group-hover:translate-x-1 dark:text-accent-400" aria-hidden>
          Read →
        </span>
      </div>
    </div>
  </article>
);

export default PostCard;
