import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainHeader from "../components/MainHeader";
import SidebarDashboard from "../components/SidebarDashboard";
import Footer from "../components/Footer";
import { apiCallBack } from "../utils/fetchAPIs";
import { checkTypeArr } from "../utils/smallFun";
import { poHandler } from "../redux/slices/poSlice";
import { FiSearch } from "react-icons/fi";
import { FaFilePdf } from "react-icons/fa";
import SkeletonLoader from "../loader/SkeletonLoader";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { clrLegend } from "../utils/clrLegend";

const BTNfinance = () => {
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
      const response = await apiCallBack("POST", "stat/btn", null, token);
      if (response?.status) {
        setPaymentdata(response.data);
      } else {
        setError("Error creating invoice number: " + response.message);
      }
    } catch (error) {
      setError("Error creating invoice number: " + error.message);
    } finally {
      setLoading(false);
    }
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
    navigate(`/invoice-and-payment-process/${poNumber}`);
  };

  const handleViewInvoice = (invoiceFilename) => {
    const pdfUrl = `${process.env.REACT_APP_PDF_URL}/btns/${invoiceFilename}`;
    window.open(pdfUrl, "_blank");
  };

  const filteredData = paymentdata.filter(
    (file) =>
      ((file.btn_num &&
        file.btn_num.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (file.invoice_no &&
          file.invoice_no.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (file.purchasing_doc_no &&
          file.purchasing_doc_no
            .toLowerCase()
            .includes(searchQuery.toLowerCase()))) &&
      (selectedStatus === "All" || file.status === selectedStatus)
  );

  const generateExcel = () => {
    const data = [
      [
        "BTN Num",
        "Vendor Name",
        "Vendor Code",
        "PO No",
        "Invoice No",
        "Yard No",
        "Status",
      ],
      ...filteredData.map((file) => [
        file.btn_num,
        file.vendor_name,
        file.vendor_code,
        file.purchasing_doc_no,
        file.invoice_no,
        file.yard,
        file.status,
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
    downloadLink.download = "btn_dashboard.xlsx";

    downloadLink.click();
  };

  return (
    <div className="d-flex flex-column flex-row-fluid">
      <div className="page d-flex flex-row flex-column-fluid">
        {/* <SidebarDashboard /> */}
        <div className="d-flex flex-column flex-row-fluid">
          <MainHeader title="BTN Dashboard" id={id} />
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
                    Download BTN
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
                      <option value="RECEIVED">RECEIVED</option>
                      <option value="SUBMITTED_BY_DO">SUBMITTED_BY_DO</option>
                      <option value="FORWARD_TO_FINANCE">
                        FORWARD_TO_FINANCE
                      </option>
                      <option value="RECEIVED">RECEIVED</option>
                      <option value="RETURN_TO_DO">RETURN_TO_DO</option>
                      <option value="REJECTED">REJECTED</option>
                      <option value="BANK">BANK</option>
                      <option value="HOLD">HOLD</option>
                      <option value="PROCESSED">PROCESSED</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-bordered table_height">
                <thead>
                  <tr className="row-count">
                    <td colSpan={6} style={{ textAlign: "left" }}>
                      Number of BTN {filteredData.length}
                    </td>
                  </tr>
                  <tr className="border-0">
                    <th className="min-w-150px">BTN Num</th>
                    <th className="min-w-150px">Vendor Name</th>
                    <th className="min-w-150px">Vendor Code</th>
                    <th className="min-w-150px">PO No.</th>
                    <th className="min-w-150px">Invoice No.</th>
                    <th className="min-w-150px">Yard No</th>
                    <th className="min-w-150px">Status</th>
                    <th className="min-w-150px">Invoice View Option</th>
                  </tr>
                </thead>
                <tbody style={{ maxHeight: "100%" }}>
                  {loading ? (
                    <>
                      <tr></tr>
                      <tr>
                        <td colSpan={10}>
                          <SkeletonLoader col={8} row={6} />
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      {console.log("filteredData", filteredData)}
                      {filteredData.map((file, index) => (
                        <tr key={index}>
                          <td>
                            <button
                              onClick={() =>
                                handleRowClick(file.purchasing_doc_no)
                              }
                              className="btn_simple"
                            >
                              <u>{file.btn_num}</u>
                            </button>
                          </td>
                          <td>{file.vendor_name}</td>
                          <td>{file.vendor_code}</td>
                          <td>{file.purchasing_doc_no}</td>
                          <td>{file.invoice_no}</td>
                          <td>{file.yard}</td>
                          {/* <td>{file.status}</td> */}
                          <td className={`${clrLegend(file?.status)} bold`}>
                            {file.status}
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                handleViewInvoice(file.invoice_filename)
                              }
                              className="btn_view"
                            >
                              <FaFilePdf /> VIEW
                            </button>
                          </td>
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

export default BTNfinance;
