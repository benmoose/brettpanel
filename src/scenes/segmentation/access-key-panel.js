import React from "react"
import styled from "styled-components"
import {InputGroup, Label, Checkbox} from "@blueprintjs/core"
import Panel from "../../modules/common/panel"

const Toolbar = styled.div`
  margin-top: 15px;
`

export default ({ togglePersistAccessKey, persistAccessKey, accessKeyValue, onChange }) => (
  <Panel>
    <div style={{display: "flex", alignItems: "baseline"}}>
      <Label>Access Key</Label>
      <small style={{marginLeft: "5px", opacity: 0.65}}>
        Other than authenticating with Mixpanel, this key never leaves your browser
      </small>
    </div>
    <InputGroup
      leftIcon="lock"
      type="password"
      value={accessKeyValue}
      onChange={onChange}
    />
    <Toolbar>
      <Checkbox checked={persistAccessKey} onChange={togglePersistAccessKey}>
        Persist key across browser reload
      </Checkbox>
    </Toolbar>
  </Panel>
)
