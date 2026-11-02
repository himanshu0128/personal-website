import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

import ThemeToggle from 'components/ThemeToggle';
import { navItems } from 'config/site';

const linkBase = 'rounded-full px-4 py-2 text-sm font-medium transition';
const linkIdle = 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white';
const linkActive = '!text-zinc-900 bg-zinc-100 dark:!text-white dark:bg-zinc-800';

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-lg transition-colors duration-300 ${
        scrolled || open
          ? 'border-zinc-200/80 bg-white/80 dark:border-zinc-800/80 dark:bg-zinc-950/80'
          : 'border-transparent bg-white/0 dark:bg-zinc-950/0'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <StaticImage
            src="../assets/images/profile.jpg"
            alt=""
            width={36}
            height={36}
            className="rounded-full ring-2 ring-accent-500/30 transition group-hover:ring-accent-500"
            imgClassName="rounded-full"
          />
          <span className="font-semibold tracking-tight text-zinc-900 dark:text-white">Himanshu Gupta</span>
        </Link>

        <div className="flex items-center gap-1">
          <nav aria-label="Main" className="hidden items-center gap-1 sm:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`${linkBase} ${linkIdle}`}
                activeClassName={linkActive}
                partiallyActive={item.to !== '/'}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <span className="mx-2 hidden h-5 w-px bg-zinc-200 dark:bg-zinc-800 sm:block" aria-hidden />
          <ThemeToggle />
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 sm:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            <FontAwesomeIcon icon={open ? faXmark : faBars} className="h-4 w-4" />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="container-page flex flex-col gap-1 pb-4 sm:hidden">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`${linkBase} ${linkIdle}`}
              activeClassName={linkActive}
              partiallyActive={item.to !== '/'}
              onClick={() => setOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
