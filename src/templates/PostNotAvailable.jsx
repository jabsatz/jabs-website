import React from "react"
import { Link } from "gatsby"

import Layout from "components/Layout"
import SEO from "components/Seo"
import languages from "constants/languages"
import { rhythm } from "utils/typography"

const PostNotAvailable = ({ pageContext, location }) => {
  const { postPaths, lang } = pageContext
  const plural = postPaths.length > 1

  return (
    <Layout
      location={location}
      lang={lang}
      title="Post not available in english"
    >
      <SEO title="Post not available in english" />
      <h1
        style={{
          marginTop: rhythm(1),
          marginBottom: rhythm(1),
        }}
      >
        This post is not yet available in english
      </h1>
      {plural ? (
        <>
          <p>You can see the post in the following languages:</p>
          <nav>
            <ul
              style={{
                display: `flex`,
                flexDirection: `column`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0,
              }}
            >
              {postPaths.map(({ lang, path }) => (
                <li key={lang}>
                  <Link to={path} rel="prev">
                    {languages.en[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      ) : (
        <p>
          You can see the post in{" "}
          <Link to={postPaths[0].path}>{languages.en[postPaths[0].lang]}</Link>
        </p>
      )}
    </Layout>
  )
}

export default PostNotAvailable
