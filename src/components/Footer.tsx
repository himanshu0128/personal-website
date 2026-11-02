import React from 'react';
import { Link } from 'gatsby';

import SocialLinks from 'components/SocialLinks';
import { navItems } from 'config/site';

const Footer: React.FC = () => (
  <footer className="mt-24 border-t border-zinc-200 dark:border-zinc-800">
    <div className="container-page flex flex-col items-center gap-6 py-10">
      <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="text-zinc-500 transition hover:text-zinc-900 dark:hover:text-white"
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <SocialLinks />
      <p className="text-sm text-zinc-500">
        © {new Date().getFullYear()} Himanshu Gupta
      </p>
    </div>
  </footer>
);

export default Footer;
