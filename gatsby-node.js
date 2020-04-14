const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const supportedLanguages = ["en", "es"]

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/BlogPost.jsx`)
  const postNotAvailable = {}

  supportedLanguages.forEach(lang => {
    postNotAvailable[lang] = path.resolve(
      lang === "en"
        ? `./src/templates/PostNotAvailable.jsx`
        : `./src/templates/${lang}/PostNotAvailable.jsx`
    )
  })
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  let groupedPosts = {}

  posts.forEach((post, index) => {
    const slug = post.node.fields.slug

    const langMatch = slug.match(/\/\w{2}\/$/)
    const lang = langMatch ? langMatch[0].substring(1, 3) : "en"
    const basePath = slug.replace(/\/\w{2}\/$/, "/")
    const fullPath = lang !== "en" ? `/${lang}${basePath}` : basePath

    if (!groupedPosts[basePath]) {
      groupedPosts[basePath] = {}
    }

    groupedPosts[basePath][lang] = { ...post, path: fullPath }
  })

  Object.entries(groupedPosts).forEach(([postName, posts], index, arr) => {
    const unavailablePostLanguages = supportedLanguages.filter(
      lang => !posts[lang]
    )

    unavailablePostLanguages.forEach(lang => {
      const fullPath = lang !== "en" ? `/${lang}${postName}` : postName
      const postPaths = Object.entries(posts).map(([lang, post]) => ({
        lang,
        path: post.path,
      }))

      createPage({
        path: fullPath,
        component: postNotAvailable[lang],
        context: {
          postPaths,
          lang,
        },
      })
    })

    Object.entries(posts).forEach(([lang, post]) => {
      const next = index === 0 ? null : arr[index - 1][1][lang]
      const previous = index === arr.length - 1 ? null : arr[index + 1][1][lang]
      const slug = post.node.fields.slug
      const { path } = post

      createPage({
        path,
        component: blogPost,
        context: {
          slug,
          previous: previous ? previous.node : null,
          next: next ? next.node : null,
          lang,
        },
      })
    })
  })
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  // Check if the page is a localized 404
  if (page.path.match(/^\/\w{2}\/404\/$/)) {
    const oldPage = { ...page }
    // Get the language code from the path, and match all paths
    // starting with this code (apart from other valid paths)
    const langCode = page.path.split(`/`)[1]
    page.matchPath = `/${langCode}/*`
    // Recreate the modified page
    deletePage(oldPage)
    createPage(page)
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
