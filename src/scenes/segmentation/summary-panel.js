import React from "react"
import moment from "moment"
import {Button, Card, Divider} from "@blueprintjs/core"

export default ({ isValid, isFetching, startTime, endTime, actions }) => {
  return (
    <Card style={{display: "flex", flexDirection: "column", background: "#fafafb"}}>
      <div style={{flex: 1}}>
        <p>From <strong>{formatDate(startTime) || "start"}</strong> to <strong>{formatDate(endTime) || "end"}</strong>.</p>
        <small>{getDateRangeDurationDays(startTime, endTime)} days</small>
      </div>
      <Divider style={{margin: "15px 0"}} />
      <form onSubmit={actions.onSubmit} style={{display: "flex", justifyContent: "space-between"}}>
        <div style={{display: "flex", alignItems: "center"}}>
          <Button minimal onClick={actions.onReset}>Reset</Button>
        </div>
        <Button
          large
          type="submit"
          icon="download"
          loading={isFetching}
          disabled={!isValid}
          intent="success"
        >
          Download
        </Button>
      </form>
    </Card>
  )
}

const formatDate = (date) => {
  return date ? moment(date).format("ddd, MMM Do YYYY") : null
}

const getDateRangeDurationDays = (startTime, endTime) => {
  const days = startTime && endTime ? moment.duration(moment(endTime).diff(moment(startTime))).asDays() + 1 : 0
  return days.toFixed(0)  // fixes issue where some fractional day is computed
}
