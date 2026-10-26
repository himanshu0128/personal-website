import React from 'react';
import { graphql, HeadProps, Link, PageProps } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import Layout from 'components/Layout';
import Seo from 'components/Seo';

interface Sibling {
  fields: { slug: string };
  frontmatter: { title: string };
}

interface PageContext {
  slug: string;
  previous: Sibling | null;
  next: Sibling | null;
}

const BlogPostTemplate: React.FC<PageProps<Queries.BlogPostQuery, PageContext>> = ({ data, pageContext }) => {
  const post = data.markdownRemark!;
  const frontmatter = post.frontmatter!;
  const cover = getImage(frontmatter.cover?.childImageSharp?.gatsbyImageData ?? null);
  const { previous, next } = pageContext;

  return (
    <Layout>
      <article className="container-page max-w-3xl pt-12 sm:pt-20">
        <Link to="/blog/" className="link inline-flex items-center gap-2 text-sm">
          <FontAwesomeIcon icon={faArrowLeft} className="h-3 w-3" /> All posts
        </Link>

        <header className="mt-8">
          <p className="font-mono text-sm text-zinc-500">
            {frontmatter.date}
            {post.timeToRead ? ` · ${post.timeToRead} min read` : ''}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{frontmatter.title}</h1>
          {frontmatter.description && (
            <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-400">{frontmatter.description}</p>
          )}
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {frontmatter.tags.map((tag) => tag && <li key={tag} className="chip">{tag}</li>)}
            </ul>
          )}
        </header>

        {cover && (
          <GatsbyImage
            image={cover}
            alt=""
            className="mt-10 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800"
          />
        )}

        <div
          className="prose prose-lg prose-zinc mt-10 max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-accent-700 dark:prose-a:text-accent-400"
          dangerouslySetInnerHTML={{ __html: post.html || '' }}
        />

        {(previous || next) && (
          <nav aria-label="More posts" className="mt-16 grid gap-4 border-t border-zinc-200 pt-8 sm:grid-cols-2 dark:border-zinc-800">
            {previous ? (
              <Link to={previous.fields.slug} rel="prev" className="card p-5 hover:border-zinc-300 dark:hover:border-zinc-700">
                <span className="flex items-center gap-2 text-sm text-zinc-500">
                  <FontAwesomeIcon icon={faArrowLeft} className="h-3 w-3" /> Previous
                </span>
                <span className="mt-1 block font-semibold text-zinc-900 dark:text-white">{previous.frontmatter.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                to={next.fields.slug}
                rel="next"
                className="card p-5 text-right hover:border-zinc-300 dark:hover:border-zinc-700"
              >
                <span className="flex items-center justify-end gap-2 text-sm text-zinc-500">
                  Next <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                </span>
                <span className="mt-1 block font-semibold text-zinc-900 dark:text-white">{next.frontmatter.title}</span>
              </Link>
            )}
          </nav>
        )}
      </article>
    </Layout>
  );
};

export default BlogPostTemplate;

export const Head = ({ data }: HeadProps<Queries.BlogPostQuery>) => (
  <Seo
    title={data.markdownRemark?.frontmatter?.title || undefined}
    description={data.markdownRemark?.frontmatter?.description || undefined}
    type="article"
  />
);

export const query = graphql`
  query BlogPost($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      frontmatter {
        title
        description
        date(formatString: "MMMM D, YYYY")
        tags
        cover {
          childImageSharp {
            gatsbyImageData(width: 1280, aspectRatio: 1.7778, placeholder: BLURRED)
          }
        }
      }
    }
  }
`;
