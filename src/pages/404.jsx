import React from "react"
import { graphql } from "gatsby"

import Layout from "components/Layout"
import SEO from "components/Seo"
import { useTranslation } from "react-i18next"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const { t } = useTranslation()

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <h1>{t("not-found")}</h1>
      <p>{t("not-found-desc")}</p>
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
