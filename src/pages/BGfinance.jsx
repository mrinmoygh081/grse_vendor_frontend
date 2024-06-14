import React, { useEffect, useState } from "react";
import MainHeader from "../components/MainHeader";
import { checkTypeArr } from "../utils/smallFun";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiCallBack } from "../utils/fetchAPIs";
import Footer from "../components/Footer";
import SidebarDashboard from "../components/SidebarDashboard";

const formatDate = (timestamp) => {
  if (!timestamp || timestamp === "0") return "N/A";
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleDateString("en-US");
};

const BGfinance = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [paymentdata, setPaymentdata] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Function to create payment and fetch payment data
  const createPayment = async () => {
    setLoading(true); // Start loading
    try {
      const response = await apiCallBack("GET", "stat/bg", null, token);
      if (response?.status) {
        setPaymentdata(response.data); // Assuming response.data contains the payment data
      } else {
        console.error("Error creating invoice number:", response.message);
      }
    } catch (error) {
      console.error("Error creating invoice number:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch payment data on component mount or when token changes
  useEffect(() => {
    createPayment();
  }, [token]);

  // Filtered data based on search query
  const filteredData = paymentdata.filter((file) => {
    return (
      (file.reference_no &&
        file.reference_no.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (file.purchasing_doc_no &&
        file.purchasing_doc_no
          .toLowerCase()
          .includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <>
      <div className="wrapper d-flex flex-column flex-row-fluid">
        <div className="page d-flex flex-row flex-column-fluid">
          <SidebarDashboard />
          <div className="d-flex flex-column flex-row-fluid">
            <MainHeader title={"BG Dashboard"} id={id} />
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
                          <div className="table-responsive">
                            {loading ? (
                              // Skeleton loader
                              <div>
                                <div className="page_heading mt-5 mb-3">
                                  <h3>BG Finance Dashboard</h3>
                                </div>
                                <table className="table table-striped table-bordered table_height">
                                  <thead>
                                    <tr className="border-0">
                                      <th className="min-w-150px">BG Ref No</th>
                                      <th className="min-w-150px">PO No</th>
                                      <th className="min-w-150px">
                                        Vendor Name
                                      </th>
                                      <th className="min-w-150px">
                                        BG File No
                                      </th>
                                      <th className="min-w-150px">BG No</th>
                                      <th className="min-w-150px">Bank Name</th>
                                      <th className="min-w-150px">
                                        Branch Name
                                      </th>
                                      <th className="min-w-150px">Bank City</th>
                                      <th className="min-w-150px">BG Amount</th>
                                      <th className="min-w-150px">BG Date</th>
                                      <th className="min-w-150px">
                                        Validity Date
                                      </th>
                                      <th className="min-w-150px">Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {Array.from({ length: 5 }).map(
                                      (_, index) => (
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
                                          <td>
                                            <div className="skeleton-box"></div>
                                          </td>
                                          <td>
                                            <div className="skeleton-box"></div>
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
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
                                        <th className="min-w-150px">
                                          BG Ref No
                                        </th>
                                        <th className="min-w-150px">PO No</th>
                                        <th className="min-w-150px">
                                          Vendor Name
                                        </th>
                                        <th className="min-w-150px">
                                          BG File No
                                        </th>
                                        <th className="min-w-150px">BG No</th>
                                        <th className="min-w-150px">
                                          Bank Name
                                        </th>
                                        <th className="min-w-150px">
                                          Branch Name
                                        </th>
                                        <th className="min-w-150px">
                                          Bank City
                                        </th>
                                        <th className="min-w-150px">
                                          BG Amount
                                        </th>
                                        <th className="min-w-150px">BG Date</th>
                                        <th className="min-w-150px">
                                          Validity Date
                                        </th>
                                        <th className="min-w-150px">Status</th>
                                      </tr>
                                    </thead>
                                    <tbody style={{ maxHeight: "100%" }}>
                                      {checkTypeArr(filteredData) &&
                                        filteredData.map((file, index) => (
                                          <tr key={index}>
                                            <td>{file?.reference_no}</td>
                                            <td>{file?.purchasing_doc_no}</td>
                                            <td>{file?.vendor_name}</td>
                                            <td>{}</td>
                                            <td>{file?.bg_no}</td>
                                            <td>{file?.bank_name}</td>
                                            <td>{file?.branch_name}</td>
                                            <td>{file?.bank_city}</td>
                                            <td>{file?.bg_ammount}</td>
                                            <td>{formatDate(file?.bg_date)}</td>
                                            <td>
                                              {formatDate(file?.validity_date)}
                                            </td>
                                            <td>{file?.status}</td>
                                          </tr>
                                        ))}
                                    </tbody>
                                  </table>
                                )}
                              </div>
                            )}
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
    </>
  );
};

export default BGfinance;
