const React = require('react');

/**
 * Runs before first paint: applies the saved / system colour scheme so dark mode
 * doesn't flash white on load.
 */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var dark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {}
})();
`;

exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: 'en' });
  setHeadComponents([
    React.createElement('script', { key: 'theme', dangerouslySetInnerHTML: { __html: themeScript } })
  ]);
};
