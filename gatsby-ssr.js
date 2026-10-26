const React = require(`react`);

// Applies the saved / system colour scheme before first paint to avoid a light-mode flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`;

exports.onRenderBody = ({ setHtmlAttributes, setPreBodyComponents }) => {
  setHtmlAttributes({ lang: `en` });
  setPreBodyComponents([React.createElement(`script`, { key: `theme`, dangerouslySetInnerHTML: { __html: themeScript } })]);
};
