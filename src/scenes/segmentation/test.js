import {transformSegmentation} from "./index"

test("transformSegmentation", () => {
  const emptyData = {
    "computed_at": "2019-01-03T18:06:19.305561+00:00",
    "legend_size": 0,
    "data": {
      "series": ["2019-01-23"],
      "values": {}
    }
  }
  expect(transformSegmentation(emptyData.data.series, emptyData.data.values)).toBe([])
})
