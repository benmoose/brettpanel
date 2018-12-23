import React from "react"
import styled from "styled-components"
import {Button, ButtonGroup, Popover, Intent, Position, Alignment} from "@blueprintjs/core"

const PopoverTarget = styled.div`
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
    <ButtonGroup vertical alignText={Alignment.RIGHT}>
      <DownloadButton
        downloadType={DownloadTypes.JSON}
        text="Download JSON"
        intent={Intent.NONE}
        isFetching={isFetching}
        isDisabled={isDisabled}
        onClick={downloadHandler}
      />
    </ButtonGroup>
  )

  return (
    <ButtonGroup>
      <DownloadButton
        downloadType={DownloadTypes.CSV}
        text="Download CSV"
        intent={intent}
        isFetching={isFetching}
        isDisabled={isDisabled}
        onClick={downloadHandler}
      />
      <Popover
        minimal
        content={DownloadOptions}
        position={Position.BOTTOM_RIGHT}
        targetTagName={PopoverTarget}
      >
        <Button disabled={isDisabled} icon="caret-down" intent={intent} />
      </Popover>
    </ButtonGroup>
    )
}

const DownloadButton = ({downloadType, text, intent, isFetching, isDisabled, onClick}) => {
  return (
    <Button
      large
      type="submit"
      icon="download"
      intent={intent}
      loading={isFetching}
      disabled={isDisabled}
      onClick={onClick(downloadType)}
    >
      {text}
    </Button>
  )
}
