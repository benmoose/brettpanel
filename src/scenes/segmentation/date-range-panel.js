import React from "react"
import {DateRangePicker} from "@blueprintjs/datetime"
import Panel from "../../modules/common/panel"

export default ({startTime, endTime, onChange}) => (
  <Panel>
    <h4>Select date range</h4>
    <DateRangePicker
      shortcuts
      value={[startTime, endTime]}
      onChange={onChange}
    />
  </Panel>
)
