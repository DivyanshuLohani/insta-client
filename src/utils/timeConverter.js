export default function timeSince(previous, short = false) {
  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  let msPerMonth = msPerDay * 30;
  let msPerYear = msPerDay * 365;

  let elapsed = Date.now() - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    let val = Math.round(elapsed / msPerHour);
    return val + plural(val, " hour") + " ago";
  } else if (elapsed < msPerMonth) {
    let val = Math.round(elapsed / msPerDay);
    return val + plural(val, " day") + " ago";
  } else if (elapsed < msPerYear) {
    let val = Math.round(elapsed / msPerMonth);
    return val + (val === 1 ? " month" : " months") + " ago";
  } else {
    let val = Math.round(elapsed / msPerYear);
    return val + (val === 1 ? " year" : " years") + " ago";
  }
}

function plural(val, text, es = false) {
  if (val <= 0) {
    return text;
  }
  let ret = text + (es ? "es" : "s");

  return ret;
}
