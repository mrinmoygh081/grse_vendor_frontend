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
  const oneWeek = 7 * 24 * 60 * 60 * 1000; // milliseconds in a week
  const contractualTime = new Date(contractualDate).getTime();
  const actualTime = new Date(actualDate).getTime();

  // Calculate the difference in time in milliseconds
  const difference = actualTime - contractualTime;

  // Calculate the number of weeks delayed
  const weeksDelayed = Math.floor(difference / oneWeek);

  // Calculate the penalty percentage
  let penaltyPercentage = weeksDelayed * percentage;

  // Ensure penalty does not exceed 5%
  penaltyPercentage = Math.min(penaltyPercentage, maxPercentage);

  // Calculate the penalty amount
  const penaltyAmount = (originalValue * penaltyPercentage) / 100;

  return penaltyAmount;
};
