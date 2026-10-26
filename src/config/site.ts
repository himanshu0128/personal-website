import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faDev, faGithub, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';

export interface NavLink {
  label: string;
  to: string;
}

export interface SocialLink {
  label: string;
  handle: string;
  href: string;
  icon: IconDefinition;
}

export const navLinks: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Resume', to: '/resume/' },
  { label: 'Blog', to: '/blog/' },
  { label: 'Contact', to: '/contact/' }
];

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', handle: '@himanshu0128', href: 'https://github.com/himanshu0128', icon: faGithub },
  { label: 'LinkedIn', handle: 'in/himanshu0128', href: 'https://linkedin.com/in/himanshu0128', icon: faLinkedinIn },
  { label: 'X (Twitter)', handle: '@himanshu0128', href: 'https://twitter.com/himanshu0128', icon: faXTwitter },
  { label: 'DEV', handle: 'dev.to/himanshu0128', href: 'https://dev.to/himanshu0128', icon: faDev },
  {
    label: 'Codementor',
    handle: '@himanshu0128',
    href: 'https://www.codementor.io/@himanshu0128',
    icon: faHeadset
  }
];
