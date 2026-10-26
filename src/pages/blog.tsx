import React from 'react';
import { graphql, HeadFC, PageProps } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';

import Layout from 'components/Layout';
import Seo from 'components/Seo';
import SectionHeading from 'components/SectionHeading';
import PostCard from 'components/PostCard';

const BlogPage: React.FC<PageProps<Queries.BlogPageQuery>> = ({ data }) => {
  const section = data.section?.frontmatter;
  const posts = data.posts.nodes;

  return (
    <Layout>
      <div className="container-page pt-12 sm:pt-20">
        <SectionHeading
          as="h1"
          eyebrow={section?.title || 'Blog'}
          title="Notes on code, tools & productivity"
          description="Things I've learned building software, written down so they stick."
        />

        {posts.length > 0 ? (
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                headingLevel="h2"
                post={{
                  slug: post.fields!.slug!,
                  title: post.frontmatter!.title!,
                  description: post.frontmatter!.description,
                  date: post.frontmatter!.date,
                  tags: post.frontmatter!.tags,
                  timeToRead: post.timeToRead,
                  image: getImage(post.frontmatter!.cover?.childImageSharp?.gatsbyImageData ?? null)
                }}
              />
            ))}
          </div>
        ) : (
          <p className="mt-14 text-zinc-500">No posts yet — check back soon.</p>
        )}
      </div>
    </Layout>
  );
};

export default BlogPage;

export const Head: HeadFC = () => <Seo title="Blog" description="Articles by Himanshu Gupta on software development." />;

export const query = graphql`
  query BlogPage {
    section: markdownRemark(frontmatter: { category: { eq: "blog section" } }) {
      frontmatter {
        title
        subtitle
      }
    }
    posts: allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "blog" }, published: { eq: true } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        timeToRead
        fields {
          slug
        }
        frontmatter {
          title
          description
          date(formatString: "MMM D, YYYY")
          tags
          cover {
            childImageSharp {
              gatsbyImageData(width: 720, aspectRatio: 1.7778, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`;
