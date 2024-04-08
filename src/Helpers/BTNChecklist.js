import { toast } from "react-toastify";
import { apiCallBack } from "../utils/fetchAPIs";

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
      invoice_no,
      invoice_filename,
      invoice_value,
      e_invoice_no,
      e_invoice_filename,
      debit_note,
      credit_note,
      net_claim_amount,
      debit_credit_filename,
      gate_entry_no,
      gate_entry_date,
      get_entry_filename,
      grn_no_1,
      grn_no_2,
      grn_no_3,
      grn_no_4,
      icgrn_no_1,
      icgrn_no_2,
      icgrn_no_3,
      icgrn_no_4,
      total_icgrn_value,
      hsn_gstn_icgrn,
      ld_gate_entry_date,
      ld_contractual_date,
      c_sdbg_filename,
      demand_raise_filename,
      pbg_filename,
    } = form;
    const fDToSend = new FormData();
    fDToSend.append("purchasing_doc_no", id);
    fDToSend.append("invoice_no", invoice_no);
    fDToSend.append("invoice_value", invoice_value);
    fDToSend.append("e_invoice_no", e_invoice_no);
    fDToSend.append("debit_note", debit_note);
    fDToSend.append("credit_note", credit_note);
    fDToSend.append("net_claim_amount", net_claim_amount);
    fDToSend.append("gate_entry_no", gate_entry_no);
    fDToSend.append("gate_entry_date", gate_entry_date);
    fDToSend.append("grn_no_1", grn_no_1);
    fDToSend.append("grn_no_2", grn_no_2);
    fDToSend.append("grn_no_3", grn_no_3);
    fDToSend.append("grn_no_4", grn_no_4);
    fDToSend.append("icgrn_no_1", icgrn_no_1);
    fDToSend.append("icgrn_no_2", icgrn_no_2);
    fDToSend.append("icgrn_no_3", icgrn_no_3);
    fDToSend.append("icgrn_no_4", icgrn_no_4);
    fDToSend.append("total_icgrn_value", total_icgrn_value);
    fDToSend.append("hsn_gstn_icgrn", hsn_gstn_icgrn);
    fDToSend.append("ld_gate_entry_date", ld_gate_entry_date);
    fDToSend.append("ld_contractual_date", ld_contractual_date);
    fDToSend.append("ld_gate_entry_date", ld_gate_entry_date);
    if (invoice_filename) {
      fDToSend.append("invoice_filename", invoice_filename);
    }
    if (e_invoice_filename) {
      fDToSend.append("e_invoice_filename", e_invoice_filename);
    }
    if (debit_credit_filename) {
      fDToSend.append("debit_credit_filename", debit_credit_filename);
    }
    if (get_entry_filename) {
      fDToSend.append("get_entry_filename", get_entry_filename);
    }
    if (c_sdbg_filename) {
      fDToSend.append("c_sdbg_filename", c_sdbg_filename);
    }
    if (demand_raise_filename) {
      fDToSend.append("demand_raise_filename", demand_raise_filename);
    }
    if (pbg_filename) {
      fDToSend.append("pbg_filename", pbg_filename);
    }
    const response = await apiCallBack(
      "POST",
      "po/btn/BillsMaterialHybrid",
      fDToSend,
      token
    );
    console.log("response", response);
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
  try {
    const response = await apiCallBack(
      "POST",
      "po/btn/BillsMaterialHybridByDO",
      doForm,
      token
    );
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
