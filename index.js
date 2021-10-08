const datefns = require("date-fns");

module.exports = function processText(input) {
  let retValue = new Date();
  const r_today = /(\btod\b|\btoday\b)/i;
  const r_tomorrow = /(\btom\b|\btomorrow\b)/i;

  if (r_today.test(input)) {
    retValue = new Date(new Date().setHours(9, 0, 0, 0));
  } else if (r_tomorrow.test(input)) {
    retValue = new Date(datefns.addDays(Date.now(), 1).setHours(9, 0, 0, 0));
  }

  return retValue;
};
