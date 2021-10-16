const datefns = require("date-fns");
const C = require("./constants");

module.exports = function processText(input) {
  if (typeof input !== "string") {
    throw new Error("The input must be a string");
    return;
  }

  let retValue = new Date();

  retValue = checkForToday(input);

  return retValue;
};

function checkForToday(input) {
  const dayPrefixRegex = getDayPrefix();
  const timeREgex = getTimeRegex();

  const r = new RegExp(
    dayPrefixRegex.source +
      "(" +
      C.adjectiveStr.source +
      timeREgex.source +
      ")" +
      C.regModifier.zeroOrOne,
    "gi"
  );
  return input.match(r);
}

function getDayPrefix() {
  return new RegExp(
    C.regModifier.bracketStart +
      C.todayStr.source +
      C.regModifier.or +
      C.tomorrowStr.source +
      C.regModifier.or +
      C.monStr.source +
      C.regModifier.or +
      C.tuesStr.source +
      C.regModifier.or +
      C.thursStr.source +
      C.regModifier.or +
      C.friDay.source +
      C.regModifier.or +
      C.satStr.source +
      C.regModifier.or +
      C.sunStr.source +
      C.regModifier.bracketEnd
  );
}

function getTimeRegex() {
  return new RegExp(
    C.regModifier.bracketStart +
      C.singleDigitTime.source +
      C.regModifier.or +
      C.doubleDigitTime.source +
      C.regModifier.or +
      C.timeWithMinutes.source +
      C.regModifier.or +
      C.timeWithMinuteAndAmPm.source +
      C.regModifier.bracketEnd
  );
}
