import { toast } from "react-toastify";
import { apiCallBack } from "../utils/fetchAPIs";
import { convertToEpoch } from "../utils/getDateTimeNow";
import {
  initialDataAdvance,
  initialDataService,
  initialDODataAdvance,
} from "../data/btnData";
import { TYPE_GRN, TYPE_SERVICE } from "../constants/BTNContants";

export const getGrnIcgrnByInvoice = async (po, invoice_no, token) => {
  try {
    const payload = {
      purchasing_doc_no: po,
      invoice_no: invoice_no,
    };
    const response = await apiCallBack(
      "POST",
      "po/btn/getGrnIcgrnByInvoice",
      payload,
      token
    );
    return response;
  } catch (error) {
    console.error("ERROR GETTING GRN ICGRN:", error);
  }
};

export const actionHandlerBTN = async (
  flag,
  token,
  id,
  form,
  setForm,
  initialData,
  navigate
) => {
  try {
    const {
      yard,
      stage,
      invoice_no,
      invoice_type,
      invoice_filename,
      invoice_supporting_doc,
      invoice_value,
      debit_note,
      credit_note,
      net_claim_amount,
      cgst,
      sgst,
      igst,
      debit_credit_filename,
      total_price,
      hsn_gstn_icgrn,
      agree_to_declaration,
      demand_raise_filename,
      associated_po,
    } = form;

    if (!invoice_type || !invoice_type.trim() === "") {
      toast.warning("Please choose Invoice Type.");
      return;
    }

    if (!invoice_value || !invoice_value.trim() === "") {
      toast.warning("Basic Value is mandatory.");
      return;
    }
    if (!agree_to_declaration) {
      toast.warning("Please check to agree the Declaration.");
      return;
    }
    if (!hsn_gstn_icgrn) {
      toast.warning("Please check the HSN code, GSTIN, Tax rate is as per PO.");
      return;
    }
    if (!invoice_filename) {
      toast.warning("Invoice file is mandatory.");
      return;
    }
    if (
      (parseFloat(debit_note) > 0 || parseFloat(credit_note) > 0) &&
      !debit_credit_filename
    ) {
      toast.warning("Debit/Credit Note file is mandatory.");
      return;
    }
    if (total_price !== net_claim_amount) {
      toast.warning("Total price and net claim amount should be equal!");
      return;
    }
    const fDToSend = new FormData();
    fDToSend.append("yard", yard);
    fDToSend.append("stage", stage);
    fDToSend.append("purchasing_doc_no", id);
    fDToSend.append("invoice_no", invoice_no);
    fDToSend.append("invoice_type", invoice_type);
    fDToSend.append("invoice_value", invoice_value);
    fDToSend.append("debit_note", debit_note);
    fDToSend.append("credit_note", credit_note);
    fDToSend.append("hsn_gstn_icgrn", hsn_gstn_icgrn);
    fDToSend.append("cgst", cgst);
    fDToSend.append("sgst", sgst);
    fDToSend.append("igst", igst);
    fDToSend.append("associated_po", JSON.stringify(associated_po));
    fDToSend.append("invoice_filename", invoice_filename);
    if (invoice_supporting_doc) {
      fDToSend.append("invoice_supporting_doc", invoice_supporting_doc);
    }

    if (debit_credit_filename) {
      fDToSend.append("debit_credit_filename", debit_credit_filename);
    }
    // if (get_entry_filename) {
    //   fDToSend.append("get_entry_filename", get_entry_filename);
    // }
    if (demand_raise_filename) {
      fDToSend.append("demand_raise_filename", demand_raise_filename);
    }
    console.log("fDToSend", fDToSend);
    const response = await apiCallBack(
      "POST",
      "po/btn/BillsMaterialHybrid",
      fDToSend,
      token
    );

    if (response?.status) {
      toast.success(response?.message);
      setForm({
        ...initialData,
        associated_po: [{ a_po: "" }],
      });
      setForm(initialData);
      // getData();
      navigate(`/invoice-and-payment-process/${id}`);
    } else {
      toast.error(response?.message);
    }
  } catch (error) {
    toast.error("Error:", error);
  }
};

export const actionHandlerByDO = async (
  doForm,
  setDoForm,
  initialData,
  navigate,
  id,
  token
) => {
  console.log("doForm", doForm);
  try {
    doForm.purchasing_doc_no = id;
    if (!doForm?.assign_to || doForm?.assign_to === "") {
      return toast.warn("Please choose the finance authority.");
    }
    if (!doForm?.ld_ge_date || doForm?.ld_ge_date === "") {
      return toast.warn("Please select gate entry date");
    }
    if (!doForm?.contractual_ld || doForm?.contractual_ld === "") {
      return toast.warn("Please select contractual delivery date.");
    }
    if (!doForm?.other_deduction || doForm?.other_deduction === "") {
      return toast.warn("Please fill retension percentage.");
    }

    const response = await apiCallBack(
      "POST",
      "po/btn/BillsMaterialHybridByDO",
      doForm,
      token
    );
    console.log("response2", response);
    if (response?.status) {
      toast.success(response?.message);
      setDoForm(initialData);
      navigate(`/invoice-and-payment-process/${id}`);
    } else {
      toast.error(response?.message);
    }
  } catch (error) {
    toast.error("Error:", error);
  }
};

// SERVICE BTN
export const actionHandlerServiceBTN = async (
  flag,
  token,
  user,
  id,
  form,
  setForm,
  navigate
) => {
  try {
    const {
      wdc_number,
      invoice_type,
      invoice_no,
      invoice_filename,
      suppoting_invoice_filename,
      invoice_value,
      debit_credit_filename,
      debit_note,
      credit_note,
      net_claim_amount,
      net_claim_amt_gst,
      cgst,
      sgst,
      igst,
      hsn_gstn_icgrn,
      bill_certifing_authority,
      agree_to_declaration,
      total_price,
    } = form;
    if (!wdc_number || wdc_number === "") {
      return toast.warn("WDC number is mandatory.");
    }
    if (!bill_certifing_authority || bill_certifing_authority === "") {
      return toast.warn("Please choose GRSE officer.");
    }
    if (!invoice_type || invoice_type.trim() === "") {
      return toast.warning("Please choose Invoice Type.");
    }
    if (!invoice_no || invoice_no === "") {
      return toast.warning("Invoice number is mandatory.");
    }
    if (!invoice_filename || invoice_filename === "") {
      return toast.warning("Invoice file is mandatory.");
    }
    console.log("invoice_filename", invoice_filename);
    if (!invoice_value || invoice_value.trim() === "") {
      return toast.warning("Basic Value is mandatory.");
    }
    if (!agree_to_declaration) {
      return toast.warning("Please check to agree the Declaration.");
    }
    if (!hsn_gstn_icgrn) {
      return toast.warning(
        "Please check the HSN code, GSTIN, Tax rate is as per PO."
      );
    }
    if (
      (parseFloat(debit_note) > 0 || parseFloat(credit_note) > 0) &&
      !debit_credit_filename
    ) {
      return toast.warning("Debit/Credit Note file is mandatory.");
    }
    if (total_price !== net_claim_amount) {
      return toast.warning("Total price and net claim amount should be equal!");
    }
    const fDToSend = new FormData();
    fDToSend.append("purchasing_doc_no", id);
    fDToSend.append("wdc_number", wdc_number);
    fDToSend.append("invoice_type", invoice_type);
    fDToSend.append("invoice_no", invoice_no);
    fDToSend.append("invoice_value", invoice_value);
    fDToSend.append("debit_note", debit_note);
    fDToSend.append("credit_note", credit_note);
    fDToSend.append("net_claim_amount", net_claim_amount);
    fDToSend.append("cgst", cgst);
    fDToSend.append("sgst", sgst);
    fDToSend.append("igst", igst);
    fDToSend.append("net_claim_amt_gst", net_claim_amt_gst);
    fDToSend.append("bill_certifing_authority", bill_certifing_authority);

    if (invoice_filename) {
      fDToSend.append("invoice_filename", invoice_filename);
    }
    if (suppoting_invoice_filename) {
      fDToSend.append("suppoting_invoice_filename", suppoting_invoice_filename);
    }
    if (debit_credit_filename) {
      fDToSend.append("debit_credit_filename", debit_credit_filename);
    }
    const response = await apiCallBack(
      "POST",
      "po/btn/submitServiceHybrid",
      fDToSend,
      token
    );

    if (response?.status) {
      toast.success(response?.message);
      setForm(initialDataService);
      // getData();
      navigate(`/invoice-and-payment-process/${id}`);
    } else {
      toast.error(response?.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Error:", error.message);
  }
};

//JCC
// export const actionHandlerJCCBTN = async (
//   flag,
//   token,
//   user,
//   id,
//   form,
//   setForm,
//   navigate
// ) => {
//   try {
//     // Destructuring form fields
//     const {
//       btn_num,
//       purchasing_doc_no,
//       vendor_code,
//       invoice_no,
//       invoice_value,
//       yard,
//       jcc_filename,
//       invoice_filename,
//       invoice_type,
//       invoice_date,
//       bill_certifing_authority,
//       net_claim_amount,
//       jcc_ref_number,
//       jcc_job_start_date,
//       jcc_job_end_date,
//       hsn_gstn_icgrn,
//       remarks,
//       suppoting_invoice_filename, // Added suppoting_invoice_filename to the form
//     } = form;

//     // Validation checks for mandatory fields
//     // if (!purchasing_doc_no || purchasing_doc_no === "") {
//     //   return toast.warn("Purchasing document number is mandatory.");
//     // }
//     // if (!bill_certifing_authority || bill_certifing_authority === "") {
//     //   return toast.warn("Please choose a GRSE officer.");
//     // }
//     // if (!invoice_type || invoice_type.trim() === "") {
//     //   return toast.warning("Please choose Invoice Type.");
//     // }
//     // if (!invoice_no || invoice_no === "") {
//     //   return toast.warning("Invoice number is mandatory.");
//     // }
//     // if (!invoice_filename || invoice_filename === "") {
//     //   return toast.warning("Invoice file is mandatory.");
//     // }
//     // if (!invoice_value || invoice_value.trim() === "") {
//     //   return toast.warning("Basic value is mandatory.");
//     // }
//     // if (!hsn_gstn_icgrn) {
//     //   return toast.warning(
//     //     "Please verify the HSN code, GSTIN, and Tax rate as per the PO."
//     //   );
//     // }

//     // FormData object for submitting form data
//     const formDataToSend = new FormData();
//     formDataToSend.append("purchasing_doc_no", purchasing_doc_no);
//     formDataToSend.append("btn_num", btn_num);
//     formDataToSend.append("vendor_code", vendor_code);
//     formDataToSend.append("invoice_no", invoice_no);
//     formDataToSend.append("invoice_value", invoice_value);
//     formDataToSend.append("yard", yard);
//     formDataToSend.append("jcc_ref_number", jcc_ref_number);
//     formDataToSend.append("jcc_job_start_date", jcc_job_start_date);
//     formDataToSend.append("jcc_job_end_date", jcc_job_end_date);
//     formDataToSend.append("hsn_gstn_icgrn", hsn_gstn_icgrn);
//     formDataToSend.append("remarks", remarks);
//     formDataToSend.append("bill_certifing_authority", bill_certifing_authority);
//     formDataToSend.append("net_claim_amount", net_claim_amount);
//     formDataToSend.append("invoice_type", invoice_type);
//     formDataToSend.append("invoice_date", invoice_date);

//     // Attach files if they exist
//     if (invoice_filename) {
//       formDataToSend.append("invoice_filename", invoice_filename);
//     }
//     if (suppoting_invoice_filename) {
//       formDataToSend.append(
//         "suppoting_invoice_filename",
//         suppoting_invoice_filename
//       ); // Add supporting invoice file
//     }
//     if (jcc_filename) {
//       formDataToSend.append("jcc_filename", jcc_filename);
//     }

//     // API call
//     const response = await apiCallBack(
//       "POST",
//       "po/btn/jcc-submit",
//       formDataToSend,
//       token
//     );

//     // Handle response
//     if (response?.status) {
//       toast.success(response?.message);
//       setForm(initialDataService); // Reset form to initial state
//       navigate(`/invoice-and-payment-process/${id}`); // Redirect to appropriate page
//     } else {
//       toast.error(response?.message);
//     }
//   } catch (error) {
//     console.error("Error in actionHandlerJCCBTN:", error);
//     toast.error("An error occurred: " + error.message);
//   }
// };
export const actionHandlerServiceByEmp = async (
  empForm,
  setEmpForm,
  initialEmpData,
  navigate,
  id,
  token,
  form,
  data
) => {
  try {
    const {
      finance_authority,
      value,
      other_deduction,
      max_ld,
      retension_rate,
      retension_amount,
      retension_remarks,
      btn_num,
      type,
      number,
      estimatedLD,
      deduction_remarks,
      total_deduction,
      net_payable_amount,
    } = empForm;
    let wdc_details = JSON.stringify(data?.wdcDetails?.line_item_array);
    const { net_claim_amount } = form;
    if (!finance_authority || finance_authority === "") {
      return toast.warn("Please choose the finance authority.");
    }
    if (!value || value === "") {
      return toast.warn("Service entry sheet value or GRN Value is mandatory.");
    }
    if (Number(value) !== Number(net_claim_amount)) {
      return toast.warn(
        "SES Value or GRN Value and Net Claim Amount should be matched."
      );
    }
    // if (!other_deduction || other_deduction === "") {
    //   return toast.warn("Please fill retension percentage.");
    // }

    let payload = {
      purchasing_doc_no: id,
      btn_num: btn_num,
      assign_to: finance_authority,
      entry_type:
        type === TYPE_SERVICE
          ? "service-entry"
          : type === TYPE_GRN
          ? "grn"
          : null,
      entry_number: number,
      wdc_details,
      max_ld,
      estimated_ld: estimatedLD,
      retension_rate,
      retension_amount,
      retension_remarks,
      other_deduction,
      deduction_remarks,
      total_deduction,
      net_payable_amount,
    };

    const response = await apiCallBack(
      "POST",
      "po/btn/submitSBtnByCAuthorty",
      payload,
      token
    );
    console.log("response2", response);
    if (response?.status) {
      toast.success(response?.message);
      setEmpForm(initialEmpData);
      navigate(`/invoice-and-payment-process/${id}`);
    } else {
      toast.error(response?.message);
    }
  } catch (error) {
    toast.error("Error:", error);
  }
};

// Advance bill hybrid paylod submit button
export const actionHandlerAdvancebill = async (
  flag,
  token,
  id,
  form,
  setForm,
  navigate
) => {
  try {
    const {
      yard,
      stage,
      invoice_type,
      invoice_no,
      invoice_date,
      invoice_filename,
      invoice_value,
      invoice_supporting_filename,
      net_claim_amount,
      cgst,
      sgst,
      igst,
      net_with_gst,
      associated_po,
      hsn_gstn_icgrn,
    } = form;
    if (!hsn_gstn_icgrn) {
      return toast.warning(
        "Please check the HSN code, GSTIN, Tax rate is as per PO."
      );
    }
    if (!invoice_type || invoice_type === "") {
      return toast.warning("Please select the invoice type!");
    }
    if (!invoice_no || invoice_no === "") {
      return toast.warning("Please fill up the invoice number!");
    }
    if (!invoice_value || invoice_value === "") {
      return toast.warning("Please fill up the basic value!");
    }
    if (!invoice_filename || invoice_filename === "") {
      return toast.warning("Please select the invoice file!");
    }
    let fDToSend = new FormData();
    fDToSend.append("yard", yard);
    fDToSend.append("stage", stage);
    fDToSend.append("purchasing_doc_no", id);
    fDToSend.append("invoice_no", invoice_no);
    fDToSend.append("invoice_value", invoice_value);
    fDToSend.append("invoice_date", new Date(invoice_date).getTime());
    fDToSend.append("invoice_type", invoice_type);
    fDToSend.append("net_claim_amount", net_claim_amount);
    fDToSend.append("net_with_gst", net_with_gst);
    fDToSend.append("cgst", cgst);
    fDToSend.append("sgst", sgst);
    fDToSend.append("igst", igst);
    fDToSend.append("associated_po", associated_po);

    if (invoice_filename) {
      fDToSend.append("invoice_filename", invoice_filename);
    }
    if (invoice_supporting_filename) {
      fDToSend.append(
        "invoice_supporting_filename",
        invoice_supporting_filename
      );
    }

    console.log("fDToSend", fDToSend);

    const response = await apiCallBack(
      "POST",
      "po/btn/submit-abh",
      fDToSend,
      token
    );

    if (response?.status) {
      toast.success(response?.message);
      setForm(initialDataAdvance);
      navigate(`/invoice-and-payment-process/${id}`);
    } else {
      toast.error(response?.message);
    }
  } catch (error) {
    toast.error("Error:", error);
  }
};
