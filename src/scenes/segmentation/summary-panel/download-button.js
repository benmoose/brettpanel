import React from "react"
import styled from "styled-components"
import {Button, ButtonGroup, Menu, Popover, Intent, Position} from "@blueprintjs/core"

const PopoverTargetFullHeight = styled.div`
  height: 100%;
  display: flex;
`

const DownloadTypes = {
  CSV: "csv",
  JSON: "json",
  RAW: "raw",
}

export default ({ isFetching, isDisabled, actions }) => {
  const intent = isDisabled ? Intent.NONE : Intent.SUCCESS
  const downloadHandler = downloadType => e => actions.onRequestDownload(e, downloadType)

  const DownloadOptions = (
    <Menu>
      <Menu.Item
        onClick={downloadHandler(DownloadTypes.RAW)}
        text="Download raw response"
      />
      <Menu.Item
        onClick={downloadHandler(DownloadTypes.JSON)}
        text="Download JSON"
      />
    </Menu>
  )

  return (
    <ButtonGroup>
      <Button
        large
        type="submit"
        icon="download"
        intent={intent}
        loading={isFetching}
        disabled={isDisabled}
        onClick={downloadHandler(DownloadTypes.CSV)}
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

