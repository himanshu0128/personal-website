import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faDev, faGithub, faLinkedinIn, faXTwitter, IconDefinition } from '@fortawesome/free-brands-svg-icons';

export interface NavItem {
  title: string;
  to: string;
}

export const navItems: NavItem[] = [
  { title: 'Home', to: '/' },
  { title: 'Resume', to: '/resume/' },
  { title: 'Blog', to: '/blog/' },
  { title: 'Contact', to: '/contact/' }
];

export interface SocialLink {
  label: string;
  handle: string;
  href: string;
  icon: IconDefinition;
}

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', handle: '@himanshu0128', href: 'https://github.com/himanshu0128', icon: faGithub },
  { label: 'LinkedIn', handle: 'in/himanshu0128', href: 'https://linkedin.com/in/himanshu0128', icon: faLinkedinIn },
  { label: 'X / Twitter', handle: '@himanshu0128', href: 'https://twitter.com/himanshu0128', icon: faXTwitter },
  { label: 'DEV', handle: 'dev.to/himanshu0128', href: 'https://dev.to/himanshu0128', icon: faDev },
  { label: 'Codementor', handle: 'codementor.io/@himanshu0128', href: 'https://www.codementor.io/@himanshu0128?refer=badge', icon: faGraduationCap }
];
