import React from "react"
import theme from "constants/theme"
import { Helmet } from "react-helmet"
import Header from "components/Header"
import styled from "@emotion/styled"
import { ThemeProvider } from "emotion-theming"

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

export default function Layout({ location, title, children }) {
  return (
    <ThemeProvider theme={theme}>
      <Body>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
        </Helmet>
        <Centered>
          <Header />
          {children}
        </Centered>
      </Body>
    </ThemeProvider>
  )
}
