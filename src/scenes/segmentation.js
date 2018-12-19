import React from "react"
import moment from "moment"
import { Button, ButtonGroup, Card, Divider, RadioGroup, Radio, InputGroup, Label } from "@blueprintjs/core"
import { DateRangePicker } from "@blueprintjs/datetime"

import {Page} from "../modules/common/layout"
import {callSegmentationEndpoint} from "../utils/mixpanel-client"

import "@blueprintjs/datetime/lib/css/blueprint-datetime.css"

export default class Segmentation extends React.Component {
  defaultState = {
    unit: "hour",
    event: "GO_NEARBY_MODE_SELECTED",
    segmentationProperty: "mode_id",
    startTime: null,
    endTime: null,
  }

  state = {...this.defaultState}

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
    const { unit, startTime, endTime, event } = this.state
    return unit && startTime && endTime && event
  }

  formatDate = (date) => {
    return date ? moment(date).format("ddd, MMM Do YYYY") : null
  }

  getDateRangeDurationDays = () => {
    const { startTime, endTime } = this.state
    return startTime && endTime ? moment.duration(moment(endTime).diff(moment(startTime))).asDays() + 1 : 0
  }

  fetchData = () => {
    console.log("not implemented")
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

                  <div className="col-6">
                    <Label>Event</Label>
                    <InputGroup
                      placeholder="e.g. GO_NEARBY_MODE_SELECTED"
                      value={this.state.event}
                      onChange={this.handleChange("event")}
                    />
                  </div>

                  <div className="col-3">
                    <RadioGroup
                      label="Segmentation property"
                      selectedValue={this.state.segmentationProperty}
                      onChange={this.handleChange("segmentationProperty")}
                    >
                      <Radio label="Mode ID" value="mode_id" />
                      <Radio label="Request Brand IDs" value="Request Brand IDs" />
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
              <Button onClick={this.fetchData} icon="download" disabled={!this.isValid()} intent="success">Download</Button>
            </div>
          </Card>
        </div>
      </Page>
    )
  }
}
