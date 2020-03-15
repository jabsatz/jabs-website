import React from "react"
import { graphql } from "gatsby"
import Link from "components/Link"
import Layout from "components/Layout"
import SEO from "components/Seo"
import { rhythm } from "utils/typography"
import styled from "styled-components"
import Bio from "components/Bio"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h2
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link to={node.fields.slug}>{title}</Link>
              </h2>
              <small>{node.frontmatter.date}</small>
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
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
