import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MainHeader from "../components/MainHeader";
import SidebarDashboard from "../components/SidebarDashboard";
import Footer from "../components/Footer";
import { apiCallBack } from "../utils/fetchAPIs";
import { checkTypeArr } from "../utils/smallFun";

const formatDate = (timestamp) => {
  if (!timestamp || timestamp === "0") return "N/A";
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleDateString("en-US");
};

const BGfinance = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [paymentdata, setPaymentdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  const createPayment = async () => {
    setLoading(true);
    try {
      const response = await apiCallBack("GET", "stat/bg", null, token);
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

  useEffect(() => {
    if (token) createPayment();
  }, [token]);

  const handleRowClick = (fileId) => {
    navigate(`/sdbg/${fileId}`);
  };

  const filteredData = paymentdata.filter(
    (file) =>
      (file.reference_no &&
        file.reference_no.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (file.purchasing_doc_no &&
        file.purchasing_doc_no
          .toLowerCase()
          .includes(searchQuery.toLowerCase()))
  );

  const renderTable = () => {
    if (loading) {
      return (
        <div>
          <div className="page_heading mt-5 mb-3">
            <h3>BG Finance Dashboard</h3>
          </div>
          <table className="table table-striped table-bordered table_height">
            <thead>
              <tr className="border-0">
                <th className="min-w-150px">BG Ref No</th>
                <th className="min-w-150px">PO No</th>
                <th className="min-w-150px">Vendor Name</th>
                <th className="min-w-150px">BG File No</th>
                <th className="min-w-150px">Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  <td>
                    <div className="skeleton-box"></div>
                  </td>
                  <td>
                    <div className="skeleton-box"></div>
                  </td>
                  <td>
                    <div className="skeleton-box"></div>
                  </td>
                  <td>
                    <div className="skeleton-box"></div>
                  </td>
                  <td>
                    <div className="skeleton-box"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // if (error) {
    //   return <div>Error: {error}</div>;
    // }

    return (
      <div>
        <div className="page_heading mt-5 mb-3">
          <h3>BG Finance Dashboard</h3>
        </div>
        {filteredData.length === 0 ? (
          <div>No data found</div>
        ) : (
          <table className="table table-striped table-bordered table_height">
            <thead>
              <tr className="border-0">
                <th className="min-w-150px">BG Ref No</th>
                <th className="min-w-150px">PO No</th>
                <th className="min-w-150px">Vendor Name</th>
                <th className="min-w-150px">BG File No</th>
                <th className="min-w-150px">Status</th>
              </tr>
            </thead>
            <tbody style={{ maxHeight: "100%" }}>
              {checkTypeArr(filteredData) &&
                filteredData.map((file, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRowClick(file.purchasing_doc_no)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{file.reference_no}</td>
                    <td>{file.purchasing_doc_no}</td>
                    <td>{file.vendor_name}</td>
                    <td>{/* BG File No data can go here if available */}</td>
                    <td>{file.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  return (
    <div className="wrapper d-flex flex-column flex-row-fluid">
      <div className="page d-flex flex-row flex-column-fluid">
        <SidebarDashboard />
        <div className="d-flex flex-column flex-row-fluid">
          <MainHeader title="BG Dashboard" id={id} />
          <div className="content d-flex flex-column flex-column-fluid">
            <div className="post d-flex flex-column-fluid">
              <div className="container">
                <div className="row g-5 g-xl-8">
                  <div className="col-12">
                    <div className="card-body p-3">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <strong>NO Of Data: {filteredData.length}</strong>
                        </div>
                        <div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search...."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="tab-content">
                        <div className="table-responsive">{renderTable()}</div>
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
  );
};

export default BGfinance;
