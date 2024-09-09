import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainHeader from "../../components/MainHeader";
import SidebarDashboard from "../../components/SidebarDashboard";
import Footer from "../../components/Footer";

import { FiSearch } from "react-icons/fi";

import "jspdf-autotable";
import * as XLSX from "xlsx";
import {
  APPROVED,
  FORWARD_TO_FINANCE,
  HOLD,
} from "../../constants/BGconstants";
import { clrLegend } from "../../utils/clrLegend";
import SkeletonLoader from "../../loader/SkeletonLoader";
import { poHandler } from "../../redux/slices/poSlice";
import { apiCallBack } from "../../utils/fetchAPIs";
import { formatDate } from "../../utils/getDateTimeNow";

const QapDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [paymentdata, setPaymentdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [error, setError] = useState(null);

  const createPayment = async () => {
    setLoading(true);
    try {
      const response = await apiCallBack("GET", "stat/QA", null, token);
      if (response?.status) {
        setPaymentdata(response.data);
      } else {
        setError("Error fetching payment data: " + response.message);
      }
    } catch (error) {
      setError("Error fetching payment data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDatee = (timestamp) => {
    if (!timestamp || timestamp === "0") return "";
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString("en-US");
  };

  useEffect(() => {
    if (token) createPayment();
  }, [token]);

  const handleRowClick = (poNumber) => {
    let po = {
      poNumber,
      // poType
    };
    dispatch(poHandler(po));
    navigate(`/qap/${poNumber}`);
  };

  const filteredData = paymentdata.filter((file) => {
    console.log(file.status === selectedStatus);
    console.log("selectedStatus", selectedStatus === "All");
    console.log("jkfld");
    return (
      ((file.bg_file_no &&
        file.bg_file_no.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (file.reference_no &&
          file.reference_no
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) ||
        (file.vendor_name &&
          file.vendor_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (file.assigned_to &&
          file.assigned_to.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (file.purchasing_doc_no &&
          file.purchasing_doc_no
            .toLowerCase()
            .includes(searchQuery.toLowerCase()))) &&
      (selectedStatus === "All" || file.status === selectedStatus)
    );
  });
  console.log("filteredData", filteredData);
  console.log("paymentdata", paymentdata);
  console.log("selectedStatus", selectedStatus);

  const generateExcel = () => {
    const data = [
      [
        "Sl.NO.",
        "QAP NO.",
        "PO Number",
        "Material Description",
        "Vendor Name",
        "Assigned To",
        "Assigned on",
        "Accepted on",
        "Current status",
        "Status Date",
        "Time taken",
      ],
      ...filteredData.map((file, index) => [
        index + 1,
        file.reference_no,
        file.bg_file_no,
        file.purchasing_doc_no,
        "",
        file.vendor_name,
        file.assigned_to,
        formatDatee(file.bg_date),
        formatDatee(file.bg_recived_date),
        file.status,
        formatDate(file.created_at),
        formatDatee(file.bg_recived_date),
      ]),
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Po Details");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(excelBlob);
    downloadLink.download = "qa_dashboard.xlsx";
    downloadLink.click();
  };

  return (
    <div className="d-flex flex-column flex-row-fluid">
      <div className="page d-flex flex-row flex-column-fluid">
        {/* <SidebarDashboard /> */}
        <div className="d-flex flex-column flex-row-fluid">
          <MainHeader title="BG Dashboard" id={id} />
          <div className="card">
            <div className="searchfun">
              <div className="card_headline">
                <div>
                  <div className="search_top">
                    <label htmlFor="">Search</label>
                  </div>
                  <div className="input_search">
                    <input
                      type="text"
                      className="form-control"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                    />
                    <button className="search_btn">
                      <FiSearch />
                    </button>
                  </div>
                </div>
              </div>
              <div className="card_headline">
                <div>
                  <button
                    onClick={generateExcel}
                    className="btn fw-bold btn-primary"
                  >
                    Download QA
                  </button>
                </div>
              </div>
              <div className="card_headline">
                <div>
                  <div className="search_top">
                    <label htmlFor="">Select Current Status</label>
                  </div>
                  <div className="input_search">
                    <select
                      className="form-select"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="All">All</option>

                      <option value="REJECTED">REJECTED</option>
                      <option value="SUBMITTED">SUBMITTED</option>
                      <option value="APPROVED">APPROVED</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="card_headline">
                <div>
                  <div className="search_top">
                    <label htmlFor="">Advance Search</label>
                  </div>
                  <div className="input_search">
                    <select className="form-select">
                      <option value="All">All</option>

                      <option value="ascending ">Ascending </option>
                      <option value="descending ">Descending </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="table-info">
              {loading ? (
                <SkeletonLoader />
              ) : (
                <tr className="row-count">
                  <td colSpan={10}>
                    {" "}
                    Number of AG {filteredData.length}{" "}
                    {filteredData.length === 1 ? "row" : "rows"}
                  </td>
                </tr>
              )}
            </div> */}
            <div className="table-responsive">
              <table className="table table-striped table-bordered table_height">
                <thead>
                  <tr className="row-count">
                    <td colSpan={11} style={{ textAlign: "left" }}>
                      {" "}
                      Number of QA {filteredData.length}{" "}
                      {filteredData.length === 1 ? "" : ""}
                    </td>
                  </tr>
                  <tr className="border-0">
                    <th className="min-w-150px">QAP NO.</th>
                    <th className="min-w-150px">PO Number</th>
                    <th className="min-w-150px">Material Description</th>
                    <th className="min-w-150px">Vendor Name</th>
                    <th className="min-w-150px">Assigned To</th>
                    <th className="min-w-150px">Assigned on</th>
                    <th className="min-w-150px">Accepted on</th>
                    <th className="min-w-150px">Current status</th>
                    <th className="min-w-150px">Status Date</th>
                    <th className="min-w-150px">Time taken</th>
                  </tr>
                </thead>
                <tbody style={{ maxHeight: "100%" }}>
                  {loading ? (
                    <>
                      <tr></tr>
                      <tr>
                        <td colSpan={10}>
                          <SkeletonLoader col={11} row={6} />
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      {filteredData.map((file, index) => (
                        <tr key={index}>
                          <td>
                            <button
                              onClick={() =>
                                handleRowClick(file.purchasing_doc_no)
                              }
                              className="btn_simple"
                            >
                              <u>{file.reference_no}</u>
                            </button>
                          </td>

                          <td>{file.purchasing_doc_no}</td>
                          <td>{""}</td>
                          <td>{file.vendor_name}</td>
                          <td>{file.assigned_to}</td>
                          <td>{file.assigned_from}</td>
                          <td>{file.accepted_on}</td>
                          <td className={`${clrLegend(file?.status)} bold`}>
                            {file.status}
                          </td>
                          <td>{formatDate(file.created_at)}</td>
                          <td>{formatDatee(file.bg_recived_date)}</td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default QapDashboard;
