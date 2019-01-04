import React from "react"
import PropTypes from "prop-types"
import moment from "moment"
import saveAs from "file-saver"

import {Page} from "../../modules/common/layout"
import Toaster from "../../modules/common/toaster"
import {getLocalStorageItem, setLocalStorageItem} from "../../utils/local-storage"
import {callSegmentationEndpoint, getMixpanelResponseErrorMessage} from "../../utils/mixpanel-client"
import {objectToCSVString, objectToJSONString, stringToBlob} from "../../utils/transform"
import AccessKeyPanel from "./access-key-panel"
import DateRangePanel from "./date-range-panel"
import OptionsPanel from "./options-panel"
import SummaryPanel from "./summary-panel"

import "@blueprintjs/datetime/lib/css/blueprint-datetime.css"

const CURRENT_DATE = moment()

export default class Segmentation extends React.Component {
  static defaultState = {
    accessKey: "",
    unit: "hour",
    event: "GO_NEARBY_MODE_SELECTED",
    segmentationProperty: "mode_id",
    startTime: null,
    endTime: null,
    isFetching: false,
  }

  state = {...Segmentation.defaultState}

  componentDidMount () {
    const savedAccessKey = getLocalStorageItem("access-key")
    if (savedAccessKey) {
      this.setState({ accessKey: savedAccessKey })
    }
  }

  reset = () => {
    const resetTo = {
      ...Segmentation.defaultState,
      accessKey: this.state.accessKey,
    }
    this.setState(resetTo)
  }

  handleChange = name => e => {
    this.setState({[name]: e.target.value})
  }

  handleAccessKeyChange = shouldPersistAccessKey => e => {
    if (shouldPersistAccessKey) {
      setLocalStorageItem("access-key", e.target.value)
    }
    this.handleChange("accessKey")(e)
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
      .then(transformedData => {
        const filename = this.getDownloadFilename(type)
        switch (type) {
          case "csv":
            const csvString = objectToCSVString(transformedData)
            saveAs(stringToBlob(csvString), filename)
            break
          case "json":
            const jsonString = objectToJSONString(transformedData)
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
    const { actions, settings } = this.props

    return (
      <Page>
        <div className="row">
          <div className="col-12">
              <AccessKeyPanel
                togglePersistAccessKey={actions.togglePersistAccessKey}
                persistAccessKey={settings.persistAccessKey}
                accessKeyValue={this.state.accessKey}
                onChange={this.handleAccessKeyChange(settings.persistAccessKey)}
              />
          </div>
          <div className="col-8">
            <DateRangePanel
              startTime={this.state.startTime}
              endTime={this.state.endTime}
              onChange={this.handleDateRangeChange}
              maxDate={CURRENT_DATE.toDate()}
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

Segmentation.propTypes = {
  settings: PropTypes.shape({
    persistAccessKey: PropTypes.bool.isRequired,
  })
}

const formatDate = (date) => {
  return date ? moment(date).format("YYYY-MM-DD") : null
}

const getToExpression = (property) => {
  return `properties["${property}"]`
}

export const transformSegmentation = (series, valuesByModeId) => {
  const transformedData = []
  series.forEach(date => {
    Object.keys(valuesByModeId).forEach(property_value => {
      transformedData.push({
        date,
        property_value,
        sum: valuesByModeId[property_value][date],
      })
    })
  })
  return transformedData
}
