import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { socialLinks } from 'config/site';

interface Props {
  className?: string;
}

const SocialLinks: React.FC<Props> = ({ className = '' }) => (
  <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
    {socialLinks.map((link) => (
      <li key={link.href}>
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          title={link.label}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition hover:border-accent-500 hover:text-accent-700 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-accent-400 dark:hover:text-accent-400"
        >
          <FontAwesomeIcon icon={link.icon} className="h-4 w-4" />
        </a>
      </li>
    ))}
  </ul>
);

export default SocialLinks;
