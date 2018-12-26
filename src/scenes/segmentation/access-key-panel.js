import React from "react"
import {InputGroup, Label} from "@blueprintjs/core"
import Panel from "../../modules/common/panel"

export default ({ accessKeyValue, onChange }) => (
  <Panel>
    <div style={{display: "flex", alignItems: "baseline"}}>
      <Label>Access Key</Label>
      <small style={{marginLeft: "5px", opacity: 0.65}}>
        This is lost when you close or refresh the page, it's only used to authenticate with Mixpanel
      </small>
    </div>
    <InputGroup
      leftIcon="lock"
      placeholder=""
      type="password"
      value={accessKeyValue}
      onChange={onChange}
    />
  </Panel>
)
