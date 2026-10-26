const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, `src`), `node_modules`]
    }
  });
};

/**
 * Explicit frontmatter types so queries don't break when a field is missing
 * from every markdown file (e.g. no post has a cover yet).
 */
exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Fields {
      slug: String
    }

    type Frontmatter {
      category: String
      title: String
      subtitle: String
      description: String
      content: String
      date: Date @dateformat
      tags: [String]
      published: Boolean
      cover: File @fileByRelativePath
      company: String
      position: String
      location: String
      startDate: String
      endDate: String
      university: String
      degree: String
      icon: String
      linkTo: String
      linkText: String
      groups: [SkillGroup]
    }

    type SkillGroup {
      name: String
      items: [String]
    }
  `);
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  if (node.internal.type === `MarkdownRemark`) {
    actions.createNodeField({
      name: `slug`,
      node,
      value: createFilePath({ node, getNode })
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const res = await graphql(`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { category: { eq: "blog" }, published: { eq: true } } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  `);

  if (res.errors) {
    reporter.panicOnBuild(`Error while loading blog posts`, res.errors);
    return;
  }

  const posts = res.data.allMarkdownRemark.nodes;

  posts.forEach((post, index) => {
    // posts are sorted newest first
    const previous = index === posts.length - 1 ? null : posts[index + 1];
    const next = index === 0 ? null : posts[index - 1];

    actions.createPage({
      path: post.fields.slug,
      component: path.resolve(`src/templates/blog-post.tsx`),
      context: {
        slug: post.fields.slug,
        previous,
        next
      }
    });
  });
};
