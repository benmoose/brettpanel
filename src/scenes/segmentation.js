import React from "react"
import { Button, ButtonGroup, Card, Divider, RadioGroup, Radio } from "@blueprintjs/core"
import { DateRangePicker } from "@blueprintjs/datetime"
import moment from "moment"
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css"

import {Page} from "../modules/common/layout"

export default class Segmentation extends React.Component {
  defaultState = {
    unit: "hour",
    startTime: null,
    endTime: null,
  }

  state = {
    unit: "hour",
    startTime: null,
    endTime: null,
  }

  reset = () => {
    this.setState(this.defaultState)
  }

  handleChange = name => e => {
    this.setState({[name]: e.target.value})
  }

  handleDateRangeChange = dateRange => {
    const [startTime, endTime] = dateRange
    this.setState({startTime, endTime})
  }

  isValid = () => {
    const { unit, startTime, endTime } = this.state
    return unit && startTime && endTime
  }

  formatDate = (date) => {
    return date ? moment(date).format("ddd, MMM Do YYYY") : null
  }

  getDateRangeDurationDays = () => {
    const { startTime, endTime } = this.state
    return startTime && endTime ? moment.duration(moment(endTime).diff(moment(startTime))).asDays() + 1 : 0
  }

  render () {
    return (
      <Page>
        <div className="row">
          <div className="col-8">
            <Card elevation={1} style={{marginBottom: "15px"}}>
              <h4>Date range</h4>
              <DateRangePicker
                value={[this.state.startTime, this.state.endTime]}
                onChange={this.handleDateRangeChange}
                shortcuts={false}
              />
            </Card>
            <Card elevation={1}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-3">
                    <RadioGroup
                      label="Group by"
                      selectedValue={this.state.unit}
                      onChange={this.handleChange("unit")}
                    >
                      <Radio label="Hour" value="hour" />
                      <Radio label="Day" value="day" />
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <Card className="col-4" style={{display: "flex", flexDirection: "column", background: "#fafafb"}}>
            <div style={{flex: 1}}>
              <p>From <strong>{this.formatDate(this.state.startTime) || "start"}</strong> to <strong>{this.formatDate(this.state.endTime) || "end"}</strong>.</p>
              <small>{this.getDateRangeDurationDays()} days</small>
            </div>
            <div style={{textAlign: "right"}}>
              <Button minimal onClick={this.reset}>Reset</Button>
              <Button onClick={console.log} icon="download" disabled={!this.isValid()} intent="success">Download</Button>
            </div>
          </Card>
        </div>
      </Page>
    )
  }
}
