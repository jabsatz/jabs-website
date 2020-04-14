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
      title="Artículo no disponible en español"
    >
      <SEO title="Artículo no disponible en español" />
      <h1
        style={{
          marginTop: rhythm(1),
          marginBottom: rhythm(1),
        }}
      >
        Este artículo aún no se encuentra en español
      </h1>
      {plural ? (
        <>
          <p>Puedes ver el artículo en los siguientes lenguajes:</p>
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
                    {languages.es[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      ) : (
        <p>
          Puedes ver el artículo en{" "}
          <Link to={postPaths[0].path}>{languages.es[postPaths[0].lang]}</Link>
        </p>
      )}
    </Layout>
  )
}

export default PostNotAvailable
