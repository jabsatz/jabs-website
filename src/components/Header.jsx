import React from "react"
import BaseLink from "components/Link"
import styled from "styled-components"

const Link = styled(BaseLink)`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.primary};
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
`

export default function Header() {
  return (
    <Link to="/">
      <Title>Jabs</Title>
    </Link>
  )
}
