import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiCallBack } from "../utils/fetchAPIs";
import { toast } from "react-toastify";
import { USER_PPNC_DEPARTMENT } from "../constants/userConstants";
import { checkTypeArr } from "../utils/smallFun";
import { convertToEpoch } from "../utils/getDateTimeNow";
import ReactDatePicker from "react-datepicker";

const DemandManagement = () => {
  const [isPopup, setIsPopup] = useState(false);
  const [data, setData] = useState([]);
  const [lineItemData, setLineItemData] = useState([]);
  const [availableAmount, setAvailableAmount] = useState(null);
  const { id } = useParams();

  const { user, token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    remarks: "",
    line_item_no: "",
    request_amount: "",
    delivery_date: "",
  });

  const getData = async () => {
    try {
      const data = await apiCallBack(
        "GET",
        `po/demandeManagement/list?poNo=${id}`,
        null,
        token
      );
      if (data?.status) {
        setData(data?.data);
      }
    } catch (error) {
      console.error("Error fetching drawing list:", error);
    }
  };

  const getPOLineItemData = async () => {
    try {
      const data = await apiCallBack("GET", `po/details?id=${id}`, null, token);
      if (data?.status) {
        let lineItem = data?.data[0]?.materialResult;
        setLineItemData(lineItem);
      }
    } catch (error) {
      console.error("Error fetching WDC list:", error);
    }
  };

  const getAvailableAmount = async (item) => {
    try {
      const data = await apiCallBack(
        "GET",
        `po/demandeManagement/getRestAmount?po_no=${id}&line_item_no=${item}`,
        null,
        token
      );
      if (data?.status) {
        setAvailableAmount(data?.data?.rest_amount);
      }
    } catch (error) {
      console.error("Error fetching WDC list:", error);
    }
  };

  useEffect(() => {
    getData();
    getPOLineItemData();
  }, [id, token]);

  useEffect(() => {
    if (formData?.line_item_no !== "") {
      getAvailableAmount(formData?.line_item_no);
    }
  }, [formData?.line_item_no]);

  console.log(formData?.delivery_date);

  const actionHandler = async (flag) => {
    try {
      const { remarks, line_item_no, request_amount, delivery_date } = formData;
      if (
        remarks.trim() === "" ||
        line_item_no.trim() === "" ||
        request_amount.trim() === "" ||
        delivery_date === ""
      ) {
        return toast.warn("All fields are required!");
      }
      if (request_amount > availableAmount) {
        return toast.warn(
          "Raised requeste quantity should be less than or equal to available quantity!"
        );
      }
      const formObj = {
        purchasing_doc_no: id,
        line_item_no: line_item_no,
        request_amount: request_amount,
        delivery_date: convertToEpoch(delivery_date),
        remarks: remarks,
      };

      const response = await apiCallBack(
        "POST",
        "po/demandeManagement/insert",
        formObj,
        token
      );

      if (response?.status) {
        toast.success(response?.message);
        setIsPopup(false);
        setFormData({
          remarks: "",
          line_item_no: "",
          request_amount: "",
          delivery_date: "",
        });
        getData();
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"Demand Management"} id={id} />
            <div className="content d-flex flex-column flex-column-fluid">
              <div className="post d-flex flex-column-fluid">
                <div className="container">
                  <div className="row g-5 g-xl-8">
                    <div className="col-12">
                      <div className="screen_header">
                        {user?.department_id === USER_PPNC_DEPARTMENT && (
                          <button
                            onClick={() => setIsPopup(true)}
                            className="btn fw-bold btn-primary"
                          >
                            ACTION
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="card-body p-3">
                        <div className="tab-content">
                          <div className="table-responsive">
                            <table className="table table-striped table-bordered table_height">
                              <thead>
                                <tr className="border-0">
                                  <th>DateTime </th>
                                  <th>PO Line Item </th>
                                  <th>Updated By</th>
                                  <th>Raised Quantity</th>
                                  <th>Delivery Date</th>
                                  <th className="min-w-150px">Remarks</th>
                                </tr>
                              </thead>
                              <tbody style={{ maxHeight: "100%" }}>
                                {checkTypeArr(data) &&
                                  data.map((item, index) => (
                                    <tr key={index}>
                                      <td className="table_center">
                                        {item?.created_at &&
                                          new Date(
                                            item?.created_at
                                          ).toLocaleString()}
                                      </td>
                                      <td>{item?.line_item_no}</td>
                                      <td>{item.updated_by}</td>
                                      <td>{item.request_amount}</td>
                                      <td>
                                        {item.delivery_date &&
                                          new Date(
                                            item.delivery_date
                                          ).toLocaleString()}
                                      </td>
                                      <td>{item.remarks}</td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
      {user?.department_id === USER_PPNC_DEPARTMENT && (
        <div className={isPopup ? "popup active" : "popup"}>
          <div className="card card-xxl-stretch mb-5 mb-xxl-8">
            <div className="card-header border-0 pt-5 pb-3">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">
                  Take Your Action
                </span>
              </h3>
              <button
                className="btn fw-bold btn-danger"
                onClick={() => setIsPopup(false)}
              >
                Close
              </button>
            </div>
            <form>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">
                      PO Line Item <span className="red">*</span>{" "}
                    </label>
                    <select
                      name=""
                      id=""
                      className="form-select"
                      value={formData?.line_item_no}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          line_item_no: e.target.value,
                        })
                      }
                    >
                      <option value="">Choose PO Line Item</option>
                      {checkTypeArr(lineItemData) &&
                        lineItemData.map((item, i) => {
                          return (
                            <option value={item?.material_item_number} key={i}>
                              {item?.material_item_number}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Raised Quantity <span className="red">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData?.request_amount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          request_amount: e.target.value,
                        })
                      }
                    />
                    <p>Available Qunatity: {availableAmount}</p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Delivery Date <span className="red">*</span>{" "}
                    </label>
                    {/* <input
                      type="date"
                      className="form-control"
                      value={formData?.delivery_date}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          delivery_date: e.target.value,
                        })
                      }
                    /> */}
                    <ReactDatePicker
                      selected={formData?.delivery_date}
                      onChange={(date) =>
                        setFormData({
                          ...formData,
                          delivery_date: date,
                        })
                      }
                      dateFormat="dd/MM/yyyy"
                      className="form-control"
                      placeholderText="DD/MM/YYYY"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Remarks</label>&nbsp;&nbsp;
                    <span className="mandatorystart">*</span>
                    <textarea
                      name=""
                      id=""
                      rows="4"
                      className="form-control"
                      value={formData?.remarks}
                      onChange={(e) =>
                        setFormData({ ...formData, remarks: e.target.value })
                      }
                    ></textarea>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3 d-flex justify-content-between">
                    <button
                      onClick={() => actionHandler("SUBMITTED")}
                      className="btn fw-bold btn-primary"
                      type="button"
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DemandManagement;
