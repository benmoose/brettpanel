import {arrayToCSVString, arrayToJSONString} from "./transform"

const data = [
  {a: 42, b: "foo"},
  {a: 64, b: "bar"},
  {a: 89, b: "baz"},
]

test("CSV transformation returns correct data", () => {
  expect(arrayToCSVString(data)).toBe("a,b\n42,foo\n64,bar\n89,baz")
})

test("JSON transformation returns correct data", () => {
  expect(arrayToJSONString(data)).toBe(JSON.stringify(data))
})
