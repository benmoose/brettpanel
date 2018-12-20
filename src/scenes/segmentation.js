import React from "react"
import moment from "moment"
import {Button, Card, Divider, RadioGroup, Radio, InputGroup, Label} from "@blueprintjs/core"
import {DateRangePicker} from "@blueprintjs/datetime"
import saveAs from "file-saver"

import {Page} from "../modules/common/layout"
import Toaster from "../modules/common/toaster"
import {callSegmentationEndpoint} from "../utils/mixpanel-client"

import "@blueprintjs/datetime/lib/css/blueprint-datetime.css"

export default class Segmentation extends React.Component {
  defaultState = {
    accessKey: "",
    unit: "hour",
    event: "GO_NEARBY_MODE_SELECTED",
    segmentationProperty: "mode_id",
    startTime: null,
    endTime: null,
    isFetching: false,
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

  formatDate = (date) => {
    return date ? moment(date).format("ddd, MMM Do YYYY") : null
  }

  getDateRangeDurationDays = () => {
    const { startTime, endTime } = this.state
    return startTime && endTime ? moment.duration(moment(endTime).diff(moment(startTime))).asDays() + 1 : 0
  }

  showToast = (message, intent="default") => {
    Toaster.show({message, intent})
  }

  fetchData = e => {
    e.preventDefault()
    this.setState({isFetching: true})
    const fromDate = moment(this.state.startTime).format("YYYY-MM-DD")
    const toDate = moment(this.state.endTime).format("YYYY-MM-DD")
    const to = getToExpression(this.state.segmentationProperty)
    return callSegmentationEndpoint(this.state.accessKey, fromDate, toDate, this.state.unit, to)
        .then(({ data }) => {
            const dataBlob = new Blob([JSON.stringify(data, null, 2)], {type: "application/json;charset=utf-8"})
            saveAs(dataBlob, `mixpanel-${fromDate}-${toDate}.json`)
            this.showToast("Download complete")
        })
        .catch(error => {
          const errorMessage = (error.response.data || {}).error
          this.showToast(errorMessage || error.message, "danger")
        })
        .finally(() => this.setState({isFetching: false}))
  }

  isValid = () => {
    const { accessKey, unit, startTime, endTime, event } = this.state
    return accessKey && unit && startTime && endTime && event
  }

  render () {
    return (
      <Page>
        <div className="row">
          <div className="col-12" style={{marginBottom: "15px"}}>
            <Card elevation={1} className="col-12">
              <div style={{display: "flex", alignItems: "baseline"}}>
                <Label>Access Key</Label>
                <small style={{marginLeft: "5px", opacity: 0.65}}>
                  This is destroyed then you close or refresh the page, it's only used to authenticate with Mixpanel
                </small>
              </div>
              <InputGroup
                leftIcon="key"
                placeholder=""
                type="password"
                value={this.state.accessKey}
                onChange={this.handleChange("accessKey")}
              />
            </Card>
          </div>
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
                      leftIcon="mobile-phone"
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
          <div className="col-4">
            <Card style={{display: "flex", flexDirection: "column", background: "#fafafb"}}>
              <div style={{flex: 1}}>
                <p>From <strong>{this.formatDate(this.state.startTime) || "start"}</strong> to <strong>{this.formatDate(this.state.endTime) || "end"}</strong>.</p>
                <small>{this.getDateRangeDurationDays()} days</small>
              </div>
              <Divider style={{margin: "15px 0"}} />
              <form onSubmit={this.fetchData} style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{display: "flex", alignItems: "center"}}>
                  <Button minimal onClick={this.reset}>Reset</Button>
                </div>
                <Button
                  large
                  type="submit"
                  icon="download"
                  loading={this.state.isFetching}
                  disabled={!this.isValid()}
                  intent="success"
                >
                  Download
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </Page>
    )
  }
}

const getToExpression = (property) => {
  return `properties["${property}"]`
}
