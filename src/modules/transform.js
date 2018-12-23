export const objectToJSONBlob = (data) => {
  const JSONString = JSON.stringify(data)
  return stringToBlob(JSONString, "application/json")
}

export const objectToCSVBlob = (data) => {
  const csvHeaders = Object.keys(data[0]).join(",")
  const csvData = data.map(rowObject => Object.values(rowObject).join(","))
  const csvString = [csvHeaders, ...csvData].join("\n")
  return stringToBlob(csvString, "text/csv")
}

const stringToBlob = (str, contentType) => {
  const type = `${contentType};charset=utf-8`
  return new Blob([str],{type})
}
