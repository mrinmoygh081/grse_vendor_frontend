export const getDateTimeNow = () => {
  let currentdate = new Date();
  let datetime =
    "Last Sync: " +
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  return datetime;
};

export const tenDaysEarlierDate = () => {
  let currentTimestamp = Math.floor(Date.now() / 1000);

  // Calculate 10 days earlier
  let tenDaysEarlierTimestamp = currentTimestamp - 10 * 24 * 60 * 60;

  // console.log("Current timestamp:", currentTimestamp);
  // console.log("10 days earlier timestamp:", tenDaysEarlierTimestamp);
  return tenDaysEarlierTimestamp;
};

export const convertToEpoch = (date) => {
  if (date) {
    return Math.floor(date.getTime() / 1000);
  } else {
    return null;
  }
};
