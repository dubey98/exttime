const index = require("./index");

test("catches one today from the input", () => {
  expect(index("bring milk home today")).toStrictEqual(["today"]);
});

test("catches one tod from the input", () => {
  expect(index("bring milk home tod")).toStrictEqual(["tod"]);
});

test("catches one tod from the input at middle sentence", () => {
  expect(index("bring milk home tod for someone")).toStrictEqual(["tod"]);
});

test("should not catch todat or misspell", () => {
  expect(index("bring milk home todat for someone")).toStrictEqual(null);
});

test("catches one tomorrow from the input", () => {
  expect(index("bring milk home tomorrow")).toStrictEqual(["tomorrow"]);
});

test("catches one tom from the input", () => {
  expect(index("bring milk home tom")).toStrictEqual(["tom"]);
});

test("catches one tom from the input at middle sentence", () => {
  expect(index("bring milk home tom for someone")).toStrictEqual(["tom"]);
});

test("should not catch tomato or misspell", () => {
  expect(index("bring milk home tomato for someone")).toStrictEqual(null);
});
