import React from "react"
import styled from "styled-components"
import {Button, ButtonGroup, Menu, Popover, Intent, Position} from "@blueprintjs/core"

const PopoverTargetFullHeight = styled.div`
  height: 100%;
  display: flex;
`

export default ({ isFetching, isDisabled }) => {
  const intent = isDisabled ? Intent.NONE : Intent.SUCCESS
  return (
    <ButtonGroup>
      <Button
        large
        type="submit"
        icon="download"
        intent={intent}
        loading={isFetching}
        disabled={isDisabled}
      >
        Download CSV
      </Button>
      <Popover
        minimal
        content={DownloadOptions}
        position={Position.BOTTOM_RIGHT}
        targetTagName={PopoverTargetFullHeight}
      >
        <Button disabled={isDisabled} icon="caret-down" intent={intent}/>
      </Popover>
    </ButtonGroup>
    )
}

const DownloadOptions = (
  <Menu>
    <Menu.Item text="Download raw response" />
    <Menu.Item text="Download JSON" />
  </Menu>
)
