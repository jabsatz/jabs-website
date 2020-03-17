/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "utils/typography"
import styled from "@emotion/styled"

const Wrapper = styled.div`
  display: flex;
`

const ENText = ({ author, social }) => {
  return (
    <span>
      Personal website of{" "}
      <strong>
        <a href={`https://github.com/${social.github}`}>{author.name}</a>
      </strong>
      <br />
      Berlin-based argentinian software developer
    </span>
  )
}

const ESText = ({ author, social }) => {
  return (
    <span>
      Sitio personal de{" "}
      <strong>
        <a href={`https://github.com/${social.github}`}>{author.name}</a>
      </strong>
      <br />
      Software developer argentino viviendo en Berlín
    </span>
  )
}

const textForLang = {
  en: ENText,
  es: ESText,
}

const Bio = ({ location, lang }) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
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

  const Text = textForLang[lang]
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
      <Text author={author} social={social} />
    </Wrapper>
  )
}

export default Bio
