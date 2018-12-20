import axios from "axios"

const mixpanelAccessKey = process.env.REACT_APP_MIXPANEL_ACCESS_KEY

export const callSegmentationEndpoint = (fromDate, toDate, unit, on) => {
  return axios.get("https://mixpanel.com/api/2.0/segmentation", {
    params: {
      event: "GO_NEARBY_MODE_SELECTED",
      from_date: fromDate,
      to_date: toDate,
      unit: unit,
      on: on,
    },
    auth: {
      username: mixpanelAccessKey,
      password: "",
    },
  })
}
