import React, { useEffect, useState } from "react";
import logo from "../../images/logo.png";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

function ServiceEntrySheetPdf() {
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
  // let payloadData = location.state;
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
        <div className="row table_heading_container m-0 p-0 pt-2 mb-2 "></div>
        {isLoading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          <>
            <div className="row mt-4">
              <div className="col-6">
                <p>
                  Company <br />
                  HIND CONSTRUCTION CO <br />
                  3, Bhukailash Road , Kani House <br />
                  700023 KOLKATA <br />
                </p>
              </div>
              <div className="col-6 d-flex justify-content-end top_info_table">
                <div className="square-box">
                  <h1>Entry Sheet for services Performed</h1>
                  <table className="h-75 w-100" style={{ fontSize: "14px" }}>
                    <tbody>
                      <tr>
                        <td className="fw-bold">NumberDate</td>
                        <td className="text-start" width={"5%"}>
                          :
                        </td>
                        <td>1000071731 / 15.02.2018</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Purchase Order itemDate</td>
                        <td className="text-start">:</td>
                        <td>4800014048/10 / 7.01.2018</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Your vender number us</td>
                        <td className="text-start">:</td>
                        <td>50000211</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <hr className="section-divider" />
            <div className="row">
              <div className="col-12">
                <table
                  className="w-100 payment_advice_table"
                  style={{ fontSize: "15px" }}
                >
                  <thead>
                    <tr>
                      <th>Line</th>
                      <th className="text-center">Service</th>
                      <th>Qty</th>
                      <th>Desscription Unit</th>
                      <th>Unit price INR</th>
                      <th>Net Value INR</th>
                      <th>Net Value INR</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="section-divider">
                      <td width={"15%"} className="p-1">
                        10
                      </td>
                      <td className="text-center p-1">Plan.line 10</td>
                      <td className="p-1">1</td>
                      <td className="p-1">MISC ARTIST SET</td>
                      <td className="p-1">PAINTINGS JOBS -YD2094</td>
                      <td className="p-1">37,000.00</td>
                    </tr>

                    {/* Total Calculation Row  */}
                    <tr
                      style={{
                        borderTop: "1px solid black",
                        borderStyle: "dotted",
                      }}
                    >
                      <td className="pt-2">Total . Value excl . tax INR</td>
                      <td className="fw-bold pt-2 text-center">37,000.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </section>

      <div className="print-button-container">
        <button className="print_btn" onClick={handlePrint}>
          Print
        </button>
      </div>
    </div>
  );
}

export default ServiceEntrySheetPdf;
