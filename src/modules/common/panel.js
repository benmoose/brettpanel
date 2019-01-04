import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import {Card} from "@blueprintjs/core"

const CardWithPadding = styled(Card)`
  margin-bottom: 15px;
  background-color: ${props => props.secondary ? "#fbfbfd" : "white"} !important;
`

const Panel = ({children, title, secondary = false}) => {
  const elevation = secondary ? 0 : 1
  return (
    <React.Fragment>
      {
        title
          ? <h4>{title}</h4>
          : null
      }
      <CardWithPadding
        elevation={elevation}
        secondary={secondary}
        children={children}
      />
    </React.Fragment>
  )
}

Panel.propTypes = {
  title: PropTypes.string,
  secondary: PropTypes.bool,
}

export default Panel
