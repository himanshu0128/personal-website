import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

interface Props {
  title?: string;
  description?: string;
  pathname?: string;
  children?: React.ReactNode;
}

/** Used from each page's Gatsby `Head` export. */
const Seo: React.FC<Props> = ({ title, description, children }) => {
  const { site } = useStaticQuery<Queries.SeoQuery>(graphql`
    query Seo {
      site {
        siteMetadata {
          title
          description
          author
          role
        }
      }
    }
  `);

  const meta = site!.siteMetadata!;
  const fullTitle = title ? `${title} | ${meta.title}` : `${meta.title} · ${meta.role}`;
  const metaDescription = description || meta.description || '';

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="author" content={meta.author || ''} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@himanshu0128" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content="#09090b" media="(prefers-color-scheme: dark)" />
      {children}
    </>
  );
};

export default Seo;
