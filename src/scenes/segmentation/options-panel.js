import React from "react"
import {shape, func, string} from "prop-types"
import {InputGroup, Label, Radio, RadioGroup} from "@blueprintjs/core"
import Panel from "../../modules/common/panel"

const OptionsPanel = ({eventName, unit, property}) => (
  <Panel>
    <h4>Customise download</h4>
    <div className="container-fluid">
      <div className="row">
        <div className="col-6">
          <Label>Event name</Label>
          <InputGroup
            leftIcon="mobile-phone"
            placeholder="e.g. GO_NEARBY_MODE_SELECTED"
            value={eventName.value}
            onChange={eventName.onChange}
          />
        </div>

        <div className="col-3">
          <RadioGroup
            label="Group by"
            selectedValue={unit.value}
            onChange={unit.onChange}
          >
            <Radio label="Hour" value="hour" />
            <Radio label="Day" value="day" />
          </RadioGroup>
        </div>

        <div className="col-3">
          <RadioGroup
            label="Property name"
            selectedValue={property.value}
            onChange={property.onChange}
          >
            <Radio label="Mode ID" value="mode_id" />
            <Radio label="Request Brand IDs" value="Request Brand IDs" />
          </RadioGroup>
        </div>
      </div>
    </div>
  </Panel>
)

OptionsPanel.propTypes = {
  eventName: shape({
    value: string.isRequired,
    onChange: func.isRequired,
  }).isRequired,
  unit: shape({
    value: string.isRequired,
    onChange: func.isRequired,
  }).isRequired,
  property: shape({
    value: string.isRequired,
    onChange: func.isRequired,
  }).isRequired,
}

export default OptionsPanel
