import React from "react"
import Navbar from "./modules/common/navbar"
import SegmentationScene from "./scenes/segmentation"

import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import "./index.css"

export default () => (
    <React.Fragment>
        <Navbar />
        <SegmentationScene />
    </React.Fragment>
)
