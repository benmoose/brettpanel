import React from "react"
import styled from "styled-components"
import {shape, func, string} from "prop-types"
import {InputGroup, Label, Radio, RadioGroup} from "@blueprintjs/core"
import Panel from "../../modules/common/panel"

const OptionSection = styled.div`
  margin-bottom: 15px;
`

const OptionsPanel = ({eventName, unit, property}) => (
  <Panel>
    <h4>Customise download</h4>
    <div className="container-fluid">
      <div className="row">
        <OptionSection className="col-6">
          <Label>Event name</Label>
          <InputGroup
            leftIcon="mobile-phone"
            placeholder="e.g. GO_NEARBY_MODE_SELECTED"
            value={eventName.value}
            onChange={eventName.onChange}
          />
        </OptionSection>

        <OptionSection className="col-6">
          <Label>Property name</Label>
          <InputGroup
            leftIcon="clean"
            placeholder="e.g. Request Brand IDs"
            value={property.value}
            onChange={property.onChange}
          />
        </OptionSection>

        <div className="col-12">
          <RadioGroup
            label="Group by"
            selectedValue={unit.value}
            onChange={unit.onChange}
          >
            <Radio label="Hour" value="hour" />
            <Radio label="Day" value="day" />
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
