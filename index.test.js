const index = require("./index");
const datefns = require("date-fns");

test("catches one today from the input", () => {
  expect(index("bring milk home today")).toStrictEqual(
    new Date(new Date().setHours(9, 0, 0, 0))
  );
});

test("catches one tod from the input", () => {
  expect(index("bring milk home tod")).toStrictEqual(
    new Date(new Date().setHours(9, 0, 0, 0))
  );
});

test("catches one tod from the input at middle sentence", () => {
  expect(index("bring milk home tod for someone")).toStrictEqual(
    new Date(new Date().setHours(9, 0, 0, 0))
  );
});

test("should not catch todat or misspell", () => {
  expect(index("bring milk home todat for someone")).toStrictEqual(null);
});

test("catches one tomorrow from the input", () => {
  expect(index("bring milk home tomorrow")).toStrictEqual(
    new Date(datefns.addDays(new Date(), 1).setHours(9, 0, 0, 0))
  );
});

test("catches one tom from the input", () => {
  expect(index("bring milk home tom")).toStrictEqual(
    new Date(new Date(datefns.addDays(new Date(), 1)).setHours(9, 0, 0, 0))
  );
});

test("catches one tom from the input at middle sentence", () => {
  expect(index("bring milk home tom for someone")).toStrictEqual(
    new Date(new Date(datefns.addDays(new Date(), 1)).setHours(9, 0, 0, 0))
  );
});

test("should not catch tomato or misspell", () => {
  expect(index("bring milk home tomato for someone")).toStrictEqual(null);
});

test("catches one monday from the input", () => {
  expect(index("bring milk home monday")).toStrictEqual(
    new Date(datefns.nextMonday(new Date()).setHours(9, 0, 0, 0))
  );
});

test("catches one mon from the input", () => {
  expect(index("bring milk home mon")).toStrictEqual(
    new Date(datefns.nextMonday(new Date()).setHours(9, 0, 0, 0))
  );
});

test("bring milk tom at 11", () => {
  expect(index("catches time as tom at 11 ")).toStrictEqual(
    new Date(datefns.nextMonday(new Date()).setHours(11, 0, 0, 0))
  );
});

test("bring milk tod at 11", () => {
  expect(index("bring milk tod at 11 ")).toStrictEqual(
    new Date(new Date().setHours(11, 0, 0, 0))
  );
});

test("bring milk today at 11:45pm", () => {
  expect(index("bring milk today at 11:45pm")).toStrictEqual(
    new Date(new Date().setHours(23, 45, 0, 0))
  );
});

test("bring milk today at 11:45am", () => {
  expect(index("bring milk today at 11:45am")).toStrictEqual(
    new Date(new Date().setHours(11, 45, 0, 0))
  );
});

test("bring milk today at 34:56am", () => {
  expect(index("bring milk today at 34:56am")).toStrictEqual(
    new Date(new Date().setHours(9, 0, 0, 0))
  );
});
