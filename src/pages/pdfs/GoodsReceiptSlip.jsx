import React, { useEffect, useState } from "react";
import logo from "../../images/logo.png";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

function GoodsReceiptSlip() {
  const location = useLocation();
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handlePrint = () => {
    window.print();
  };

  const { payload } = useParams();
  const payloadData = JSON.parse(payload);
  console.log("payloadData", payloadData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const path = `${process.env.REACT_APP_BACKEND_API}sap/payment/ztfi_bil_deface_report`;
        const config = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payloadData),
        };
        setIsLoading(true);
        const response = await fetch(path, config);
        const data = await response.json();
        setApiData(data.data[0] || {});
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  console.log("apiData-->>", apiData);

  return (
    <div className="container-fluid">
      <section className="Table-1" style={{ minHeight: "970px" }}>
        <div className="row table_heading_container m-0 p-0 pt-2 mb-2 ">
          <div className="col-10">
            <h3
              className="m-0 goodreceptslip"
              style={{ width: "90%", fontFamily: "monospace" }}
            >
              <span className="goodreceptslip-font">GOODS RECEIPT SLIP </span>{" "}
              <span>No: 123456789</span>
            </h3>
          </div>
        </div>

        {/* Section 1 */}
        <div className="section-container">
          <div className="row mt-4">
            <div className="col-6 d-flex justify-content-end top_info_table">
              <table className="h-75 w-100" style={{ fontSize: "14px" }}>
                <tbody>
                  <tr>
                    <td width={"30%"} className="fw-bold">
                      Goods receipt date.
                    </td>
                    <td className="text-start" width={"5%"}>
                      :
                    </td>
                    <td width={"30%"}>{"07.03.2024"}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Current date</td>
                    <td className="text-start">:</td>
                    <td>{"04.09.2024"}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Gate Entry Number</td>
                    <td className="text-start">:</td>
                    <td>{"10S0010007424"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <hr className="section-divider" />

        {/* Section 2 */}
        <div className="section-container">
          <div className="row mt-4">
            <div className="col-6 d-flex justify-content-end top_info_table">
              <table className="h-75 w-100" style={{ fontSize: "14px" }}>
                <tbody>
                  <tr>
                    <td width={"30%"} className="fw-bold">
                      Plant.
                    </td>
                    <td className="text-start" width={"5%"}>
                      :
                    </td>
                    <td width={"30%"}>0100</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Description</td>
                    <td className="text-start">:</td>
                    <td>Plant ship Building</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Vendor</td>
                    <td className="text-start">:</td>
                    <td>0050007545</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Name</td>
                    <td>:</td>
                    <td>DCG Data-Core Systems India Pvt Ltd</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">PO</td>
                    <td>:</td>
                    <td>0050007545</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Pur. group</td>
                    <td>:</td>
                    <td>PUR</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-6 d-flex justify-content-end top_info_table">
              <table className="h-75 w-100" style={{ fontSize: "14px" }}>
                <tbody>
                  <tr>
                    <td width={"30%"} className="fw-bold">
                      Challan No.
                    </td>
                    <td className="text-start" width={"5%"}>
                      :
                    </td>
                    <td width={"30%"}>3456789876</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Bill Location</td>
                    <td className="text-start">:</td>
                    <td>test</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Telephone</td>
                    <td className="text-start">:</td>
                    <td>07.03.2024</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <hr className="section-divider" />

        {/* Section 3 */}
        <div className="section-container">
          <div className="row mt-4">
            <div className="col-6 d-flex justify-content-end top_info_table">
              <table className="h-75 w-100" style={{ fontSize: "14px" }}>
                <tbody>
                  <tr>
                    <td width={"30%"} className="fw-bold">
                      Item Material MPN Acct.assgt
                    </td>
                    <td className="text-start" width={"5%"}>
                      :
                    </td>
                    <td width={"30%"}>0001 341021000009</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Description Recipient</td>
                    <td className="text-start">:</td>
                    <td>SIKAFLEX-292, BINDING MATERIAL_200_300gm</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Qty.</td>
                    <td className="text-start">:</td>
                    <td>UN</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <hr className="section-divider" />
      </section>

      {/* Print Button  */}
      <div className="row diflex justify-content-center mt-5">
        <button
          className="print_btn"
          style={{ position: "absolute", top: "30px", right: "50px" }}
          onClick={handlePrint}
        >
          Print
        </button>
      </div>

      {/* Date Time And Page No  */}
      {/* <div
        className="date_time_container"
        style={{ position: "fixed", top: 0, right: 0, fontSize: "10px" }}
      >
        <p className="m-0 p-0">Date: {currentDate}</p>
        <p className="m-0 p-0">Time: {currentTime}</p>
        <p className="m-0 p-0">page 1/2</p>
      </div> */}
    </div>
  );
}

export default GoodsReceiptSlip;
