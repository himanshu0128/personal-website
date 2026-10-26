module.exports = {
  // generates src/gatsby-types.d.ts so GraphQL results are typed
  graphqlTypegen: true,
  siteMetadata: {
    title: `Himanshu Gupta`,
    description: `Himanshu Gupta is a full stack developer building web apps, native mobile apps and APIs with JavaScript, TypeScript, React, React Native and Elixir.`,
    author: `Himanshu Gupta`,
    role: `Full Stack Developer`,
    email: `himanshu0128gupta@gmail.com`,
    social: {
      github: `https://github.com/himanshu0128`,
      twitter: `https://twitter.com/himanshu0128`,
      linkedin: `https://linkedin.com/in/himanshu0128`,
      devto: `https://dev.to/himanshu0128`,
      codementor: `https://www.codementor.io/@himanshu0128`
    }
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/data`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 768,
              linkImagesToOriginal: false,
              backgroundColor: `transparent`
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Himanshu Gupta`,
        short_name: `Himanshu`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#0d9488`,
        display: `minimal-ui`,
        icon: `src/assets/images/icon.svg`
      }
    }
  ]
};
