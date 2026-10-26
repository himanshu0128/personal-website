# Himanshu Gupta — Personal Website

Personal website and blog built with [Gatsby 5](https://www.gatsbyjs.com/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/) and Markdown.

## Getting started

```bash
npm install
npm run develop     # dev server with hot reload at http://localhost:8000
npm run build       # production build into ./public
npm run serve       # serve the production build at http://localhost:9000
npm run typecheck   # TypeScript check
```

> Gatsby 5 officially supports Node 18–24. Node 26 works for this site but prints engine warnings during install.

## Editing content

All content lives in Markdown under `src/data/`:

| Folder                 | What it controls                                                          |
| ---------------------- | ------------------------------------------------------------------------- |
| `hero/`                | Home page headline badge, intro text and primary button                   |
| `experience/*/`        | Resume timeline (sorted automatically, `endDate: 'Present'` = current)   |
| `education/*/`         | Education timeline                                                        |
| `skills/`              | Skill groups shown on the resume                                          |
| `blog/<post>/index.md` | Blog posts (`published: true` to show, `cover` image optional)           |
| `contacts/`            | Contact email                                                             |

Navigation and social links are in `src/config/site.ts`. The accent colour is a single line in `tailwind.config.js`.

## Features

- Light / dark mode (follows the system, remembers your choice, no flash on load)
- Responsive layout with accessible mobile navigation
- Optimised images via `gatsby-plugin-image`
- Reading time and previous / next links on blog posts
- Per-page SEO tags via the Gatsby Head API
