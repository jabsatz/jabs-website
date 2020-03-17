import React from "react"
import Link from "components/Link"
import styled from "@emotion/styled"

const Wrapper = styled.header`
  display: flex;
  color: ${({ theme }) => theme.primary};
  justify-content: space-between;
  align-items: space-between;
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 100%;
`

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
`

const Icon = styled.span`
  color: ${({ selected }) => selected && "white"};
`
Icon.defaultProps = { role: "img" }

const getRedirectionForLanguage = (pathname, lang) => {
  const basePathname = pathname.replace(/^\/\w{2}\//, "/")
  if (lang === "en") {
    return basePathname
  }
  return `/${lang}${basePathname}`
}

const langMap = {
  en: {
    label: "English",
    icon: "🇺🇸",
  },
  es: {
    label: "Español",
    icon: "🇦🇷",
  },
}

const LangLink = ({ lang, location }) => {
  const route = getRedirectionForLanguage(location.pathname, lang)
  const langData = langMap[lang]
  const selected = route === location.pathname
  const icon = (
    <Icon selected={selected} aria-label={langData.label}>
      {langData.icon}
    </Icon>
  )
  if (!selected) {
    return <Link to={route}>{icon}</Link>
  }
  return icon
}

export default function Header({ lang, location }) {
  return (
    <Wrapper>
      <Link to={getRedirectionForLanguage("/", lang)}>
        <Title>Jabs</Title>
      </Link>
      <div>
        <LangLink lang="es" location={location} /> •{" "}
        <LangLink lang="en" location={location} />
      </div>
    </Wrapper>
  )
}
