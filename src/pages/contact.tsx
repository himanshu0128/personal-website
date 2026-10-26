import React, { useState } from 'react';
import { graphql, HeadFC, PageProps } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faCheck, faCopy, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import Layout from 'components/Layout';
import Seo from 'components/Seo';
import SectionHeading from 'components/SectionHeading';
import { socialLinks } from 'config/site';

const ContactPage: React.FC<PageProps<Queries.ContactPageQuery>> = ({ data }) => {
  const section = data.section?.frontmatter;
  const email = data.email?.frontmatter?.content || 'himanshu0128gupta@gmail.com';
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <Layout>
      <div className="container-page pt-12 sm:pt-20">
        <SectionHeading
          as="h1"
          eyebrow={section?.title || 'Contact'}
          title="Let's build something together"
          description="Whether it's a project, a freelance gig, mentoring or just a hello — my inbox is open."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* email card */}
          <div className="card relative overflow-hidden p-8 lg:col-span-3">
            <div
              aria-hidden
              className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-400/20 blur-3xl dark:bg-accent-500/20"
            />
            <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-700 ring-1 ring-inset ring-accent-600/10 dark:bg-accent-500/10 dark:text-accent-300">
              <FontAwesomeIcon icon={faPaperPlane} className="h-5 w-5" />
            </span>
            <h2 className="relative mt-6 text-sm font-semibold uppercase tracking-widest !text-zinc-500">Email</h2>
            <a
              href={`mailto:${email}`}
              className="relative mt-2 block break-all text-2xl font-semibold tracking-tight text-zinc-900 transition hover:text-accent-700 dark:text-white dark:hover:text-accent-400 sm:text-3xl"
            >
              {email}
            </a>
            <p className="relative mt-3 text-zinc-600 dark:text-zinc-400">I usually reply within a couple of days.</p>
            <div className="relative mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${email}`} className="btn-primary">
                <FontAwesomeIcon icon={faPaperPlane} className="h-3.5 w-3.5" />
                Send an email
              </a>
              <button type="button" onClick={copyEmail} className="btn-secondary" aria-live="polite">
                <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="h-3.5 w-3.5" />
                {copied ? 'Copied!' : 'Copy address'}
              </button>
            </div>
          </div>

          {/* elsewhere */}
          <div className="card p-8 lg:col-span-2">
            <h2 className="text-sm font-semibold uppercase tracking-widest !text-zinc-500">Elsewhere</h2>
            <ul className="mt-4 divide-y divide-zinc-200 dark:divide-zinc-800">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 py-3.5"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition group-hover:border-accent-500 group-hover:text-accent-700 dark:border-zinc-800 dark:text-zinc-400 dark:group-hover:border-accent-400 dark:group-hover:text-accent-400">
                      <FontAwesomeIcon icon={link.icon} className="h-4 w-4" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-medium text-zinc-900 dark:text-white">{link.label}</span>
                      <span className="block text-sm text-zinc-500">{link.handle}</span>
                    </span>
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      className="h-3 w-3 text-zinc-400 transition group-hover:text-accent-600"
                    />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="https://www.codementor.io/@himanshu0128?refer=badge"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block transition hover:opacity-80"
            >
              <img
                src="https://www.codementor.io/m-badges/himanshu0128/contact-me.svg"
                alt="Contact me on Codementor"
                width={170}
                height={40}
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;

export const Head: HeadFC = () => (
  <Seo title="Contact" description="Get in touch with Himanshu Gupta for projects, freelance work or mentoring." />
);

export const query = graphql`
  query ContactPage {
    section: markdownRemark(frontmatter: { category: { eq: "contact section" } }) {
      frontmatter {
        title
        subtitle
      }
    }
    email: markdownRemark(frontmatter: { category: { eq: "contact" }, title: { eq: "Email" } }) {
      frontmatter {
        content
      }
    }
  }
`;
