import React from "react"
import { graphql } from "gatsby"

import Layout from "components/Layout"
import SEO from "components/Seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout lang="es" location={location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <h1>No encontrado</h1>
      <p>Nada para ver por acá.</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
