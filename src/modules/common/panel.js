import React from "react"
import styled from "styled-components"
import {Card} from "@blueprintjs/core"

const CardWithPadding = styled(Card)`
  margin-bottom: 15px;
  background-color: ${props => props.secondary ? "#fafafb" : "white"}
`

export default ({children, secondary = false}) => {
  const elevation = secondary ? 0 : 1
  return (
    <CardWithPadding
      elevation={elevation}
      secondary={secondary}
      children={children}
    />
  )
}
