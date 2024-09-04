import React, { useEffect, useState } from "react";
import Select from "react-select";
import Footer from "../../components/Footer";
import BTNServiceVendor from "../../components/BTNServiceVendor";
import { FaCaretLeft } from "react-icons/fa";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { initialDataService, initialEmpData } from "../../data/btnData";
import { useSelector } from "react-redux";
import { apiCallBack } from "../../utils/fetchAPIs";
import DynamicButton from "../../Helpers/DynamicButton";
import { toast } from "react-toastify";
import { actionHandlerServiceByEmp } from "../../Helpers/BTNChecklist";
import { inputOnWheelPrevent } from "../../utils/inputOnWheelPrevent";
import {
  calculateLDByDate,
  calculateNetPayService,
  checkTypeArr,
  inputTypeChange,
} from "../../utils/smallFun";
import { TYPE_GRN, TYPE_SERVICE } from "../../constants/BTNContants";

const ServiceContractBillsEdit = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const { state } = useLocation();
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [form, setForm] = useState(initialDataService);
  const [billCA, setBillCA] = useState();

  const getData = async () => {
    const d = await apiCallBack(
      "GET",
      `po/btn/initServiceHybrid?poNo=${id}`,
      null,
      token
    );
    if (d?.status) {
      setData((prevData) => ({ ...prevData, initial: d?.data }));
    }
  };

  const getForm = async (btn) => {
    const d = await apiCallBack(
      "GET",
      `po/btn/getServiceBtnData?type=sbtn-details&btn_num=${btn}`
    );
    if (d?.status) {
      setForm(d?.data);
      checkWDCDetails(d?.data?.wdc_number);
    }
  };

  const checkWDCDetails = async (wdc_number) => {
    const d = await apiCallBack(
      "GET",
      `po/btn/getWdcInfoServiceHybrid?reference_no=${wdc_number}`,
      null,
      token
    );
    if (d?.status) {
      setData((prevData) => ({
        ...prevData,
        wdcDetails: d?.data,
      }));
      getData();
    }
  };

  useEffect(() => {
    if (state?.btn_num && state?.bill_ca) {
      getForm(state.btn_num);
      setBillCA(state.bill_ca);
    }
    // console.log("state", state);
  }, [state]);

  // CERTIFING AUTHORITY
  const [empForm, setEmpForm] = useState(initialEmpData);
  const [emp, setEmp] = useState([]);
  const [showRemarks, setShowRemarks] = useState(false);
  const [remarks, setRemarks] = useState("");

  const getEmp = async () => {
    try {
      const data = await apiCallBack(
        "GET",
        `po/btn/getFinanceEmpList`,
        null,
        token
      );
      if (data?.status) {
        let options = data.data.map((item, index) => {
          return {
            value: item.usercode,
            label: `${item.empname} (${item.usercode})`,
          };
        });
        setEmp(options);
      }
    } catch (error) {
      console.error("Error fetching Employee list:", error);
    }
  };

  useEffect(() => {
    getEmp();
  }, []);

  useEffect(() => {
    if (state) {
      setEmpForm({ ...empForm, btn_num: state?.btn_num });
    }
  }, [state]);

  const checkValue = async (type) => {
    if (!empForm?.number || !empForm.number === "") {
      return toast.warn("Please enter Service Entry/GRN Number");
    }
    const d = await apiCallBack(
      "GET",
      `po/btn/getServiceBtnData?type=${type}&grn=${empForm?.number}&po=${id}`,
      null,
      token
    );
    if (d?.status) {
      setEmpForm({ ...empForm, value: d?.data?.total_price });
    } else {
      toast.error(d?.message);
    }
  };

  const rejectBTN = async () => {
    try {
      let payload = {
        btn_num: state,
        status: "REJECTED",
        rejectedMessage: remarks,
      };
      const response = await apiCallBack(
        "POST",
        "po/btn/submitSBtnByCAuthorty",
        payload,
        token
      );
      if (response.status) {
        toast.success(response.message || "Rejected successfully");
        navigate(`/invoice-and-payment-process/${id}`);
      } else {
        toast.error(response.message || "Error rejecting the BTN");
      }
    } catch (error) {
      console.error("Error rejecting the BTN:", error);
      toast.error("Error rejecting the BTN");
    }
  };

  useEffect(() => {
    if (checkTypeArr(data?.wdcDetails?.line_item_array) || empForm?.value) {
      let estimatedLD = 0;
      for (let item of data?.wdcDetails?.line_item_array) {
        let ld = calculateLDByDate(
          item?.delay,
          parseFloat(Number(item?.po_rate) * Number(item?.claim_qty)).toFixed(
            2
          ),
          0.5
        );
        item.lineLD = ld;
        estimatedLD += ld;
      }
      console.log("empForm?.max_ld", empForm?.max_ld);
      console.log("empForm?.value", empForm?.value);
      let max_penalty_amount =
        (Number(empForm?.value) * Number(empForm?.max_ld)) / 100;
      console.log("max_penalty_amount", max_penalty_amount);
      estimatedLD = Math.min(estimatedLD, max_penalty_amount);
      setEmpForm({ ...empForm, estimatedLD });
    }
  }, [data?.wdcDetails?.line_item_array, empForm?.value, empForm?.max_ld]);

  useEffect(() => {
    let net = empForm?.value;
    if (net) {
      let report = calculateNetPayService(
        net,
        empForm?.estimatedLD,
        empForm?.retension_rate,
        empForm?.other_deduction
      );
      // console.log("net_pay", report?.net_pay);
      setEmpForm({
        ...empForm,
        total_deduction: report?.deduct,
        net_payable_amount: report?.net_pay,
        retension_amount: report?.retension,
      });
    }
  }, [
    empForm?.value,
    empForm?.estimatedLD,
    empForm?.retension_rate,
    empForm?.other_deduction,
  ]);

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"Service Contract Bills"} id={id} />
            <div className="content d-flex flex-column flex-column-fluid">
              <div className="post d-flex flex-column-fluid">
                <div className="container">
                  <form>
                    <div className="row g-5 g-xl-8">
                      <div className="col-12">
                        <div className="card">
                          <h3 className="d-flex align-items-center m-3">
                            <button
                              className="btn_icon me-3"
                              type="button"
                              onClick={() =>
                                navigate(`/invoice-and-payment-process/${id}`)
                              }
                            >
                              <FaCaretLeft className="fs-20" />
                            </button>{" "}
                            Bills for Service PO:
                          </h3>
                          <BTNServiceVendor data={data} form={form} />
                        </div>
                      </div>
                      {user?.vendor_code === billCA && (
                        <div className="col-12">
                          <div className="card">
                            <h3 className="m-3">
                              ENTRY BY CERTIFYING AUTHORITY:
                            </h3>
                            <div className="card-body p-3">
                              <div className="tab-content">
                                <div className="table-responsive">
                                  <table className="table table-striped table-bordered table_height">
                                    <tbody style={{ maxHeight: "100%" }}>
                                      <tr>
                                        <td>Finance Authority</td>
                                        <td className="btn_value">
                                          <Select
                                            className="basic-single w-100"
                                            classNamePrefix="select"
                                            isClearable={true}
                                            isSearchable={true}
                                            name="emp"
                                            id="emp"
                                            options={emp}
                                            value={
                                              emp.filter(
                                                (item) =>
                                                  item.value ===
                                                  empForm?.finance_authority
                                              )[0]
                                            }
                                            onChange={(val) =>
                                              setEmpForm({
                                                ...empForm,
                                                finance_authority: val
                                                  ? val.value
                                                  : null,
                                              })
                                            }
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>BTN Number:</td>
                                        <td className="btn_value">
                                          <b>{empForm?.btn_num}</b>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Choose Type</td>
                                        <td className="btn_value">
                                          <select
                                            name="type"
                                            id=""
                                            className="form-select"
                                            onChange={(e) =>
                                              inputTypeChange(
                                                e,
                                                empForm,
                                                setEmpForm
                                              )
                                            }
                                          >
                                            <option value="">
                                              Choose Type
                                            </option>
                                            <option value={TYPE_SERVICE}>
                                              Service Entry Sheet No
                                            </option>
                                            <option value={TYPE_GRN}>
                                              GRN No
                                            </option>
                                          </select>
                                        </td>
                                      </tr>
                                      {empForm?.type &&
                                        empForm?.type !== "" && (
                                          <>
                                            <tr>
                                              <td>
                                                {empForm?.type === TYPE_SERVICE
                                                  ? "Service Entry Sheet No"
                                                  : empForm?.type === TYPE_GRN
                                                  ? "GRN Number"
                                                  : ""}
                                              </td>

                                              <td>
                                                <div className="btn_value">
                                                  <input
                                                    type="text"
                                                    className="form-control me-3"
                                                    name="number"
                                                    value={empForm?.number}
                                                    placeholder={
                                                      empForm?.type ===
                                                      TYPE_SERVICE
                                                        ? "Service Entry Sheet No"
                                                        : empForm?.type ===
                                                          TYPE_GRN
                                                        ? "GRN Number"
                                                        : ""
                                                    }
                                                    onChange={(e) =>
                                                      setEmpForm({
                                                        ...empForm,
                                                        number: e.target.value,
                                                      })
                                                    }
                                                  />
                                                  <DynamicButton
                                                    label="CHECK"
                                                    onClick={() =>
                                                      checkValue(
                                                        empForm?.type ===
                                                          TYPE_SERVICE
                                                          ? "service-entry"
                                                          : empForm?.type ===
                                                            TYPE_GRN
                                                          ? "icgrn"
                                                          : ""
                                                      )
                                                    }
                                                    className="btn btn-primary btn-sm m-4"
                                                  />
                                                </div>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>
                                                {empForm?.type === TYPE_SERVICE
                                                  ? "Service Entry Sheet Value: "
                                                  : empForm?.type === TYPE_GRN
                                                  ? "GRN Value: "
                                                  : ""}
                                              </td>
                                              <td>
                                                <b>{empForm?.value}</b>
                                              </td>
                                            </tr>
                                          </>
                                        )}
                                    </tbody>
                                  </table>
                                  {empForm?.value && empForm?.value !== "" ? (
                                    <>
                                      <table className="table table-striped table-bordered table_height">
                                        <thead>
                                          <tr>
                                            <th>PO Line Item No</th>
                                            <th>Service Code</th>
                                            <th>Description</th>
                                            <th>UOM</th>
                                            <th>Claim Qty</th>
                                            <th>PO Rate</th>
                                            <th>Total Claim</th>
                                            <th>Delay</th>
                                            <th>LD</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {checkTypeArr(
                                            data?.wdcDetails?.line_item_array
                                          ) &&
                                            data?.wdcDetails?.line_item_array.map(
                                              (item, i) => (
                                                <tr key={i}>
                                                  <td>{item?.line_item_no}</td>
                                                  <td>{item?.service_code}</td>
                                                  <td>{item?.description}</td>
                                                  <td>{item?.unit}</td>
                                                  <td>{item?.claim_qty}</td>
                                                  <td>{item?.po_rate}</td>
                                                  <td>
                                                    {parseFloat(
                                                      Number(item?.po_rate) *
                                                        Number(item?.claim_qty)
                                                    ).toFixed(2)}
                                                  </td>
                                                  <td>{item?.delay}</td>
                                                  <td>{item?.lineLD}</td>
                                                </tr>
                                              )
                                            )}
                                        </tbody>
                                      </table>
                                      <table className="table table-striped table-bordered table_height">
                                        <tbody>
                                          <tr>
                                            <td>Max LD</td>
                                            <td>
                                              <select
                                                name="max_ld"
                                                id=""
                                                className="form-select"
                                                onChange={(e) =>
                                                  inputTypeChange(
                                                    e,
                                                    empForm,
                                                    setEmpForm
                                                  )
                                                }
                                              >
                                                <option value="">
                                                  Choose Max LD
                                                </option>
                                                <option value="5">5%</option>
                                                <option value="10">10%</option>
                                              </select>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>Estimated Total LD</td>
                                            <td>{empForm?.estimatedLD}</td>
                                          </tr>
                                          <tr>
                                            <td>Retension if any (%)</td>
                                            <td className="btn_value">
                                              <input
                                                type="number"
                                                name="retension_rate"
                                                className="form-control"
                                                value={empForm?.retension_rate}
                                                onChange={(e) => {
                                                  let value = e.target.value;
                                                  if (value > 100) value = 100;
                                                  if (value < 0) value = 0;
                                                  setEmpForm({
                                                    ...empForm,
                                                    retension_rate: value,
                                                  });
                                                }}
                                                onWheel={inputOnWheelPrevent}
                                                min="0"
                                                max="100"
                                              />
                                              <span className="ms-1">%</span>
                                              <span className="ms-2">
                                                Retension Amount:{" "}
                                                {empForm?.retension_amount}
                                              </span>
                                            </td>
                                          </tr>

                                          <tr>
                                            <td>Remarks for Retension</td>
                                            <td>
                                              <input
                                                type="text"
                                                name="retension_remarks"
                                                className="form-control"
                                                value={
                                                  empForm?.retension_remarks
                                                }
                                                onChange={(e) =>
                                                  inputTypeChange(
                                                    e,
                                                    empForm,
                                                    setEmpForm
                                                  )
                                                }
                                              />
                                            </td>
                                          </tr>

                                          <tr>
                                            <td>Other Deduction</td>
                                            <td className="btn_value">
                                              <input
                                                type="number"
                                                name="other_deduction"
                                                className="form-control"
                                                value={empForm?.other_deduction}
                                                onChange={(e) =>
                                                  inputTypeChange(
                                                    e,
                                                    empForm,
                                                    setEmpForm
                                                  )
                                                }
                                                onWheel={inputOnWheelPrevent}
                                              />
                                            </td>
                                          </tr>

                                          <tr>
                                            <td>Deduction Remarks</td>
                                            <td>
                                              <input
                                                type="text"
                                                name="deduction_remarks"
                                                className="form-control"
                                                value={
                                                  empForm?.deduction_remarks
                                                }
                                                onChange={(e) =>
                                                  inputTypeChange(
                                                    e,
                                                    empForm,
                                                    setEmpForm
                                                  )
                                                }
                                              />
                                            </td>
                                          </tr>

                                          <tr>
                                            <td>Total deductions</td>
                                            <td>
                                              <b>
                                                &#8377;{" "}
                                                {isNaN(empForm?.total_deduction)
                                                  ? 0
                                                  : empForm?.total_deduction}
                                              </b>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>Net payable amount</td>
                                            <td>
                                              <b>
                                                &#8377;{" "}
                                                {isNaN(
                                                  empForm?.net_payable_amount
                                                )
                                                  ? 0
                                                  : empForm?.net_payable_amount}
                                              </b>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </>
                                  ) : (
                                    <table className="table table-striped table-bordered table_height">
                                      <thead>
                                        <tr>
                                          <th className="text-center">
                                            Please check the Service Entry Value
                                            / GRN Value
                                          </th>
                                        </tr>
                                      </thead>
                                    </table>
                                  )}
                                </div>
                                <p>
                                  Certified that Invoice has been verified w.r.t
                                  PO and recommanded for release of payment
                                  subject to satutatory deduction.
                                </p>
                                <div className="row">
                                  <div className="col-6 text-start">
                                    <DynamicButton
                                      label="Approved"
                                      onClick={() =>
                                        actionHandlerServiceByEmp(
                                          empForm,
                                          setEmpForm,
                                          initialEmpData,
                                          navigate,
                                          id,
                                          token,
                                          form,
                                          data
                                        )
                                      }
                                      className="btn fw-bold btn-primary me-3"
                                    />
                                    <button
                                      className="btn btn-sm btn-primary me-3"
                                      onClick={() =>
                                        navigate(
                                          `/invoice-and-payment-process/${id}`
                                        )
                                      }
                                    >
                                      BACK
                                    </button>
                                  </div>
                                  <div className="col-6 text-end">
                                    {showRemarks ? (
                                      <>
                                        <input
                                          type="text"
                                          placeholder="Enter remarks"
                                          value={remarks}
                                          onChange={(e) =>
                                            setRemarks(e.target.value)
                                          }
                                          className="form-control mb-2"
                                        />
                                        <DynamicButton
                                          label="Submit Rejection"
                                          className="btn fw-bold btn-danger"
                                          onClick={rejectBTN}
                                        />
                                      </>
                                    ) : (
                                      <button
                                        className="btn fw-bold btn-danger"
                                        onClick={() => setShowRemarks(true)}
                                      >
                                        REJECT
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceContractBillsEdit;
