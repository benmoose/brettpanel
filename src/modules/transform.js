export const objectToJSONString = (data) => {
  return JSON.stringify(data)
}

export const objectToCSVString = (data) => {
  const csvHeaders = Object.keys(data[0]).join(",")
  const csvData = data.map(rowObject => Object.values(rowObject).join(","))
  return [csvHeaders, ...csvData].join("\n")
}

export const stringToBlob = (str, contentType) => {
  const type = `${contentType};charset=utf-8`
  return new Blob([str],{type})
}
