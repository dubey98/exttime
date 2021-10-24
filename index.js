const datefns = require("date-fns");
const C = require("./constants");

const todayStr = /(?<today>\btoday|tod\b)/;
const tomorrowStr = /(?<tomorrow>\btomorrow|tom\b)/;
const monStr = /(?<monday>\bmonday|mon\b)/;
const tuesStr = /(?<tuesday>\btuesday|tue\b)/;
const wedStr = /(?<wednesday>\bwednesday|Wed\b)/;
const thursStr = /(?<thursday>\bthursday|thurs\b)/;
const friDay = /(?<friday>\bfriday|fri\b)/;
const satStr = /(?<saturday>\bsaturday|sat\b)/;
const sunStr = /(?<sunday>\bsunday|sun\b)/;
const adjectiveStr = /(?<adj>\sat|\sby|\son)?/;
const singleDigitTime = /(?<time1>\s\d\b)/;
const doubleDigitTime = /(?<time2>(\s[0-1][0-9]\s)|(\s[2][0-4]\s))/;
const timeWithMinutes =
  /(?<time3>(\s[0-1][0-9]:[0-5][0-9]\b)|(\s2[0-3]:[0-5][0-9]\b))/;
const timeWithMinuteAndAmPm =
  /(?<time4>(\s[0-1][0-9]:[0-5][0-9](am|pm)\b)|(\s2[0-3]:[0-5][0-9](am|pm)\b))/;
const regModifier = {
  or: "|",
  zeroOrOne: "?",
  bracketStart: "(",
  bracketEnd: ")",
  oneOrMore: "+",
};

/**
 * takes an input string and finds whether it has any date and time contents in it
 * @param {String} input
 * @returns {Date} if the string contains dat part then date else null
 */
function processText(input) {
  if (typeof input !== "string") {
    throw new Error("The input must be a string");
    return;
  }

  const searchResult = extractDateTimeGroups(input);
  const retValue = [];
  searchResult.forEach((result) => {
    const matchedText = result[0].trim();
    let dateTime = null;
    for (let [key, value] of Object.entries(result.groups)) {
      if (matchIfDateKey(key) && typeof value !== "undefined") {
        dateTime = setDate(key.toString());
      } else if (matchIfTimeKey(key) && typeof value !== "undefined") {
        dateTime = setTime(dateTime, key.toString(), value.toString().trim());
      }
    }
    retValue.push({
      dateTime: dateTime,
      matchedText: matchedText,
    });
  });

  return retValue;
}

function extractDateTimeGroups(input) {
  const dayPrefixRegex = getDayPrefix();
  const timeRegex = getTimeRegex();

  const r = new RegExp(
    dayPrefixRegex.source +
      "+" +
      "(" +
      adjectiveStr.source +
      timeRegex.source +
      ")" +
      regModifier.zeroOrOne,
    "gi"
  );
  const searchResult = [];
  let result = null;
  while ((result = r.exec(input))) {
    searchResult.push(result);
    result = null;
  }
  return searchResult;
}

function getDayPrefix() {
  return new RegExp(
    "(" +
      todayStr.source +
      "|" +
      tomorrowStr.source +
      "|" +
      monStr.source +
      "|" +
      tuesStr.source +
      "|" +
      thursStr.source +
      "|" +
      friDay.source +
      "|" +
      satStr.source +
      "|" +
      sunStr.source +
      ")"
  );
}

function getTimeRegex() {
  return new RegExp(
    "(" +
      singleDigitTime.source +
      "|" +
      doubleDigitTime.source +
      "|" +
      timeWithMinutes.source +
      "|" +
      timeWithMinuteAndAmPm.source +
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

module.exports = processText;
