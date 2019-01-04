import React from "react"
import styled from "styled-components"
import moment from "moment"
import {Button, Divider} from "@blueprintjs/core"
import Panel from "../../../modules/common/panel"
import DownloadButton from "./download-button"

const VerticalPanel = styled(Panel)`
  display: flex;
  flex-direction: column;
`

const SeparatorLine = styled(Divider)`
  margin: 15px 0 !important;
`

const Buttons = ({ actions, isDisabled, isFetching }) => {
  return (
    <div style={{display: "flex", justifyContent: "space-between"}}>
      <div style={{display: "flex", alignItems: "center"}}>
        <Button minimal onClick={actions.onReset}>Reset</Button>
      </div>
      <DownloadButton
        isFetching={isFetching}
        isDisabled={isDisabled}
        actions={{
          onRequestDownload: actions.onRequestDownload,
        }}
      />
    </div>
  )
}

export default ({ isValid, isFetching, startTime, endTime, actions }) => {
  return (
    <VerticalPanel secondary title="Summary">
      <span>Downloading data for <strong>{getDateRangeDurationDays(startTime, endTime)}</strong> days</span>
      <SeparatorLine />
      <Buttons actions={actions} isDisabled={!isValid} isFetching={isFetching} />
    </VerticalPanel>
  )
}

const getDateRangeDurationDays = (startTime, endTime) => {
  const days = startTime && endTime ? moment.duration(moment(endTime).diff(moment(startTime))).asDays() + 1 : 0
  return days.toFixed(0)  // fixes issue where some fractional day is computed
}
