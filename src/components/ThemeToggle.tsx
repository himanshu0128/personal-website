import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

/**
 * The initial theme is applied by an inline script in gatsby-ssr.js, so this
 * component only flips the class. Both icons are rendered and CSS decides which
 * one shows, which keeps server and client markup identical.
 */
const ThemeToggle: React.FC = () => {
  const toggle = () => {
    const root = document.documentElement;
    const dark = !root.classList.contains('dark');
    root.classList.toggle('dark', dark);
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch (e) {
      // storage may be unavailable (private mode); the toggle still works for this visit
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
    >
      <FontAwesomeIcon icon={faMoon} className="h-4 w-4 dark:hidden" />
      <FontAwesomeIcon icon={faSun} className="hidden h-4 w-4 dark:block" />
    </button>
  );
};

export default ThemeToggle;
