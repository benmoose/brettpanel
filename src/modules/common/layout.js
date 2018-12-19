import React from "react"
import styled from "styled-components"

const PaddingTop = styled.main`
  padding-top: 20px;
`

export const Page = props => (
  <PaddingTop className="container" {...props} />
)
