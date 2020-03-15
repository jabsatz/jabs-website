/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"
import styled from "@emotion/styled"
import { Trans, useTranslation } from "react-i18next"

const Wrapper = styled.div`
  display: flex;
`

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            github
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata

  const { t } = useTranslation()
  const { name, summary } = author
  return (
    <Wrapper>
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <span>
        <Trans i18nKey="site-description">
          Personal website of <strong>{{ name }}</strong>
        </Trans>
        <br />
        {t("author-summary")}
      </span>
    </Wrapper>
  )
}

export default Bio
