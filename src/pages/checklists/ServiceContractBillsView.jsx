import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import { checkTypeArr } from "../../utils/smallFun";
import { apiCallBack } from "../../utils/fetchAPIs";
import { FaCaretLeft } from "react-icons/fa";
import BTNServiceVendor from "../../components/BTNServiceVendor";
import { initialDataService } from "../../data/btnData";

const ServiceContractBillsView = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { state } = useLocation();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [form, setForm] = useState(initialDataService);

  console.log("data: ", data);
  console.log("form: ", form);

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
    getForm(state);
  }, [state]);

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

                          {form?.btn_num && (
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
                                              <b>{form?.assign_to}</b>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>BTN Number:</td>
                                            <td className="btn_value">
                                              <b>{form?.btn_num}</b>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>{form?.type}</td>
                                            <td>
                                              <div className="btn_value">
                                                <b>{form?.number}</b>
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>{form?.type}</td>
                                            <td>
                                              <b>{form?.value}</b>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      {/* <table className="table table-striped table-bordered table_height">
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
                                                data?.wdcDetails
                                                  ?.line_item_array
                                              ) &&
                                                data?.wdcDetails?.line_item_array.map(
                                                  (item, i) => (
                                                    <tr key={i}>
                                                      <td>
                                                        {item?.line_item_no}
                                                      </td>
                                                      <td>
                                                        {item?.service_code}
                                                      </td>
                                                      <td>
                                                        {item?.description}
                                                      </td>
                                                      <td>{item?.unit}</td>
                                                      <td>{item?.claim_qty}</td>
                                                      <td>{item?.po_rate}</td>
                                                      <td>
                                                        {parseFloat(
                                                          Number(
                                                            item?.po_rate
                                                          ) *
                                                            Number(
                                                              item?.claim_qty
                                                            )
                                                        ).toFixed(2)}
                                                      </td>
                                                      <td>{item?.delay}</td>
                                                      <td>{item?.lineLD}</td>
                                                    </tr>
                                                  )
                                                )}
                                            </tbody>
                                          </table> */}
                                      <table className="table table-striped table-bordered table_height">
                                        <tbody>
                                          <tr>
                                            <td>Max LD</td>
                                            <td>
                                              <b>{form?.max_ld}</b>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>Estimated Total LD</td>
                                            <td>{form?.estimatedLD}</td>
                                          </tr>
                                          <tr>
                                            <td>Retension if any (%)</td>
                                            <td className="btn_value">
                                              <b>{form?.retension_rate}</b>
                                              <span className="ms-1">%</span>
                                              <span className="ms-2">
                                                Retension Amount:{" "}
                                                {form?.retension_amount}
                                              </span>
                                            </td>
                                          </tr>

                                          <tr>
                                            <td>Remarks for Retension</td>
                                            <td>
                                              <b>{form?.retension_remarks}</b>
                                            </td>
                                          </tr>

                                          <tr>
                                            <td>Other Deduction</td>
                                            <td className="btn_value">
                                              <b>{form?.other_deduction}</b>
                                            </td>
                                          </tr>

                                          <tr>
                                            <td>Deduction Remarks</td>
                                            <td>
                                              <b>{form?.deduction_remarks}</b>
                                            </td>
                                          </tr>

                                          <tr>
                                            <td>Total deductions</td>
                                            <td>
                                              <b>
                                                &#8377; {form?.total_deduction}
                                              </b>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>Net payable amount</td>
                                            <td>
                                              <b>
                                                &#8377;{" "}
                                                {form?.net_payable_amount}
                                              </b>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    <p>
                                      Certified that Invoice has been verified
                                      w.r.t PO and recommanded for release of
                                      payment subject to satutatory deduction.
                                    </p>
                                    <div className="row">
                                      <div className="col-6 text-start">
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
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
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

export default ServiceContractBillsView;
