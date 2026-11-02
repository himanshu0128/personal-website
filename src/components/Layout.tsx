import React from 'react';

import Header from 'components/Header';
import Footer from 'components/Footer';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => (
  <div className="relative isolate flex min-h-screen flex-col overflow-x-clip">
    {/* soft background glow */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-[32rem] max-w-5xl bg-gradient-to-tr from-accent-200/60 via-sky-100/40 to-transparent opacity-70 blur-3xl dark:from-accent-900/40 dark:via-sky-900/20 dark:opacity-60"
    />
    <a
      href="#main"
      className="sr-only z-50 rounded-full bg-zinc-900 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      Skip to content
    </a>
    <Header />
    <main id="main" className="flex-1">
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
