exports.dtRegex =
  /(\btoday|tod\b)?((\sat|by|on\s)((\s\d\b)|(\s[0-1][0-9]\s)|(\s[2][0-4]\s)|(\s[0-1][0-9]:[0-5][0-9]\b)|(\s2[0-3]:[0-5][0-9]\b)|(\s[0-1][0-9]:[0-5][0-9](am|pm)\b)|(\s2[0-3]:[0-5][0-9](am|pm)\b)))?/gi;

exports.todayStr = /(?<today>\btoday|tod\b)/;
exports.tomorrowStr = /(?<tomorrow>\btomorrow|tom\b)/;
exports.monStr = /(?<monday>\bmonday|mon\b)/;
exports.tuesStr = /(?<tuesday>\btuesday|tue\b)/;
exports.wedStr = /(?<wednesday>\bwednesday|Wed\b)/;
exports.thursStr = /(?<thursday>\bthursday|thurs\b)/;
exports.friDay = /(?<friday>\bfriday|fri\b)/;
exports.satStr = /(?<saturday>\bsaturday|sat\b)/;
exports.sunStr = /(?<sunday>\bsunday|sun\b)/;
exports.adjectiveStr = /(?<adj>\sat|\sby|\son)?/;
exports.singleDigitTime = /(?<time1>\s\d\b)/;
exports.doubleDigitTime = /(?<time2>(\s[0-1][0-9]\s)|(\s[2][0-4]\s))/;
exports.timeWithMinutes =
  /(?<time3>(\s[0-1][0-9]:[0-5][0-9]\b)|(\s2[0-3]:[0-5][0-9]\b))/;
exports.timeWithMinuteAndAmPm =
  /(?<time4>(\s[0-1][0-9]:[0-5][0-9](am|pm)\b)|(\s2[0-3]:[0-5][0-9](am|pm)\b))/;
exports.regModifier = {
  or: "|",
  zeroOrOne: "?",
  bracketStart: "(",
  bracketEnd: ")",
  oneOrMore: "+",
};

exports.dateArray = [
  "today",
  "tomorrow",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
exports.timeArray = ["time1", "time2", "time3", "time4"];

// /(\btoday|tod\b)?
// ((\sat|by|on\s)
//   ((\s\d\b)|
//     (\s[0-1][0-9]\s)|
//     (\s[2][0-4]\s)|
//     (\s[0-1][0-9]:[0-5][0-9]\b)|
//     (\s2[0-3]:[0-5][0-9]\b)|
//     (\s[0-1][0-9]:[0-5][0-9](am|pm)\b)|
//     (\s2[0-3]:[0-5][0-9](am|pm)\b)
//   )
// )?/gm;
// /(\btod\b|\btoday\b)\s?(?:((?:(\bat\b|\bon\b|\bby\b))?\s(?:(\d{1,2}))?:(?:(\d{1,2}))?\s?(?:(am|pm))?))/gi => matches "today at 11:45am"
//
// day prefix day shortcut time prefixer
// today     tod   [at|on|by]  11/11:59/11:59 AM/11:59 pm
// tomorrow  tom
// next week
// this->
// monday    mon
// tuesday   tue
// wednesday wed
// thursday  thu
// friday    fri
// saturday  sat
// sunday    sun
// next->
// monday    mon
// tuesday   tue
// wednesday wed
// thursday  thu
// friday    fri
// saturday  sat
// sunday    sun
// (\btod\b|\btoday\b)(\s(at|by|on))?  match => "today at"
// regexr.com/67jcr
