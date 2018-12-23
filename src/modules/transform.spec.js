const {objectToCSVBlob} = require("./transform")

const data = [
  {a: 42, b: "foo"},
  {a: 64, b: "bar"},
  {a: 89, b: "baz"},
]

test("object to CSV blob", () => {
  expect(objectToCSVBlob(data)).toBeInstanceOf(Blob)
})
