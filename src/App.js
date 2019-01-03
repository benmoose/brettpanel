import React from "react"
import Navbar from "./modules/common/navbar"
import SegmentationScene from "./scenes/segmentation"
import {getLocalStorageItem, setLocalStorageItem, clearLocalStorageItem} from "./utils/local-storage"

import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import "./index.css"

export default class App extends React.Component {
  state = {
    persistAccessKey: true,
  }

  setSettingsProperty = (name, value) => {
    this.setState(state => {
      const newSettings = {
        ...state,
        [name]: value,
      }
      setLocalStorageItem("settings", JSON.stringify(newSettings))
      return newSettings
    })
  }

  togglePersistAccessKey = () => {
    const updatedValue = !this.state.persistAccessKey
    if (!updatedValue) {
      clearLocalStorageItem("access-key")
    }
    this.setSettingsProperty("persistAccessKey", updatedValue)
  }

  componentDidMount () {
    const persistedSettingsString = getLocalStorageItem("settings")
    if (persistedSettingsString) {
      const persistedSettings = JSON.parse(persistedSettingsString)
      this.setState({ ...persistedSettings })
    }
  }

  render () {
    const settings = this.state

    return (
      <React.Fragment>
        <Navbar/>
        <SegmentationScene
          settings={settings}
          actions={{
            togglePersistAccessKey: this.togglePersistAccessKey
          }}
        />
      </React.Fragment>
    )
  }
}
