import { toast } from "react-toastify";
import { apiCallBack } from "../utils/fetchAPIs";
import { convertToEpoch } from "../utils/getDateTimeNow";
import { initialDataService } from "../data/btnData";
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
    fDToSend.append("invoice_supporting_doc", invoice_supporting_doc);

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
    console.log("bill_certifing_authority", bill_certifing_authority);
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
    if (value !== net_claim_amount) {
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
export const actionHandlerAdvancebillHybrid = async (
  flag,
  token,
  user,
  id,
  form,
  setForm,
  initialData,
  navigate
) => {
  try {
    const {
      btn_num,
      purchasing_doc_no,
      invoice_no,
      invoice_filename,
      invoice_value,
      e_invoice_filename,
      debit_note,
      credit_note,
      debit_credit_filename,
      net_claim_amount,
      net_with_gst,
      cgst,
      sgst,
      igst,
      net_claim_amt_gst,
      updated_by,
      created_at,
      created_by_id,
      vendor_code,
      btn_type,
      status,
      c_level1_doc_sub_date,
      c_level2_doc_sub_date,
      c_level3_doc_sub_date,
      c_level1_doc_name,
      c_level2_doc_name,
      c_level3_doc_name,
      a_level1_doc_sub_date,
      a_level2_doc_sub_date,
      a_level3_doc_sub_date,
      a_level1_doc_name,
      a_level2_doc_name,
      a_level3_doc_name,
      hsn_gstn_tax,
    } = form;

    // if (!hsn_gstn_tax) {
    //   toast.warning("Please check the HSN code, GSTIN, Tax rate is as per PO!");
    //   return;
    // }
    // if (total_price !== net_claim_amount) {
    //   toast.warning("Total price and net claim amount should be equal!");
    //   return;
    // }
    let fDToSend = new FormData();
    fDToSend.append("btn_num", null);
    fDToSend.append("purchasing_doc_no", id);
    fDToSend.append("invoice_no", invoice_no);
    fDToSend.append("invoice_value", invoice_value);
    fDToSend.append("debit_note", debit_note);
    fDToSend.append("credit_note", credit_note);
    fDToSend.append("net_claim_amount", net_claim_amount);
    fDToSend.append("net_with_gst", net_with_gst);
    fDToSend.append("cgst", cgst);
    fDToSend.append("sgst", sgst);
    fDToSend.append("igst", igst || "");
    fDToSend.append("net_claim_amt_gst", net_claim_amt_gst || "");
    fDToSend.append("updated_by", updated_by);
    fDToSend.append("created_at", created_at);
    fDToSend.append("created_by_id", user.vendor_code);
    fDToSend.append("vendor_code", vendor_code);
    fDToSend.append("btn_type", btn_type);
    fDToSend.append("status", "SUBMITED");
    fDToSend.append(
      "c_level1_doc_sub_date",
      convertToEpoch(new Date(c_level1_doc_sub_date))
    );
    fDToSend.append(
      "c_level2_doc_sub_date",
      convertToEpoch(new Date(c_level2_doc_sub_date))
    );
    fDToSend.append(
      "c_level3_doc_sub_date",
      convertToEpoch(new Date(c_level3_doc_sub_date))
    );
    fDToSend.append(
      "a_level1_doc_sub_date",
      convertToEpoch(new Date(a_level1_doc_sub_date))
    );
    fDToSend.append(
      "a_level2_doc_sub_date",
      convertToEpoch(new Date(a_level2_doc_sub_date))
    );
    fDToSend.append(
      "a_level3_doc_sub_date",
      convertToEpoch(new Date(a_level3_doc_sub_date))
    );

    if (invoice_filename) {
      fDToSend.append("invoice_filename", invoice_filename);
    }
    if (e_invoice_filename) {
      fDToSend.append("e_invoice_filename", e_invoice_filename);
    }
    if (debit_credit_filename) {
      fDToSend.append("debit_credit_filename", debit_credit_filename);
    }
    if (c_level1_doc_name) {
      fDToSend.append("c_level1_doc_name", c_level1_doc_name);
    }
    if (c_level2_doc_name) {
      fDToSend.append("c_level2_doc_name", c_level2_doc_name);
    }
    if (c_level3_doc_name) {
      fDToSend.append("c_level3_doc_name", c_level3_doc_name);
    }
    if (a_level1_doc_name) {
      fDToSend.append("a_level1_doc_name", a_level1_doc_name);
    }
    if (a_level2_doc_name) {
      fDToSend.append("a_level2_doc_name", a_level2_doc_name);
    }
    if (a_level3_doc_name) {
      fDToSend.append("a_level3_doc_name", a_level3_doc_name);
    }

    console.log("fDToSend", fDToSend);

    const response = await apiCallBack(
      "POST",
      "po/btn/submitAdvBillHybrid",
      fDToSend,
      token
    );

    if (response?.status) {
      toast.success(response?.message);
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
