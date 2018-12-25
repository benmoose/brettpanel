import React from "react"
import {Card} from "@blueprintjs/core"

export default ({children, secondary = false, ...props}) => {
  const elevation = secondary ? 0 : 1
  return (
    <Card
      elevation={elevation}
      {...props}
    >
      {children}
    </Card>
  )
}
