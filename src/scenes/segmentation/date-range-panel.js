import React from "react"
import {DateRangePicker} from "@blueprintjs/datetime"
import Panel from "../../modules/common/panel"

export default ({startTime, endTime, onChange, maxDate}) => (
  <Panel title="Select date range">
    <DateRangePicker
      reverseMonthAndYearMenus
      value={[startTime, endTime]}
      onChange={onChange}
      maxDate={maxDate}
    />
  </Panel>
)
