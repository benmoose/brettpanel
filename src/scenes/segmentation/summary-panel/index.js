import React from "react"
import moment from "moment"
import {Button, Divider} from "@blueprintjs/core"
import Panel from "../../../modules/common/panel"
import DownloadButton from "./download-button"

export default ({ isValid, isFetching, startTime, endTime, actions }) => {
  return (
    <Panel secondary style={{display: "flex", flexDirection: "column", background: "#fafafb"}}>
      <div style={{flex: 1}}>
        Downloading data for <strong>{getDateRangeDurationDays(startTime, endTime)}</strong> days
      </div>
      <Divider style={{margin: "15px 0"}} />
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <div style={{display: "flex", alignItems: "center"}}>
          <Button minimal onClick={actions.onReset}>Reset</Button>
        </div>
        <DownloadButton
          isFetching={isFetching}
          isDisabled={!isValid}
          actions={{
            onRequestDownload: actions.onRequestDownload,
          }}
        />
      </div>
    </Panel>
  )
}

const getDateRangeDurationDays = (startTime, endTime) => {
  const days = startTime && endTime ? moment.duration(moment(endTime).diff(moment(startTime))).asDays() + 1 : 0
  return days.toFixed(0)  // fixes issue where some fractional day is computed
}
