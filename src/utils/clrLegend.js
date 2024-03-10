export const clrLegend = (flag) => {
  let clr = "";
  if (flag === "REJECTED") {
    clr = "red";
  } else if (flag === "ACCEPTED" || flag === "APPROVED") {
    clr = "green";
  } else if (flag === "SUBMITED") {
    clr = "orange";
  } else if (flag === "ASSIGNED") {
    clr = "blue";
  } else if (flag === "FORWARD_TO_FINANCE") {
    clr = "blue";
  } else {
    clr = "black";
  }
  return clr;
};
