import React from "react"
import Link from "components/Link"
import styled from "@emotion/styled"
import { useTranslation } from "react-i18next"

const Wrapper = styled.header`
  display: flex;
  color: ${({ theme }) => theme.primary};
  justify-content: space-between;
  align-items: space-between;
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 100%;
`

const LangLink = styled(Link)``

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
`

const restrictedUrls = ["/"]
const getRedirectionForLanguage = (location, lang) => {
  const basePathname = location.pathname.replace(/\/\w{2}\/$/, "/")
  if (restrictedUrls.includes(basePathname) || lang === "en") {
    return basePathname
  }
  return `${basePathname}${lang}/`
}

export default function Header({ location }) {
  const { i18n } = useTranslation()
  return (
    <Wrapper>
      <Link to="/">
        <Title>Jabs</Title>
      </Link>
      <div>
        <LangLink
          to={getRedirectionForLanguage(location, "es")}
          onClick={() => i18n.changeLanguage("es")}
        >
          <span role="img" aria-label="Español">
            🇦🇷
          </span>
        </LangLink>{" "}
        •{" "}
        <LangLink
          to={getRedirectionForLanguage(location, "en")}
          onClick={() => i18n.changeLanguage("en")}
        >
          <span role="img" aria-label="English">
            🇺🇸
          </span>
        </LangLink>
      </div>
    </Wrapper>
  )
}
