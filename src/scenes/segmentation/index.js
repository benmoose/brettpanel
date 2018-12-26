import React from "react"
import moment from "moment"
import saveAs from "file-saver"

import {Page} from "../../modules/common/layout"
import Toaster from "../../modules/common/toaster"
import {callSegmentationEndpoint, getMixpanelResponseErrorMessage} from "../../utils/mixpanel-client"
import {objectToCSVString, objectToJSONString, stringToBlob} from "../../utils/transform"
import AccessKeyPanel from "./access-key-panel"
import DateRangePanel from "./date-range-panel"
import OptionsPanel from "./options-panel"
import SummaryPanel from "./summary-panel"

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

  showToast = (message, intent = "default") => {
    Toaster.show({message, intent})
  }

  getDownloadFilename = (ext) => {
    const { segmentationProperty, unit, startTime, endTime } = this.state
    return `${segmentationProperty}-${unit}-${formatDate(startTime)}-${formatDate(endTime)}.${ext}`
  }

  fetchDataAndDownload = (e, type) => {
    e.preventDefault()
    this.setState({isFetching: true})
    const fromDate = moment(this.state.startTime).format("YYYY-MM-DD")
    const toDate = moment(this.state.endTime).format("YYYY-MM-DD")
    const to = getToExpression(this.state.segmentationProperty)

    callSegmentationEndpoint(this.state.accessKey, fromDate, toDate, this.state.unit, to)
      .then(({ data }) => transformSegmentation(data.data["series"], data.data["values"]))
      .then(downloadedData => {
        const filename = this.getDownloadFilename(type)
        switch (type) {
          case "csv":
            const flattenedData = downloadedData.reduce((acc, bucket) => {
              return [...acc, ...bucket]
            }, [])
            const csvString = objectToCSVString(flattenedData)
            saveAs(stringToBlob(csvString), filename)
            break
          case "json":
            const jsonString = objectToJSONString(downloadedData)
            saveAs(stringToBlob(jsonString), filename)
            break
          default:
            console.error(`Received unknown type: ${type}`)
        }
      })
      .then(() => this.showToast("Download complete"))
      .catch(error => {
        const mixpanelErrorMessage = getMixpanelResponseErrorMessage(error.response)
        const errorMessage = mixpanelErrorMessage || error.message
        this.showToast(errorMessage, "danger")
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
          <div className="col-12">
            <AccessKeyPanel
              accessKeyValue={this.state.accessKey}
              onChange={this.handleChange("accessKey")}
            />
          </div>
          <div className="col-8">
            <DateRangePanel
              startTime={this.state.startTime}
              endTime={this.state.endTime}
              onChange={this.handleDateRangeChange}
            />
            <OptionsPanel
              eventName={{
                value: this.state.event,
                onChange: this.handleChange("event"),
              }}
              unit={{
                value: this.state.unit,
                onChange: this.handleChange("unit"),
              }}
              property={{
                value: this.state.segmentationProperty,
                onChange: this.handleChange("segmentationProperty"),
              }}
            />
          </div>
          <div className="col-4">
            <SummaryPanel
              isValid={this.isValid()}
              isFetching={this.state.isFetching}
              startTime={this.state.startTime}
              endTime={this.state.endTime}
              actions={{
                onRequestDownload: this.fetchDataAndDownload,
                onReset: this.reset,
              }}
            />
          </div>
        </div>
      </Page>
    )
  }
}

const formatDate = (date) => {
  return date ? moment(date).format("YYYY-MM-DD") : null
}

const getToExpression = (property) => {
  return `properties["${property}"]`
}

const transformSegmentation = (series, valuesByModeId) => {
  return series.map((date) => {
    return Object.keys(valuesByModeId).map(property_value => {
      return {
        date,
        property_value,
        sum: valuesByModeId[property_value][date],
      }
    })
  }, [])
}
