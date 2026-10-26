import React from 'react';
import { graphql, HeadFC, Link, PageProps } from 'gatsby';
import { StaticImage, getImage } from 'gatsby-plugin-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCode, faDatabase, faMobileScreen } from '@fortawesome/free-solid-svg-icons';

import Layout from 'components/Layout';
import Seo from 'components/Seo';
import SectionHeading from 'components/SectionHeading';
import SocialLinks from 'components/SocialLinks';
import PostCard from 'components/PostCard';
import { byMostRecent, isCurrent } from 'utils/dates';

const services = [
  {
    icon: faCode,
    title: 'Web applications',
    text: 'Fast, accessible websites and web apps with React, TypeScript and Gatsby.'
  },
  {
    icon: faMobileScreen,
    title: 'Native mobile apps',
    text: 'Cross-platform iOS and Android apps with React Native that feel at home on both.'
  },
  {
    icon: faDatabase,
    title: 'APIs & databases',
    text: 'Reliable back ends and integrations with Elixir and Node.js, on PostgreSQL and MySQL.'
  }
];

const IndexPage: React.FC<PageProps<Queries.HomePageQuery>> = ({ data }) => {
  const hero = data.hero?.frontmatter;
  const experiences = data.experiences.nodes
    .map((node) => ({ id: node.id, ...node.frontmatter! }))
    .sort(byMostRecent);
  const current = experiences.filter((item) => isCurrent(item.endDate));
  // the longest-running ongoing role is treated as the primary job for the hero badge
  const primaryRole = current[current.length - 1];
  const posts = data.posts.nodes;

  return (
    <Layout>
      {/* ---------- Hero ---------- */}
      <section className="container-page grid items-center gap-12 pb-20 pt-12 sm:pt-20 lg:grid-cols-[1fr_auto] lg:gap-16 lg:pb-28">
        <div className="animate-rise">
          <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-sm font-medium text-zinc-700 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
            </span>
            {hero?.title}
          </p>
          <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Hi, I&rsquo;m{' '}
            <span className="bg-gradient-to-r from-accent-600 to-sky-600 bg-clip-text text-transparent dark:from-accent-300 dark:to-sky-400">
              Himanshu.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">{hero?.content}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to={hero?.linkTo || '/resume/'} className="btn-primary">
              {hero?.linkText || 'View my resume'}
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            </Link>
            <Link to="/contact/" className="btn-secondary">
              Get in touch
            </Link>
          </div>
          <SocialLinks className="mt-10" />
        </div>

        <div className="relative mx-auto w-64 animate-rise [animation-delay:150ms] sm:w-72 lg:w-80">
          <div
            aria-hidden
            className="absolute -inset-3 rotate-6 rounded-[2.5rem] bg-gradient-to-br from-accent-400 to-sky-500 opacity-20 dark:opacity-30"
          />
          <StaticImage
            src="../assets/images/profile.jpg"
            alt="Portrait of Himanshu Gupta"
            width={320}
            height={320}
            placeholder="blurred"
            loading="eager"
            className="relative rounded-[2rem] shadow-2xl shadow-zinc-900/10 ring-1 ring-zinc-900/5"
            imgClassName="rounded-[2rem]"
          />
          {primaryRole && (
            <div className="card absolute -bottom-5 -left-6 flex items-center gap-3 px-4 py-3 shadow-lg sm:-left-10">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-50 text-accent-700 dark:bg-accent-500/10 dark:text-accent-300">
                <FontAwesomeIcon icon={faCode} className="h-4 w-4" />
              </span>
              <div className="text-sm leading-tight">
                <p className="text-zinc-500">Currently</p>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  {primaryRole.position} @ {primaryRole.company}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ---------- What I do ---------- */}
      <section className="container-page py-16">
        <SectionHeading eyebrow="What I do" title="End-to-end product development" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="card p-6 hover:border-zinc-300 dark:hover:border-zinc-700">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-700 ring-1 ring-inset ring-accent-600/10 dark:bg-accent-500/10 dark:text-accent-300">
                <FontAwesomeIcon icon={service.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{service.title}</h3>
              <p className="mt-2 leading-relaxed text-zinc-600 dark:text-zinc-400">{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Experience snapshot ---------- */}
      <section className="container-page py-16">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          action={
            <Link to="/resume/" className="link inline-flex items-center gap-2">
              Full resume <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
            </Link>
          }
        />
        <ul className="mt-10 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          {experiences.slice(0, 4).map((item) => (
            <li key={item.id} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex-1">
                <p className="font-semibold text-zinc-900 dark:text-white">{item.company}</p>
                <p className="text-sm text-zinc-500">{item.position}</p>
              </div>
              <p className="font-mono text-xs text-zinc-500">
                {item.startDate} — {item.endDate}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Latest writing ---------- */}
      {posts.length > 0 && (
        <section className="container-page py-16">
          <SectionHeading
            eyebrow="Writing"
            title="Latest from the blog"
            action={
              <Link to="/blog/" className="link inline-flex items-center gap-2">
                All posts <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
              </Link>
            }
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard
                key={post.id}
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
        </section>
      )}

      {/* ---------- CTA ---------- */}
      <section className="container-page py-16">
        <div className="relative overflow-hidden rounded-3xl bg-zinc-900 px-6 py-14 text-center sm:px-16 dark:bg-zinc-900 dark:ring-1 dark:ring-zinc-800">
          <div
            aria-hidden
            className="absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-accent-500/30 blur-3xl"
          />
          <h2 className="relative text-3xl font-bold tracking-tight !text-white sm:text-4xl">
            Have a project in mind?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-zinc-300">
            I&rsquo;m always happy to talk about new ideas, freelance work or mentoring.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact/" className="btn bg-white text-zinc-900 hover:bg-zinc-200">
              Say hello <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <Seo />;

export const query = graphql`
  query HomePage {
    hero: markdownRemark(frontmatter: { category: { eq: "hero section" } }) {
      frontmatter {
        title
        content
        linkTo
        linkText
      }
    }
    experiences: allMarkdownRemark(filter: { frontmatter: { category: { eq: "experiences" } } }) {
      nodes {
        id
        frontmatter {
          company
          position
          startDate
          endDate
        }
      }
    }
    posts: allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "blog" }, published: { eq: true } } }
      sort: { frontmatter: { date: DESC } }
      limit: 2
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
