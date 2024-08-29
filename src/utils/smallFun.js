// import { toast } from "react-toastify";

import { toast } from "react-toastify";
import { convertToEpoch } from "./getDateTimeNow";

export const checkTypeArr = (data) => {
  return data && Array.isArray(data) && data.length > 0;
};

export const inputTypeChange = (e, form, setForm) => {
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });
};

export const inputFileChange = (e, form, setForm) => {
  const { name } = e.target;
  setForm({ ...form, [name]: e.target.files[0] });
};

export const calculatePenalty = (
  contractualDate,
  actualDate,
  originalValue,
  percentage,
  maxPercentage
) => {
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  const contractualTime = new Date(contractualDate).getTime();
  const actualTime = new Date(actualDate).getTime();

  // Calculate the difference in time in milliseconds
  const difference = actualTime - contractualTime;
  console.log("difference", difference, percentage);
  if (difference < 0) return 0;

  // Calculate the number of weeks delayed
  const weeksDelayed = Math.ceil(difference / oneWeek);
  // console.log("fun", difference, actualTime, contractualTime, weeksDelayed);

  // Calculate the penalty percentage
  let penaltyPercentage = weeksDelayed * percentage;

  // Ensure penalty does not exceed 1%
  // penaltyPercentage = Math.min(penaltyPercentage, maxPercentage);

  // Calculate the penalty amount
  const penaltyAmount = (Number(originalValue) * penaltyPercentage) / 100;
  // console.log(
  //   "penaltyAmount",
  //   penaltyAmount,
  //   contractualDate,
  //   actualDate,
  //   originalValue
  // );

  return Math.round(penaltyAmount);
};

export const calculateLDByDate = (difference, originalValue, percentage) => {
  const oneWeek = 7 * 24 * 60 * 60 * 1000;

  if (difference < 0) return 0;

  // Calculate the number of weeks delayed
  const weeksDelayed = Math.ceil(difference / oneWeek);
  // console.log("fun", difference, actualTime, contractualTime, weeksDelayed);

  // Calculate the penalty percentage
  let penaltyPercentage = weeksDelayed * percentage;

  // Calculate the penalty amount
  const penaltyAmount = (Number(originalValue) * penaltyPercentage) / 100;

  return Math.round(penaltyAmount);
};

// export const calculateNetPay = (
//   net,
//   ld,
//   sdbg,
//   drg,
//   qap,
//   ilms,
//   other,
//   estimate
// ) => {
//   if (!net || net === "") {
//     toast.warn("Net claim amount is missing");
//   }
//   if (!ld || ld === "") {
//     ld = 0;
//   } else if (!sdbg || sdbg === "") {
//     sdbg = 0;
//   } else if (!drg || drg === "") {
//     drg = 0;
//   } else if (!qap || qap === "") {
//     qap = 0;
//   } else if (!ilms || ilms === "") {
//     ilms = 0;
//   } else if (!other || other === "") {
//     other = 0;
//   } else if (!estimate || estimate === "") {
//     estimate = 0;
//   }

//   let deduct = parseFloat(ld) + parseFloat(other) + parseFloat(estimate);
//   console.log(estimate);

//   let net_pay = parseFloat(net) - deduct;

//   return {
//     deduct: parseFloat(deduct).toFixed(2),
//     net_pay: parseFloat(net_pay).toFixed(2),
//   };
// };
export const calculateNetPay = (
  net,
  ld,
  sdbg,
  drg,
  qap,
  ilms,
  other,
  estimate
) => {
  if (!net || net === "") {
    toast.warn("Net claim amount is missing");
    return;
  }

  // Default values if not provided
  ld = ld || 0;
  sdbg = sdbg || 0;
  drg = drg || 0;
  qap = qap || 0;
  ilms = ilms || 0;
  estimate = estimate || 0;

  // Convert other deduction percentage to actual value
  other = (other / 100) * net;

  let deduct = parseFloat(ld) + parseFloat(other) + parseFloat(estimate);
  let net_pay = parseFloat(net) - deduct;

  return {
    other: parseFloat(other).toFixed(2),
    deduct: parseFloat(deduct).toFixed(2),
    net_pay: parseFloat(net_pay).toFixed(2),
  };
};

export const calculateNetPayService = (net, ld, retension, other) => {
  if (!net || net === "") {
    toast.warn("Net claim amount is missing");
    return;
  }

  // Default values if not provided
  ld = ld || 0;
  retension = retension || 0;
  other = other || 0;

  // Convert retension deduction percentage to actual value
  retension = (retension / 100) * net;

  let deduct = parseFloat(ld) + parseFloat(retension) + parseFloat(other);
  let net_pay = parseFloat(net) - deduct;

  return {
    retension: parseFloat(retension).toFixed(2),
    deduct: parseFloat(deduct).toFixed(2),
    net_pay: parseFloat(net_pay).toFixed(2),
  };
};
