// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import SideBar from "../../components/SideBar";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import axios from "axios";
// import { apiCallBack } from "../../utils/fetchAPIs";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { checkTypeArr } from "../../utils/smallFun";
// import DynamicButton from "../../Helpers/DynamicButton";
// import ReactDatePicker from "react-datepicker";

// const ClaimAgainstPBGSubmission = () => {
//   const [formData, setFormData] = useState({
//     invoiceNo: "",
//     balanceClaimInvoice: "",
//     claimAmount: "",
//     percentageOfClaim: "",
//     invoiceFile: null,
//     balanceClaimInvoiceFile: null,
//   });
//   const [data, setData] = useState(null);
//   const [InvoiceData, setInvoiceData] = useState();
//   const { user, token } = useSelector((state) => state.auth);
//   console.log(data, "abhinit anand singh kumar");
//   console.log(InvoiceData, "abhinit anand singh kumar");

//   const { id } = useParams();
//   const navigate = useNavigate();

//   const getData = async () => {
//     // setLoading(true);
//     try {
//       const d = await apiCallBack(
//         "GET",
//         `po/btn/getBTNData?id=${id}`,
//         null,
//         token
//       );
//       if (d?.status) {
//         console.log(d);
//         setData(d?.data);
//         // setLoading(false);
//       }
//     } catch (error) {
//       console.error("Error fetching WDC list:", error);
//       // setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const getGrnIcgrnByInvoice = async () => {
//     try {
//       const payload = {
//         purchasing_doc_no: id,
//         invoice_no: formData.invoiceNo,
//       };
//       const response = await apiCallBack(
//         "POST",
//         "po/btn/getGrnIcgrnByInvoice",
//         payload,
//         token
//       );
//       if (response?.status) {
//         console.log(response);
//         setInvoiceData(response?.data);
//         // setLoading(false);
//       }
//     } catch (error) {
//       console.error("ERROR GETTING GRN ICGRN:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if PBG data is available
//     if (!checkTypeArr(data?.pbg_filename) || data?.pbg_filename.length === 0) {
//       toast.warning("Please submit the PBG before proceeding.");
//       return;
//     }

//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append("purchasing_doc_no", id);
//       formDataToSend.append("invoice_no", formData.invoiceNo);
//       formDataToSend.append(
//         "balance_claim_invoice",
//         formData.balanceClaimInvoice
//       );
//       formDataToSend.append("claim_amount", formData.claimAmount);
//       formDataToSend.append("percentage_of_claim", formData.percentageOfClaim);
//       formDataToSend.append("invoice_filename", formData.invoiceFile);
//       formDataToSend.append(
//         "balance_claim_invoice_filename",
//         formData.balanceClaimInvoiceFile
//       );

//       const response = await apiCallBack(
//         "POST",
//         "po/btn/submitPbg",
//         formDataToSend,
//         token
//       );

//       if (response?.status) {
//         toast.success(response?.message);
//         navigate(`/invoice-and-payment-process/${id}`);
//       } else {
//         toast.error(response?.message);
//       }
//     } catch (error) {
//       toast.error("Error:", error);
//     }
//   };

//   return (
//     <>
//       <div className="d-flex flex-column flex-root">
//         <div className="page d-flex flex-row flex-column-fluid">
//           <SideBar />
//           <div className="wrapper d-flex flex-column flex-row-fluid">
//             <Header title={"Claim Against PBG Submission"} id={id} />
//             <div className="content d-flex flex-column flex-column-fluid">
//               <div className="post d-flex flex-column-fluid">
//                 <div className="container">
//                   <form onSubmit={handleSubmit}>
//                     <div className="row g-5 g-xl-8">
//                       <div className="col-12">
//                         <div className="card">
//                           <h3 className="m-3">Claim Against PBG Submission:</h3>
//                           <div className="card-body p-3">
//                             <div className="tab-content">
//                               <div className="table-responsive">
//                                 <table className="table table-striped table-bordered table_height">
//                                   <tbody style={{ maxHeight: "100%" }}>
//                                     <tr>
//                                       <td>Original Invoice No :</td>
//                                       <td className="btn_value">
//                                         <input
//                                           type="text"
//                                           className="form-control me-2"
//                                           name="invoiceNo"
//                                           placeholder="Invoice No"
//                                           value={formData.invoiceNo}
//                                           onChange={handleChange}
//                                         />
//                                         <input
//                                           type="file"
//                                           className="form-control"
//                                           name="invoiceFile"
//                                           accept=".pdf"
//                                           onChange={handleChange}
//                                         />
//                                         <DynamicButton
//                                           label="CHECK"
//                                           onClick={getGrnIcgrnByInvoice}
//                                           className="btn btn-primary btn-sm m-4"
//                                         />
//                                       </td>
//                                     </tr>
//                                     <tr>
//                                       <td>Invoice Date:</td>
//                                       <td className="btn_value">
//                                         <ReactDatePicker
//                                           dateFormat="dd/MM/yyyy"
//                                           className="form-control"
//                                           placeholderText="DD/MM/YYYY"
//                                         />
//                                       </td>
//                                     </tr>
//                                     <tr>
//                                       <td>Balance Claim Invoice :</td>
//                                       <td className="btn_value">
//                                         <input
//                                           type="text"
//                                           className="form-control me-2"
//                                           name="balanceClaimInvoice"
//                                           placeholder="Balance Claim Invoice"
//                                           value={formData.balanceClaimInvoice}
//                                           onChange={handleChange}
//                                         />
//                                         <input
//                                           type="file"
//                                           className="form-control"
//                                           name="balanceClaimInvoiceFile"
//                                           accept=".pdf"
//                                           onChange={handleChange}
//                                         />
//                                       </td>
//                                     </tr>
//                                     <tr>
//                                       <td>Claim Amount :</td>
//                                       <td className="btn_value">
//                                         <input
//                                           type="text"
//                                           className="form-control me-2"
//                                           name="claimAmount"
//                                           value={formData.claimAmount}
//                                           onChange={handleChange}
//                                         />
//                                       </td>
//                                     </tr>
//                                     <tr>
//                                       <td>Retension % Claim :</td>
//                                       <td className="btn_value">
//                                         <input
//                                           type="text"
//                                           className="form-control me-2"
//                                           name="percentageOfClaim"
//                                           value={formData.percentageOfClaim}
//                                           onChange={handleChange}
//                                         />
//                                         <span className="ms-1">%</span>
//                                       </td>
//                                     </tr>
//                                     <tr>
//                                       <td>PBG</td>
//                                       <td className="btn_value">
//                                         {checkTypeArr(data?.pbg_filename)
//                                           ? data?.pbg_filename.map(
//                                               (item, i) => {
//                                                 return (
//                                                   <a
//                                                     key={i}
//                                                     href={`${process.env.REACT_APP_PDF_URL}submitSDBG/${item?.file_name}`}
//                                                     target="_blank"
//                                                     rel="noreferrer"
//                                                     style={{
//                                                       marginRight: "10px",
//                                                     }}
//                                                   >
//                                                     VIEW
//                                                   </a>
//                                                 );
//                                               }
//                                             )
//                                           : "PBG NOT SUBMITTED"}
//                                       </td>
//                                     </tr>
//                                     <tr>
//                                       <td>ICGRN Nos </td>
//                                       <td className="btn_value">
//                                         <p>
//                                           {checkTypeArr(
//                                             InvoiceData?.icgrn_nos
//                                           ) &&
//                                             InvoiceData?.icgrn_nos?.map(
//                                               (item, i) => (
//                                                 <b key={i} className="mx-2">
//                                                   {item?.grn_no
//                                                     ? item.grn_no
//                                                     : "NA"}
//                                                 </b>
//                                               )
//                                             )}
//                                         </p>
//                                       </td>
//                                     </tr>
//                                   </tbody>
//                                 </table>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="text-center mt-4">
//                       <button
//                         className="btn fw-bold btn-primary me-3"
//                         type="submit"
//                       >
//                         SUBMIT
//                       </button>
//                       <button
//                         className="btn btn-primary me-3"
//                         type="button"
//                         onClick={() =>
//                           navigate(`/invoice-and-payment-process/${id}`)
//                         }
//                       >
//                         BACK
//                       </button>
//                     </div>
//                   </form>
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

// export default ClaimAgainstPBGSubmission;
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import { apiCallBack } from "../../utils/fetchAPIs";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { checkTypeArr } from "../../utils/smallFun";
import DynamicButton from "../../Helpers/DynamicButton";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for the date picker

const ClaimAgainstPBGSubmission = () => {
  const [formData, setFormData] = useState({
    invoiceNo: "",
    balanceClaimInvoice: "",
    claimAmount: "",
    percentageOfClaim: "",
    invoiceFile: null,
    balanceClaimInvoiceFile: null,
  });
  const [invoiceDate, setInvoiceDate] = useState(null); // New state for invoice date
  const [data, setData] = useState(null);
  const [InvoiceData, setInvoiceData] = useState();
  const { user, token } = useSelector((state) => state.auth);

  const { id } = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const d = await apiCallBack(
        "GET",
        `po/btn/getBTNData?id=${id}`,
        null,
        token
      );
      if (d?.status) {
        setData(d?.data);
      }
    } catch (error) {
      console.error("Error fetching WDC list:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getGrnIcgrnByInvoice = async () => {
    try {
      const payload = {
        purchasing_doc_no: id,
        invoice_no: formData.invoiceNo,
      };
      const response = await apiCallBack(
        "POST",
        "po/btn/getGrnIcgrnByInvoice",
        payload,
        token
      );
      if (response?.status) {
        setInvoiceData(response?.data);
      }
    } catch (error) {
      console.error("ERROR GETTING GRN ICGRN:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if PBG data is available
    if (!checkTypeArr(data?.pbg_filename) || data?.pbg_filename.length === 0) {
      toast.warning("Please submit the PBG before proceeding.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("purchasing_doc_no", id);
      formDataToSend.append("invoice_no", formData.invoiceNo);
      formDataToSend.append(
        "balance_claim_invoice",
        formData.balanceClaimInvoice
      );
      formDataToSend.append("claim_amount", formData.claimAmount);
      formDataToSend.append("percentage_of_claim", formData.percentageOfClaim);
      formDataToSend.append("invoice_filename", formData.invoiceFile);
      formDataToSend.append(
        "balance_claim_invoice_filename",
        formData.balanceClaimInvoiceFile
      );

      // Add invoice date to the payload
      // formDataToSend.append(
      //   "invoice_date",
      //   invoiceDate ? invoiceDate.toISOString().split("T")[0] : ""
      // );
      formDataToSend.append(
        "invoice_date",
        invoiceDate ? Math.floor(new Date(invoiceDate).getTime() / 1000) : ""
      );

      const response = await apiCallBack(
        "POST",
        "po/btn/submitPbg",
        formDataToSend,
        token
      );

      if (response?.status) {
        toast.success(response?.message);
        navigate(`/invoice-and-payment-process/${id}`);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("Error:", error);
    }
  };

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"Claim Against PBG Submission"} id={id} />
            <div className="content d-flex flex-column flex-column-fluid">
              <div className="post d-flex flex-column-fluid">
                <div className="container">
                  <form onSubmit={handleSubmit}>
                    <div className="row g-5 g-xl-8">
                      <div className="col-12">
                        <div className="card">
                          <h3 className="m-3">Claim Against PBG Submission:</h3>
                          <div className="card-body p-3">
                            <div className="tab-content">
                              <div className="table-responsive">
                                <table className="table table-striped table-bordered table_height">
                                  <tbody style={{ maxHeight: "100%" }}>
                                    <tr>
                                      <td>Claim Invoice Date:</td>
                                      <td className="btn_value">
                                        <ReactDatePicker
                                          dateFormat="dd/MM/yyyy"
                                          selected={invoiceDate}
                                          onChange={(date) =>
                                            setInvoiceDate(date)
                                          }
                                          className="form-control"
                                          placeholderText="DD/MM/YYYY"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Balance Claim Invoice :</td>
                                      <td className="btn_value">
                                        <input
                                          type="text"
                                          className="form-control me-2"
                                          name="balanceClaimInvoice"
                                          placeholder="Balance Claim Invoice"
                                          value={formData.balanceClaimInvoice}
                                          onChange={handleChange}
                                        />
                                        <input
                                          type="file"
                                          className="form-control"
                                          name="balanceClaimInvoiceFile"
                                          accept=".pdf"
                                          onChange={handleChange}
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Original Invoice No :</td>
                                      <td className="btn_value">
                                        <input
                                          type="text"
                                          className="form-control me-2"
                                          name="invoiceNo"
                                          placeholder="Invoice No"
                                          value={formData.invoiceNo}
                                          onChange={handleChange}
                                        />
                                        <input
                                          type="file"
                                          className="form-control"
                                          name="invoiceFile"
                                          accept=".pdf"
                                          onChange={handleChange}
                                        />
                                        <DynamicButton
                                          label="CHECK"
                                          onClick={getGrnIcgrnByInvoice}
                                          className="btn btn-primary btn-sm m-4"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Original Invoice Date:</td>
                                      <td className="btn_value">
                                        <ReactDatePicker
                                          dateFormat="dd/MM/yyyy"
                                          selected={invoiceDate}
                                          onChange={(date) =>
                                            setInvoiceDate(date)
                                          }
                                          className="form-control"
                                          placeholderText="DD/MM/YYYY"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>ICGRN Nos </td>
                                      <td className="btn_value">
                                        <p>
                                          {checkTypeArr(
                                            InvoiceData?.icgrn_nos
                                          ) &&
                                            InvoiceData?.icgrn_nos?.map(
                                              (item, i) => (
                                                <b key={i} className="mx-2">
                                                  {item?.grn_no
                                                    ? item.grn_no
                                                    : "NA"}
                                                </b>
                                              )
                                            )}
                                        </p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Claim Amount :</td>
                                      <td className="btn_value">
                                        <input
                                          type="text"
                                          className="form-control me-2"
                                          name="claimAmount"
                                          value={formData.claimAmount}
                                          onChange={handleChange}
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Retension % Claim :</td>
                                      <td className="btn_value">
                                        <input
                                          type="text"
                                          className="form-control me-2"
                                          name="percentageOfClaim"
                                          value={formData.percentageOfClaim}
                                          onChange={handleChange}
                                        />
                                        <span className="ms-1">%</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>PBG</td>
                                      <td className="btn_value">
                                        {checkTypeArr(data?.pbg_filename)
                                          ? data?.pbg_filename.map(
                                              (item, i) => {
                                                return (
                                                  <a
                                                    key={i}
                                                    href={`${process.env.REACT_APP_PDF_URL}submitSDBG/${item?.file_name}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    style={{
                                                      marginRight: "10px",
                                                    }}
                                                  >
                                                    VIEW
                                                  </a>
                                                );
                                              }
                                            )
                                          : "PBG NOT SUBMITTED"}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center mt-4">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={!formData.invoiceNo}
                      >
                        Submit
                      </button>
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

export default ClaimAgainstPBGSubmission;
