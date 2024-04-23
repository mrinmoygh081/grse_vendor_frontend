import React, { useEffect, useState } from "react";
import logo from "../../images/logo.png";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function InspectionReport() {
  const [apiData, setApiData] = useState([]);
  // const [payloadData , setPayloadData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  // console.log("payload iss--", location.state)

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
  console.log("payload iss params--", payloadData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const path = `${process.env.REACT_APP_BACKEND_API}sap/qa/icgrn/report`;
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
        setApiData(data.data || {});
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token]);

  console.log("Api data --??..>>", apiData);

  return (
    <div className="container-fluid pt-4">
      <div className="row table_heading_container m-0 p-0 mb-2 ">
        <div className="col-2">
          <img src={logo} alt="" className="table_logo" />
        </div>
        <div className="col-10">
          <h3 className="m-0 text-center" style={{ width: "90%" }}>
            Garden Reach Shipbuilders & Engineers Ltd.
          </h3>
          <p
            className="m-0 text-center"
            style={{ fontSize: "18px", width: "90%" }}
          >
            (A govt. of india undertaking)
          </p>
          <p
            className="m-0 text-center"
            style={{ fontSize: "18px", width: "90%" }}
          >
            43/46, (Garden Reach Road / Kolkata)
          </p>
        </div>
      </div>

      <div className="row  mb-4 mt-3">
        <h5 className=" text-center m-0 pb-3">Inspection Report</h5>
        {isLoading ? (
          <h4>Loading...</h4>
        ) : (
          <>
            <div className="col-6 d-flex justify-content-start top_info_table">
              <table className="w-75 h-75" style={{ fontSize: "14px" }}>
                <tbody>
                  <tr>
                    <td width={"60%"}>Doc No</td>
                    <td className="text-start" width={"5%"}>
                      :
                    </td>
                    <td>{apiData?.docNo}</td>
                  </tr>
                  <tr>
                    <td>Doc Date</td>
                    <td className="text-start">:</td>
                    {/* <td>{apiData?.docdate}</td> */}
                    <td>
                      {" "}
                      {apiData?.docdate
                        ? new Date(apiData?.docdate).toLocaleDateString()
                        : ""}
                    </td>
                  </tr>
                  <tr>
                    <td>Invoice No</td>
                    <td className="text-start">:</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Purchase Order No</td>
                    <td>:</td>
                    <td>{apiData?.purchasing_doc_no}</td>
                  </tr>
                  <tr>
                    <td>Purchase Order Date</td>
                    <td>:</td>
                    {/* <td>{apiData?.purchasing_doc_date}</td> */}
                    <td>
                      {" "}
                      {apiData?.purchasing_doc_date
                        ? new Date(
                            apiData?.purchasing_doc_date
                          ).toLocaleDateString()
                        : ""}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="col-6 d-flex  justify-content-center">
              <div className="w-75">
                <h5 className="m-0" style={{ fontSize: "18px" }}>
                  Vendor Address :
                </h5>
                <p className="m-0" style={{ fontSize: "14px" }}>
                  {apiData?.suppplier}, {apiData?.vendorName} <br />
                  {apiData?.vendorCity} <br /> {apiData?.vendorPinCode} <br />
                  {apiData?.vendorCountry}
                </p>
                <p
                  className="m-0 w-50 p-0 text-end"
                  style={{ fontSize: "14px" }}
                >
                  {apiData?.vendorDistrict}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="row" style={{ minHeight: "300px" }}>
        <div className="col-12">
          <table className="table table_container_1">
            <thead>
              <tr>
                <th>SL.NO</th>
                <th>Material Number</th>
                <th>Material Description</th>
                <th>Supplied Qty</th>
                <th>Accepted Qty</th>
                <th>Rejected Qty</th>
                <th>Base UOM</th>
                <th>UD Code</th>
                <th>Insp.Dt</th>
                <th>Invoice Number</th>
                <th>Gate Entry Number</th>
                <th>Gate Entry Date</th>
              </tr>
            </thead>
            {isLoading ? (
              <h4>Loading....</h4>
            ) : (
              <tbody>
                {apiData?.lineItems?.map((item, index) => (
                  <tr>
                    <td>{item.purchasing_doc_no_item}</td>
                    <td>{item.materialNumber}</td>
                    <td>{item.materialDesc}</td>
                    <td>{item.supplyQuantity}</td>
                    <td>{item.acceptedQty}</td>
                    <td>{item.rejectedQty}</td>
                    <td>{item.baseUnit}</td>
                    <td>{item.udCode}</td>
                    <td>
                      {item.inspDate &&
                        new Date(item.inspDate).toLocaleDateString()}
                    </td>

                    <td>{item?.invoiceNo}</td>
                    <td>{item?.gateEntryNo}</td>
                    <td>
                      {item.gateEntryDate &&
                        new Date(item.gateEntryDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          <div className="col-12">
            <h6 className="m-0">Remarks</h6>
            <p
              className="m-0 w-75"
              style={{ wordWrap: "break-word", fontSize: "14px" }}
            >
              dwdugheufgefbsdhceydwishqshwidyveuhcdvewhcvwdywhdvwcvewdyvwydvssssqssqqqqqqqqqqqqqqqqqqqddddddddddddddddddddd
            </p>
          </div>
        </div>
      </div>

      <div className="row pt-5" style={{ marginTop: "270px" }}>
        <h6 className="col-6 m-0 text-start">
          SIGNATURE OF INSPECTOR/SUPERVISOR
        </h6>
        <h6 className="col-6 m-0 text-end">SIGNATURE OF OFFICER</h6>
      </div>
      <div className="row diflex justify-content-center mt-2 mb-5">
        <button
          className="print_btn"
          onClick={handlePrint}
          style={{ position: "absolute", top: "30px", right: "50px" }}
        >
          Print
        </button>
      </div>

      {/* Date Time And Page No  */}
      <div
        className="date_time_container"
        style={{ position: "fixed", top: 0, right: 0, fontSize: "10px" }}
      >
        <p className="m-0 p-0">Date: {currentDate}</p>
        <p className="m-0 p-0">Time: {currentTime}</p>
        {/* <p className="m-0 p-0">page 1/2</p> */}
      </div>
    </div>
  );
}

export default InspectionReport;
