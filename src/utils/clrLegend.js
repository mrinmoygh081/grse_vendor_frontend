export const clrLegend = (flag) => {
  let clr = "";
  if (flag === "REJECTED") {
    clr = "red";
  } else if (
    flag === "ACCEPTED" ||
    flag === "APPROVED" ||
    flag === "RECEIVED"
  ) {
    clr = "green";
  } else if (flag === "SUBMITTED") {
    clr = "orange";
  } else if (flag === "ASSIGNED") {
    clr = "blue";
  } else if (flag === "FORWARD_TO_FINANCE") {
    clr = "blue";
  } else if (flag === "RETURN_TO_DO") {
    clr = "green";
  } else if (flag === "HOLD") {
    clr = "red";
  } else {
    clr = "black";
  }
  return clr;
};
