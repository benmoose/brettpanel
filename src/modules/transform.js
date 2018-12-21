export const transformSegmentation = (series, valuesByModeId) => {
  return series.map((date) => {
    return Object.keys(valuesByModeId).map(property_value => {
      return {
        date,
        property_value,
        sum: valuesByModeId[property_value][date],
      }
    })
  }, [])
}
