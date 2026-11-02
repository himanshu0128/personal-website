import React from 'react';
import { graphql, HeadProps, Link, PageProps } from 'gatsby';
import { GatsbyImage, StaticImage, getImage } from 'gatsby-plugin-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Layout from 'components/Layout';
import Seo from 'components/Seo';

interface Neighbour {
  fields: { slug: string };
  frontmatter: { title: string };
}

interface PageContext {
  slug: string;
  previous: Neighbour | null;
  next: Neighbour | null;
}

const BlogPost: React.FC<PageProps<Queries.BlogPostBySlugQuery, PageContext>> = ({ data, pageContext }) => {
  const post = data.markdownRemark!;
  const { title, description, tags, cover } = post.frontmatter!;
  const image = getImage(cover?.childImageSharp?.gatsbyImageData ?? null);
  const { previous, next } = pageContext;

  return (
    <Layout>
      <article className="pt-10 sm:pt-16">
        <header className="mx-auto max-w-3xl px-5 sm:px-8">
          <Link
            to="/blog/"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-900 dark:hover:text-white"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-3 w-3" /> All posts
          </Link>
          <div className="mt-8 flex flex-wrap gap-2">
            {tags?.map((tag) => tag && <span key={tag} className="chip">{tag}</span>)}
          </div>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          {description && <p className="mt-4 text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>}
          <div className="mt-8 flex items-center gap-3 border-b border-zinc-200 pb-8 dark:border-zinc-800">
            <StaticImage
              src="../assets/images/profile.jpg"
              alt=""
              width={40}
              height={40}
              className="rounded-full"
              imgClassName="rounded-full"
            />
            <div className="text-sm">
              <p className="font-medium text-zinc-900 dark:text-white">Himanshu Gupta</p>
              <p className="font-mono text-xs text-zinc-500">
                {post.timeToRead} min read
              </p>
            </div>
          </div>
        </header>

        {image && (
          <div className="mx-auto mt-10 max-w-4xl px-5 sm:px-8">
            <GatsbyImage
              image={image}
              alt={title || ''}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800"
              imgClassName="rounded-2xl"
            />
          </div>
        )}

        <div
          className="prose prose-lg prose-zinc mx-auto mt-12 max-w-3xl px-5 dark:prose-invert prose-headings:tracking-tight prose-a:text-accent-700 prose-a:underline-offset-4 dark:prose-a:text-accent-400 sm:px-8"
          dangerouslySetInnerHTML={{ __html: post.html || '' }}
        />
      </article>

      {(previous || next) && (
        <nav aria-label="More posts" className="mx-auto mt-16 grid max-w-3xl gap-4 px-5 sm:grid-cols-2 sm:px-8">
          {previous ? (
            <Link to={previous.fields.slug} rel="prev" className="card group p-5 hover:border-zinc-300 dark:hover:border-zinc-700">
              <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">← Previous</span>
              <span className="mt-2 block font-semibold text-zinc-900 group-hover:text-accent-700 dark:text-white dark:group-hover:text-accent-400">
                {previous.frontmatter.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              to={next.fields.slug}
              rel="next"
              className="card group p-5 text-right hover:border-zinc-300 dark:hover:border-zinc-700"
            >
              <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">Next →</span>
              <span className="mt-2 block font-semibold text-zinc-900 group-hover:text-accent-700 dark:text-white dark:group-hover:text-accent-400">
                {next.frontmatter.title}
              </span>
            </Link>
          )}
        </nav>
      )}
    </Layout>
  );
};

export default BlogPost;

export const Head = ({ data }: HeadProps<Queries.BlogPostBySlugQuery>) => {
  const frontmatter = data.markdownRemark?.frontmatter;
  return (
    <Seo title={frontmatter?.title || 'Blog'} description={frontmatter?.description || undefined}>
      <meta property="og:type" content="article" />
    </Seo>
  );
};

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      frontmatter {
        title
        description
        tags
        date(formatString: "MMMM D, YYYY")
        isoDate: date
        cover {
          childImageSharp {
            gatsbyImageData(
              width: 960
              aspectRatio: 1.7778
              placeholder: BLURRED
              transformOptions: { cropFocus: ATTENTION }
            )
          }
        }
      }
    }
  }
`;
