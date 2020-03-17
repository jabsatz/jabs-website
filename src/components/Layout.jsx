import React from "react"
import theme from "constants/theme"
import { Helmet } from "react-helmet"
import Header from "components/Header"
import styled from "@emotion/styled"
import { ThemeProvider } from "emotion-theming"
import { useFirebase } from "gatsby-plugin-firebase"

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Centered = styled.main`
  max-width: 38rem;
  margin: 0 2.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 1rem;
`

export default function Layout({ lang, location, title, children }) {
  useFirebase(firebase => {
    firebase.analytics().logEvent(`visited ${location.pathname}`)
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <Body>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
        </Helmet>
        <Centered>
          <Header lang={lang} location={location} />
          {children}
        </Centered>
      </Body>
    </ThemeProvider>
  )
}
