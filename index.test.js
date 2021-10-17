const index = require("./index");
const datefns = require("date-fns");

test("catches one today from the input", () => {
  expect(index("bring milk home today")).toStrictEqual([
    {
      dateTime: new Date(new Date().setHours(9, 0, 0, 0)),
      matchedText: "today",
    },
  ]);
});

test("catches one tod from the input", () => {
  expect(index("bring milk home tod")).toStrictEqual([
    {
      dateTime: new Date(new Date().setHours(9, 0, 0, 0)),
      matchedText: "tod",
    },
  ]);
});

test("catches one tod from the input at middle sentence", () => {
  expect(index("bring milk home tod for someone")).toStrictEqual([
    { dateTime: new Date(new Date().setHours(9, 0, 0, 0)), matchedText: "tod" },
  ]);
});

test("should not catch todat or misspell", () => {
  expect(index("bring milk home todat for someone")).toStrictEqual([]);
});

test("catches one tomorrow from the input", () => {
  expect(index("bring milk home tomorrow")).toStrictEqual([
    {
      dateTime: new Date(datefns.addDays(new Date(), 1).setHours(9, 0, 0, 0)),
      matchedText: "tomorrow",
    },
  ]);
});

test("catches one tom from the input", () => {
  expect(index("bring milk home tom")).toStrictEqual([
    {
      dateTime: new Date(
        new Date(datefns.addDays(new Date(), 1)).setHours(9, 0, 0, 0)
      ),
      matchedText: "tom",
    },
  ]);
});

test("catches one tom from the input at middle sentence", () => {
  expect(index("bring milk home tom for someone")).toStrictEqual([
    {
      dateTime: new Date(
        new Date(datefns.addDays(new Date(), 1)).setHours(9, 0, 0, 0)
      ),
      matchedText: "tom",
    },
  ]);
});

test("should not catch tomato or misspell", () => {
  expect(index("bring milk home tomato for someone")).toStrictEqual([]);
});

test("catches one monday from the input", () => {
  expect(index("bring milk home monday")).toStrictEqual([
    {
      dateTime: new Date(datefns.nextMonday(new Date()).setHours(9, 0, 0, 0)),
      matchedText: "monday",
    },
  ]);
});

test("catches one mon from the input", () => {
  expect(index("bring milk home mon")).toStrictEqual([
    {
      dateTime: new Date(datefns.nextMonday(new Date()).setHours(9, 0, 0, 0)),
      matchedText: "mon",
    },
  ]);
});

test("bring milk tom at 11", () => {
  expect(index("catches time as tom at 11 ")).toStrictEqual([
    {
      dateTime: new Date(datefns.nextMonday(new Date()).setHours(11, 0, 0, 0)),
      matchedText: "tom at 11",
    },
  ]);
});

test("bring milk tod at 11", () => {
  expect(index("bring milk tod at 11 ")).toStrictEqual([
    {
      dateTime: new Date(new Date().setHours(11, 0, 0, 0)),
      matchedText: "tod at 11",
    },
  ]);
});

test("bring milk today at 11:45pm", () => {
  expect(index("bring milk today at 11:45pm")).toStrictEqual([
    {
      dateTime: new Date(new Date().setHours(23, 45, 0, 0)),
      matchedText: "today at 11:45pm",
    },
  ]);
});

test("bring milk today at 11:45am", () => {
  expect(index("bring milk today at 11:45am")).toStrictEqual([
    {
      dateTime: new Date(new Date().setHours(11, 45, 0, 0)),
      matchedText: "today at 11:45am",
    },
  ]);
});

test("bring milk today at 34:56am", () => {
  expect(index("bring milk today at 34:56am")).toStrictEqual([
    {
      dateTime: new Date(new Date().setHours(9, 0, 0, 0)),
      matchedText: "today",
    },
  ]);
});

test("when nothing is matching from the string", () => {
  expect(index("when nothing matches from the string")).toStrictEqual([]);
});

test("should not match on esingle digit like 3", () => {
  expect(index("should not match on esingle digit like 3")).toStrictEqual([]);
});

test("mathces today and tomorrow both and returns an array of them ", () => {
  expect(
    index("mathces today and tomorrow both and returns an array of them ")
  ).toStrictEqual([
    {
      dateTime: new Date(new Date().setHours(9, 0, 0, 0)),
      matchedText: "today",
    },
    {
      dateTime: new Date(datefns.nextMonday(new Date()).setHours(9, 0, 0, 0)),
      matchedText: "tomorrow",
    },
  ]);
});

test("mathces today at 11 and tomorrow at 12:30am both and returns an array of them ", () => {
  expect(
    index(
      "mathces today at 11 and tomorrow at 12:30am both and returns an array of them "
    )
  ).toStrictEqual([
    {
      dateTime: new Date(new Date().setHours(11, 0, 0, 0)),
      matchedText: "today at 11",
    },
    {
      dateTime: new Date(datefns.nextMonday(new Date()).setHours(12, 30, 0, 0)),
      matchedText: "tomorrow at 12:30am",
    },
  ]);
});
