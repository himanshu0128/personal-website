import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

interface Props {
  title?: string;
  description?: string;
  type?: 'website' | 'article';
  children?: React.ReactNode;
}

const Seo: React.FC<Props> = ({ title, description, type = 'website', children }) => {
  const { site } = useStaticQuery<Queries.SeoQuery>(graphql`
    query Seo {
      site {
        siteMetadata {
          title
          description
          social {
            twitter
          }
        }
      }
    }
  `);

  const meta = site?.siteMetadata;
  const siteTitle = meta?.title || 'Himanshu Gupta';
  const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} — Full Stack Developer`;
  const metaDescription = description || meta?.description || '';
  const twitterHandle = meta?.social?.twitter?.split('/').pop();

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content="summary" />
      {twitterHandle && <meta name="twitter:creator" content={`@${twitterHandle}`} />}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </>
  );
};

export default Seo;
