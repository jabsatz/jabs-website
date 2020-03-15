import { Link as BaseLink } from "gatsby"
import styled from "styled-components"

const Link = styled(BaseLink)`
  box-shadow: none;
  color: ${({ theme }) => theme.primary};
  &:hover {
    color ${({ theme }) => theme.lightPrimary};
  }
`

export default Link
