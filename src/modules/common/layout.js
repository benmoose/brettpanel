import React from "react"
import styled from "styled-components"

const PaddingTop = styled.main`
  padding: 20px 0 0;
`

export const Page = props => (
  <PaddingTop className="container" {...props} />
)
