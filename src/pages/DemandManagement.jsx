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

const DemandManagement = () => {
  const [isPopup, setIsPopup] = useState(false);
  const [data, setData] = useState([]);
  const [lineItemData, setLineItemData] = useState([]);
  const { id } = useParams();

  const { user, token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    remarks: "",
    po_line_iten_no: "",
    raised_quantity: "",
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
  console.log(data);

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

  useEffect(() => {
    getData();
    getPOLineItemData();
  }, [id, token]);

  const actionHandler = async (flag) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("purchasing_doc_no", id);
      formDataToSend.append("remarks", formData.remarks);

      const response = await apiCallBack(
        "POST",
        "po/inspectionCallLetter",
        formDataToSend,
        token
      );

      if (response?.status) {
        toast.success("Inspection call letter uploaded successfully");
        setIsPopup(false);
        getData();
      } else {
        toast.error("Failed to upload inspection call letter");
      }
    } catch (error) {
      console.error("Error uploading inspection call letter:", error);
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
                                      <td className="">{data?.line_item_no}</td>
                                      <td className="">
                                        {item.updated_by} ({item.created_by_id})
                                      </td>
                                      <td className="">
                                        {item.file_type_name}
                                      </td>
                                      <td className="">{item.remarks}</td>
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
                      value={formData?.po_line_iten_no}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          po_line_iten_no: e.target.value,
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
                      value={formData?.raised_quantity}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          raised_quantity: e.target.value,
                        })
                      }
                    />
                    <p>Available Amount: 500AUM</p>
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
