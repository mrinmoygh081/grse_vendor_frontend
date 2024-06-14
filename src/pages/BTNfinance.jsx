// // BG.js
// import React, { useEffect, useState } from "react";
// import MainHeader from "../components/MainHeader";
// import { checkTypeArr } from "../utils/smallFun";
// import SideBar from "../components/SideBar";
// import Header from "../components/Header";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { apiCallBack } from "../utils/fetchAPIs";
// import { formatDate } from "../utils/getDateTimeNow";
// import Footer from "../components/Footer";
// import SidebarDashboard from "../components/SidebarDashboard";

// const BTNfinance = () => {
//   const { id } = useParams();
//   const { isDO } = useSelector((state) => state.selectedPO);
//   const { user, token } = useSelector((state) => state.auth);
//   const [data, setData] = useState(null);

//   const navigate = useNavigate();
//   // const [isPopup, setIsPopup] = useState(false);
//   const [slug, setSlug] = useState("");
//   const [paymentdata, setPaymentdata] = useState("");
//   // Sample data
//   // const data = [
//   //   { bgNo: "001", bgFile: "file1.pdf", poNo: "PO123", vendorNo: "V001" },
//   //   { bgNo: "002", bgFile: "file2.pdf", poNo: "PO124", vendorNo: "V002" },
//   // ];
//   // console.log(data, "datadatadatadatadata");

//   const createpayment = async () => {
//     try {
//       const payload = {
//         poNo: id,
//       };
//       const response = await apiCallBack(
//         "POST",
//         "po/download/paymentAdvice",
//         payload,
//         token
//       );
//       if (response?.status) {
//         // Set paymentdata state with the response data
//         setPaymentdata(response.data); // Assuming response.data contains the payment data
//       } else {
//         console.error("Error creating invoice number:", response.message);
//       }
//     } catch (error) {
//       console.error("Error creating invoice number:", error);
//     }
//   };

//   useEffect(() => {
//     createpayment();
//   }, [id, token]);
//   return (
//     <>
//       {/* <MainHeader title={"Welcome to OBPS Portal"} /> */}
//       <div className="wrapper d-flex flex-column flex-row-fluid">
//         <div className="page d-flex flex-row flex-column-fluid">
//           <SidebarDashboard />
//           <div className="d-flex flex-column flex-row-fluid">
//             <MainHeader title={"BTN Dashbord"} id={id} />
//             <div className="content d-flex flex-column flex-column-fluid">
//               <div className="post d-flex flex-column-fluid">
//                 <div className="container">
//                   <div className="row g-5 g-xl-8">
//                     <div className="col-12">
//                       <div className="card-body p-3">
//                         <div className="tab-content">
//                           <div className="table-responsive">
//                             <div>
//                               <div className="page_heading mt-5 mb-3">
//                                 <h3>BTN Dashboard</h3>
//                               </div>
//                               <table className="table table-striped table-bordered table_height">
//                                 <thead>
//                                   <tr className="border-0">
//                                     <th>BTN Num</th>
//                                     <th>Invoice No</th>
//                                     <th>Po No</th>
//                                     <th>Vendor No</th>
//                                     <th>Velue</th>
//                                     <th>Status</th>
//                                   </tr>
//                                 </thead>
//                                 <tbody style={{ maxHeight: "100%" }}>
//                                   {checkTypeArr(paymentdata?.resustFiles) &&
//                                     paymentdata?.resustFiles.map(
//                                       (file, index) => (
//                                         <tr key={index}>
//                                           <td>
//                                             {/* {new Date(
//                                               file.docuentDate
//                                             ).toLocaleDateString()} */}
//                                             {file.docuentDate &&
//                                               formatDate(file.docuentDate)}
//                                           </td>
//                                           <td>{file.vendor_code}</td>
//                                           <td>{file.documentNo}</td>
//                                           <td>
//                                             <a
//                                               href={`${process.env.REACT_APP_ROOT_URL}sapuploads/pymtadvice/${file?.fileName}`}
//                                               target="_blank"
//                                               rel="noreferrer"
//                                             >
//                                               VIEW
//                                             </a>
//                                           </td>
//                                         </tr>
//                                       )
//                                     )}
//                                 </tbody>
//                               </table>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <Footer />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BTNfinance;

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

const BTNfinance = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [paymentdata, setPaymentdata] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Function to create payment and fetch payment data
  const createPayment = async () => {
    setLoading(true); // Start loading
    try {
      const response = await apiCallBack("POST", "stat/btn", null, token);
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
      (file.btn_num &&
        file.btn_num.toLowerCase().includes(searchQuery.toLowerCase())) ||
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
                                  <h3>BTN Dashboard</h3>
                                </div>
                                <table className="table table-striped table-bordered table_height">
                                  <thead>
                                    <tr className="border-0">
                                      <th className="min-w-150px">BTN Num</th>
                                      <th className="min-w-150px">
                                        Invoice No
                                      </th>
                                      <th className="min-w-150px">Po No</th>
                                      <th className="min-w-150px">Vendor No</th>
                                      <th className="min-w-150px">Velue</th>
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
                                        <th className="min-w-150px">BTN Num</th>
                                        <th className="min-w-150px">
                                          Invoice No
                                        </th>
                                        <th className="min-w-150px">Po No</th>
                                        <th className="min-w-150px">
                                          Vendor No
                                        </th>
                                        <th className="min-w-150px">Velue</th>
                                        <th className="min-w-150px">Status</th>
                                      </tr>
                                    </thead>
                                    <tbody style={{ maxHeight: "100%" }}>
                                      {checkTypeArr(filteredData) &&
                                        filteredData.map((file, index) => (
                                          <tr key={index}>
                                            <td>{file?.btn_num}</td>
                                            <td>{file?.invoice_no}</td>
                                            <td>{file?.purchasing_doc_no}</td>
                                            <td>{file?.vendor_code}</td>
                                            <td>{file?.net_claim_amount}</td>

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

export default BTNfinance;
