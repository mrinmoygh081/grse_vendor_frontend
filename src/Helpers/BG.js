import { toast } from "react-toastify";
import { convertToEpoch } from "../utils/getDateTimeNow";
import { postAPI } from "../utils/fetchAPIs";

export const bgInputs = {
  purchasing_doc_no: "",
  bank_name: "",
  branch_name: "",
  bank_addr1: "",
  bank_addr2: "",
  bank_addr3: "",
  bank_city: "",
  bank_pin_code: "",
  bg_no: "",
  bg_date: "",
  bg_ammount: "",
  // department: "",
  // po_date: "",
  yard_no: "",
  validity_date: "",
  claim_priod: "",
  reference_no: "",
  // check_list_date: "",
  bg_type: "SDBG",
  // vendor_name: "",
  // vendor_address1: "",
  // vendor_address2: "",
  // vendor_address3: "",
  // vendor_city: "",
  // vendor_pin_code: "",
  // confirmation: "",
  // extension_date1: "",
  // extension_date2: "",
  // extension_date3: "",
  // extension_date4: "",
  // extension_date5: "",
  // extension_date6: "",
  // release_date: "",
  // demand_notice_date: "",
  // entension_letter_date: "",
  status: "",
  created_at: "",
  created_by: "",
  remarks: "",
  assigned_to: "",
  depertment: "",
};

export const BGEntry = async (formDatainput, token) => {
  const convertToEpochh = (date) => {
    return Math.floor(new Date(date).getTime() / 1000);
  };
  const {
    purchasing_doc_no,
    reference_no,
    bank_name,
    branch_name,
    bank_addr1,
    bank_city,
    bank_pin_code,
    bg_no,
    bg_date,
    bg_ammount,
    validity_date,
    claim_priod,
    bg_type,
    depertment,
  } = formDatainput;
  console.log(formDatainput);

  if (
    purchasing_doc_no === "" ||
    reference_no === "" ||
    bank_name === "" ||
    branch_name === "" ||
    bank_addr1 === "" ||
    bank_city === "" ||
    bank_pin_code === "" ||
    bg_no === "" ||
    bg_date === "" ||
    bg_ammount === "" ||
    validity_date === "" ||
    claim_priod === "" ||
    bg_type === "" ||
    depertment === ""
  ) {
    toast.warn("Please enter the required fields!");
    return false;
  }

  let form = {
    ...formDatainput,
    // bg_date: convertToEpoch(bg_date),
    bg_date: convertToEpochh(new Date(formDatainput.bg_date * 1000)),
    // entension_letter_date: convertToEpoch(entension_letter_date),
    // demand_notice_date: convertToEpoch(demand_notice_date),
    // release_date: convertToEpoch(release_date),
    // check_list_date: convertToEpoch(check_list_date),
    // validity_date: convertToEpoch(validity_date),
    validity_date: convertToEpochh(
      new Date(formDatainput.validity_date * 1000)
    ),
    // po_date: convertToEpoch(po_date),
    // extension_date1: convertToEpoch(extension_date1),
    // extension_date2: convertToEpoch(extension_date2),
    // extension_date3: convertToEpoch(extension_date3),
    // extension_date4: convertToEpoch(extension_date4),
    // extension_date5: convertToEpoch(extension_date5),
    // extension_date6: convertToEpoch(extension_date6),
    // claim_priod: convertToEpoch(claim_priod),
    claim_priod: convertToEpochh(new Date(formDatainput.claim_priod * 1000)),
    reference_no: reference_no,
    status: "FORWARD_TO_FINANCE",
    remarks: "Forwarded to Finance Department",
  };
  const d = await postAPI("/po/sdbg/sdbgSubmitByDealingOfficer", form, token);
  if (d?.status) {
    toast.success(d?.message);
    return true;
  } else {
    toast.error(d?.message);
    return false;
  }
};

// export const BGEntrySave = async (formDatainput, token) => {
//   const convertToEpochh = (date) => {
//     return Math.floor(new Date(date).getTime() / 1000);
//   };
//   const {
//     purchasing_doc_no,
//     reference_no,
//     bank_name,
//     branch_name,
//     bank_addr1,
//     bank_city,
//     bank_pin_code,
//     bg_no,
//     bg_date,
//     bg_ammount,
//     validity_date,
//     claim_priod,
//     bg_type,
//     depertment,
//   } = formDatainput;
//   console.log(formDatainput);

//   if (
//     purchasing_doc_no === "" ||
//     reference_no === "" ||
//     bank_name === "" ||
//     branch_name === "" ||
//     bank_addr1 === "" ||
//     bank_city === "" ||
//     bank_pin_code === "" ||
//     bg_no === "" ||
//     bg_date === "" ||
//     bg_ammount === "" ||
//     validity_date === "" ||
//     claim_priod === "" ||
//     bg_type === "" ||
//     depertment === ""
//   ) {
//     toast.warn("Please enter the required fields!");
//     return false;
//   }

//   let form = {
//     ...formDatainput,
//     // bg_date: convertToEpoch(bg_date),
//     bg_date: convertToEpochh(new Date(formDatainput.bg_date * 1000)),
//     // entension_letter_date: convertToEpoch(entension_letter_date),
//     // demand_notice_date: convertToEpoch(demand_notice_date),
//     // release_date: convertToEpoch(release_date),
//     // check_list_date: convertToEpoch(check_list_date),
//     // validity_date: convertToEpoch(validity_date),
//     validity_date: convertToEpochh(
//       new Date(formDatainput.validity_date * 1000)
//     ),
//     // po_date: convertToEpoch(po_date),
//     // extension_date1: convertToEpoch(extension_date1),
//     // extension_date2: convertToEpoch(extension_date2),
//     // extension_date3: convertToEpoch(extension_date3),
//     // extension_date4: convertToEpoch(extension_date4),
//     // extension_date5: convertToEpoch(extension_date5),
//     // extension_date6: convertToEpoch(extension_date6),
//     // claim_priod: convertToEpoch(claim_priod),
//     claim_priod: convertToEpochh(new Date(formDatainput.claim_priod * 1000)),
//     reference_no: reference_no,
//     status: "SAVED",
//     remarks: "Forwarded to SAVE",
//   };
//   const d = await postAPI("/po/sdbg/insertSdbgSave", form, token);
//   if (d?.status) {
//     toast.success(d?.message);
//     return true;
//   } else {
//     toast.error(d?.message);
//     return false;
//   }
// };

export const BGEntrySave = async (formDatainput, token) => {
  const convertToEpochh = (date) => {
    return Math.floor(new Date(date).getTime() / 1000);
  };

  const {
    purchasing_doc_no,
    reference_no,
    bank_name,
    branch_name,
    bank_addr1,
    bank_city,
    bank_pin_code,
    bg_no,
    bg_date,
    bg_ammount,
    validity_date,
    claim_priod,
    bg_type,
    depertment,
  } = formDatainput;

  console.log(formDatainput);

  let form = {
    ...formDatainput,
    bg_date: convertToEpochh(new Date(formDatainput.bg_date * 1000)),
    validity_date: convertToEpochh(
      new Date(formDatainput.validity_date * 1000)
    ),
    claim_priod: convertToEpochh(new Date(formDatainput.claim_priod * 1000)),
    reference_no: reference_no,
    status: "SAVED",
    remarks: "Forwarded to SAVE",
  };

  const d = await postAPI("/po/sdbg/insertSdbgSave", form, token);

  if (d?.status) {
    toast.success(d?.message);
    return true;
  } else {
    toast.error(d?.message);
    return false;
  }
};
