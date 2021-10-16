const datefns = require("date-fns");
const C = require("./constants");

module.exports = function processText(input) {
  if (typeof input !== "string") {
    throw new Error("The input must be a string");
    return;
  }

  const regexResult = extractDateTimeGroups(input);
  const groups = regexResult ? regexResult.groups : {};
  let retValue = null;
  for (let [key, value] of Object.entries(groups)) {
    if (matchIfDateKey(key) && typeof value !== "undefined") {
      retValue = setDate(key.toString());
    } else if (matchIfTimeKey(key) && typeof value !== "undefined") {
      retValue = setTime(retValue, key.toString(), value.toString().trim());
    }
  }
  return retValue;
};

function extractDateTimeGroups(input) {
  const dayPrefixRegex = getDayPrefix();
  const timeRegex = getTimeRegex();

  const r = new RegExp(
    dayPrefixRegex.source +
      "+" +
      "(" +
      C.adjectiveStr.source +
      timeRegex.source +
      ")" +
      C.regModifier.zeroOrOne,
    "gi"
  );
  return r.exec(input);
}

function getDayPrefix() {
  return new RegExp(
    "(" +
      C.todayStr.source +
      "|" +
      C.tomorrowStr.source +
      "|" +
      C.monStr.source +
      "|" +
      C.tuesStr.source +
      "|" +
      C.thursStr.source +
      "|" +
      C.friDay.source +
      "|" +
      C.satStr.source +
      "|" +
      C.sunStr.source +
      ")"
  );
}

function getTimeRegex() {
  return new RegExp(
    "(" +
      C.singleDigitTime.source +
      "|" +
      C.doubleDigitTime.source +
      "|" +
      C.timeWithMinutes.source +
      "|" +
      C.timeWithMinuteAndAmPm.source +
      ")"
  );
}

function matchIfDateKey(key) {
  return C.dateArray.find((date) => date === key.toString());
}

function matchIfTimeKey(key) {
  return C.timeArray.find((timeKey) => timeKey === key.toString());
}

function setTime(dateTime, key, value) {
  switch (key) {
    case "time1":
      dateTime = datefns.setHours(dateTime, parseInt(value));
      break;
    case "time2":
      dateTime = datefns.setHours(dateTime, parseInt(value));
      break;
    case "time3":
      const hrs = parseInt(value.split(":")[0]);
      const min = parseInt(value.split(":")[1]);
      dateTime = datefns.setHours(dateTime, hrs);
      dateTime = datefns.setMinutes(dateTime, min);
      break;
    case "time4":
      const timePart = value.split(":")[1];
      let hrs2 = parseInt(value.split(":")[0]);
      const isPM = timePart.match(/pm/i);
      const min2 = String(timePart).replace(/am|pm/i, "");
      if (isPM && hrs2 <= 12) hrs2 += 12;
      dateTime = datefns.setHours(dateTime, hrs2);
      dateTime = datefns.setMinutes(dateTime, min2);
      break;
    default:
      break;
  }
  return dateTime;
}

function setDate(dateValue) {
  let retDate = new Date();
  switch (dateValue) {
    case "today":
      break;
    case "tomorrow":
      retDate = datefns.addDays(retDate, 1);
      break;
    case "monday":
      retDate = datefns.nextMonday(retDate);
      break;
    case "tuesday":
      retDate = datefns.nextTuesday(retDate);
      break;
    case "wednesday":
      retDate = datefns.nextWednesday(retDate);
      break;
    case "thursday":
      retDate = datefns.nextThursday(retDate);
      break;
    case "friday":
      retDate = datefns.nextFriday(retDate);
      break;
    case "saturday":
      retDate = datefns.nextSaturday(retDate);
      break;
    case "sunday":
      retDate = datefns.nextSunday(retDate);
      break;
    default:
      break;
  }
  retDate = new Date(retDate.setHours(9, 0, 0, 0));
  return retDate;
}
