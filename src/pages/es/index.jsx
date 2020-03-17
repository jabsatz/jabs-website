import React from "react"
import { graphql } from "gatsby"
import Link from "components/Link"
import Layout from "components/Layout"
import SEO from "components/Seo"
import { rhythm } from "utils/typography"
import Bio from "components/Bio"
import getUrlFromSlug from "utils/getUrlFromSlug"
import isPostCurrentLanguage from "utils/isPostCurrentLanguage"
import formatDateForLang from "utils/formatDateForLang"

const lang = "es"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} lang={lang} title={siteTitle}>
      <SEO title="Artículos" />
      <Bio lang={lang} />
      {posts.filter(isPostCurrentLanguage("es")).map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h2
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link to={getUrlFromSlug(node.fields.slug)}>{title}</Link>
              </h2>
              <small>
                {formatDateForLang(node.frontmatter.date, lang)} - Se lee en{" "}
                {node.timeToRead} minutos
              </small>
            </header>
            <section>
              <span
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          timeToRead
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            description
          }
          fileAbsolutePath
        }
      }
    }
  }
`
