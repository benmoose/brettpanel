import axios from "axios"

const MIXPANEL_MAX_LIMIT = 10000

export const callSegmentationEndpoint = (accessKey, fromDate, toDate, unit, on) => {
  return axios.get("https://mixpanel.com/api/2.0/segmentation", {
    params: {
      event: "GO_NEARBY_MODE_SELECTED",
      from_date: fromDate,
      to_date: toDate,
      unit: unit,
      on: on,
      limit: MIXPANEL_MAX_LIMIT,
    },
    auth: {
      username: accessKey,
      password: "",
    },
  })
}

export const getMixpanelResponseErrorMessage = (response) => {
  console.log(response)
  const responseData = response.data
  if (!responseData) {
    return null
  }
  return responseData.error
}
