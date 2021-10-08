const index = require("./index");

test("catches one today from the input", () => {
  expect(index("bring milk home today")).toStrictEqual(
    new Date(new Date().setHours(9, 0, 0, 0))
  );
});

test("catches one tomorrow from the input", () => {
  expect(index("bring milk home tomorrow")).toStrictEqual(
    new Date(
      new Date(
        new Date(Date.now()).setDate(new Date(Date.now()).getDate() + 1)
      ).setHours(9, 0, 0, 0)
    )
  );
});
