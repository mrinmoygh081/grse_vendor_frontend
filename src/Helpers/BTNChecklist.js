import { toast } from "react-toastify";
import { apiCallBack } from "../utils/fetchAPIs";
import { convertToEpoch } from "../utils/getDateTimeNow";

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
      invoice_filename,
      invoice_value,
      e_invoice_no,
      e_invoice_filename,
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
    fDToSend.append("invoice_value", invoice_value);
    fDToSend.append("e_invoice_no", e_invoice_no);
    fDToSend.append("debit_note", debit_note);
    fDToSend.append("credit_note", credit_note);
    fDToSend.append("hsn_gstn_icgrn", hsn_gstn_icgrn);
    fDToSend.append("cgst", cgst);
    fDToSend.append("sgst", sgst);
    fDToSend.append("igst", igst);
    fDToSend.append("associated_po", JSON.stringify(associated_po));
    if (invoice_filename) {
      fDToSend.append("invoice_filename", invoice_filename);
    }
    if (e_invoice_filename) {
      fDToSend.append("e_invoice_filename", e_invoice_filename);
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
      return toast.warn("Please fill other decuction.");
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

export const actionHandlerServiceBTN = async (
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
      assigned_to,
      invoice_no,
      invoice_filename,
      invoice_value,
      e_invoice_no,
      gst_rate,
      e_invoice_filename,
      debit_note,
      credit_note,
      net_gross_claim_amount,
      total_amount,
      vendor_name,
      vendor_code,
      wdc_number,

      actual_start_date,
      actual_completion_date,
      esi_compliance_certified,
      pf_compliance_certified,

      debit_credit_filename,

      pbg_filename,
    } = form;
    if (!assigned_to || assigned_to === "") {
      return toast.warn("Please choose GRSE officer.");
    }
    const fDToSend = new FormData();
    fDToSend.append("assigned_to", assigned_to);
    fDToSend.append("purchasing_doc_no", id);
    fDToSend.append("vendor_name", vendor_name);
    fDToSend.append("vendor_code", vendor_code);
    fDToSend.append("wdc_number", wdc_number);
    fDToSend.append("invoice_no", invoice_no);
    fDToSend.append("invoice_value", invoice_value);
    fDToSend.append("e_invoice_no", e_invoice_no);
    fDToSend.append("debit_note", debit_note);
    fDToSend.append("credit_note", credit_note);
    fDToSend.append("credit_note", gst_rate);
    fDToSend.append("net_gross_claim_amount", net_gross_claim_amount);
    fDToSend.append("total_amount", total_amount);
    fDToSend.append("actual_work_start_date", actual_start_date);
    fDToSend.append("actual_work_completion_date", actual_completion_date);
    fDToSend.append("esi_compliance_certified", esi_compliance_certified);
    fDToSend.append("pf_compliance_certified", pf_compliance_certified);
    fDToSend.append("Wage_compliance_certified", "");

    if (invoice_filename) {
      fDToSend.append("invoice_filename", invoice_filename);
    }
    if (e_invoice_filename) {
      fDToSend.append("e_invoice_filename", e_invoice_filename);
    }
    if (debit_credit_filename) {
      fDToSend.append("debit_credit_filename", debit_credit_filename);
    }
    if (pbg_filename) {
      fDToSend.append("pbg", pbg_filename);
    }
    const response = await apiCallBack(
      "POST",
      "po/btn/submitBtnServiceHybrid",
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
      e_invoice_no,
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
    fDToSend.append("e_invoice_no", e_invoice_no);
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
