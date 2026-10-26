import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

export interface PostSummary {
  slug: string;
  title: string;
  description?: string | null;
  date?: string | null;
  tags?: ReadonlyArray<string | null> | null;
  timeToRead?: number | null;
  image?: IGatsbyImageData;
}

interface Props {
  post: PostSummary;
  headingLevel?: 'h2' | 'h3';
}

const PostCard: React.FC<Props> = ({ post, headingLevel: Heading = 'h3' }) => (
  <article className="card group relative flex flex-col overflow-hidden hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-900/5 dark:hover:border-zinc-700">
    {post.image && (
      <GatsbyImage
        image={post.image}
        alt=""
        className="aspect-video border-b border-zinc-200 dark:border-zinc-800"
        imgClassName="transition duration-500 group-hover:scale-105"
      />
    )}
    <div className="flex flex-1 flex-col p-6">
      <p className="font-mono text-xs text-zinc-500">
        {post.date}
        {post.timeToRead ? ` · ${post.timeToRead} min read` : ''}
      </p>
      <Heading className="mt-3 text-xl font-semibold tracking-tight">
        <Link to={post.slug} className="after:absolute after:inset-0 group-hover:text-accent-700 dark:group-hover:text-accent-400">
          {post.title}
        </Link>
      </Heading>
      {post.description && <p className="mt-2 flex-1 text-zinc-600 dark:text-zinc-400">{post.description}</p>}
      {post.tags && post.tags.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => tag && <li key={tag} className="chip">{tag}</li>)}
        </ul>
      )}
    </div>
  </article>
);

export default PostCard;
