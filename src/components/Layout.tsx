import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMoon, faSun, faXmark } from '@fortawesome/free-solid-svg-icons';

import SocialLinks from 'components/SocialLinks';
import { navLinks } from 'config/site';

const ThemeToggle: React.FC = () => {
  const [dark, setDark] = useState(false);

  // the initial class is set by an inline script in gatsby-ssr.js before first paint
  useEffect(() => setDark(document.documentElement.classList.contains('dark')), []);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch (e) {
      // storage may be unavailable (private mode); the toggle still works for this visit
    }
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-white"
    >
      <FontAwesomeIcon icon={dark ? faSun : faMoon} className="h-4 w-4" />
    </button>
  );
};

const navClass =
  'rounded-full px-4 py-2 text-sm font-medium text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white';
const activeNavClass = '!text-accent-700 bg-accent-50 dark:!text-accent-300 dark:bg-accent-500/10';

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/80 backdrop-blur-lg dark:border-zinc-800/70 dark:bg-zinc-950/80">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="font-mono text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
          <span className="text-accent-600 dark:text-accent-400">&lt;</span>
          himanshu
          <span className="text-accent-600 dark:text-accent-400">/&gt;</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={navClass} activeClassName={activeNavClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 md:hidden dark:border-zinc-800 dark:text-zinc-400"
          >
            <FontAwesomeIcon icon={open ? faXmark : faBars} className="h-4 w-4" />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-zinc-200 md:hidden dark:border-zinc-800">
          <ul className="container-page flex flex-col gap-1 py-3">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`block ${navClass}`}
                  activeClassName={activeNavClass}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

const Footer: React.FC = () => (
  <footer className="mt-24 border-t border-zinc-200 dark:border-zinc-800">
    <div className="container-page flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
      <p className="text-sm text-zinc-500">
        &copy; {new Date().getFullYear()} Himanshu Gupta. Built with Gatsby &amp; Tailwind CSS.
      </p>
      <SocialLinks />
    </div>
  </footer>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex min-h-screen flex-col">
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent-600 focus:px-4 focus:py-2 focus:text-white"
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
