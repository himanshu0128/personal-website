import React from 'react';
import { HeadFC, Link } from 'gatsby';

import Layout from 'components/Layout';
import Seo from 'components/Seo';

const NotFoundPage: React.FC = () => (
  <Layout>
    <div className="container-page flex flex-col items-center py-24 text-center sm:py-32">
      <p className="bg-gradient-to-r from-accent-600 to-sky-600 bg-clip-text font-mono text-7xl font-bold text-transparent sm:text-8xl dark:from-accent-300 dark:to-sky-400">
        404
      </p>
      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">Page not found</h1>
      <p className="mt-4 max-w-md text-lg text-zinc-600 dark:text-zinc-400">
        You just hit a route that doesn&rsquo;t exist&hellip; the sadness.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">
          Back home
        </Link>
        <Link to="/blog/" className="btn-secondary">
          Read the blog
        </Link>
      </div>
    </div>
  </Layout>
);

export default NotFoundPage;

export const Head: HeadFC = () => <Seo title="404: Not found" />;
