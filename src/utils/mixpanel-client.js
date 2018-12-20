import axios from "axios"

export const callSegmentationEndpoint = (accessKey, fromDate, toDate, unit, on) => {
  return axios.get("https://mixpanel.com/api/2.0/segmentation", {
    params: {
      event: "GO_NEARBY_MODE_SELECTED",
      from_date: fromDate,
      to_date: toDate,
      unit: unit,
      on: on,
    },
    auth: {
      username: accessKey,
      password: "",
    },
  })
}
