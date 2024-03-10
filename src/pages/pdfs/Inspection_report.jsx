import React, { useEffect } from "react";
import logo from "../../images/logo.png"

function Inspection_report() {
  const handlePrint = () => {
    window.print();
  };

  useEffect(()=>{
    const handlePrint = () => {
      window.print();
    };
    handlePrint();
  },[])

  return (
    <div className="container-fluid pt-4">

      <div className="row table_heading_container m-0 p-0 mb-2 ">
        <div className="col-2">
          <img src={logo} alt="" className="table_logo" />
        </div>
        <div className="col-10">
          <h3 className="m-0 text-center" style={{width:'90%'}}>
            Garden Reach Shipbuilders & Engineers Ltd.
          </h3>
          <p className="m-0 text-center" style={{ fontSize: "18px",width:'90%' }}>
            (A govt. of india undertaking)
          </p>
          <p className="m-0 text-center" style={{ fontSize: "18px",width:'90%' }}>
            43/46, (Garden Reach Road / Kolkata)
          </p>
        </div>
      </div>


      <div className="row  mb-4 mt-3">
        <h5 className=" text-center m-0 pb-3">Inspection Report</h5>
        <div className="col-6 d-flex justify-content-start top_info_table">
          <table className="w-75 h-75" style={{ fontSize: "14px" }}>
            <tbody>
              <tr>
                <td width={"60%"}>Doc No</td>
                <td className="text-start" width={"5%"}>
                  :
                </td>
                <td>5000242450</td>
              </tr>
              <tr>
                <td>Doc Date</td>
                <td className="text-start">:</td>
                <td>06.03.2024</td>
              </tr>
              <tr>
                <td>Challan/iInvoice/File No</td>
                <td className="text-start">:</td>
                <td></td>
              </tr>
              <tr>
                <td>Purchase Order No</td>
                <td className="text-center">:</td>
                <td>4700026700</td>
              </tr>
              <tr>
                <td>Purchase Order Date</td>
                <td className="text-center">:</td>
                <td>06.03.2024</td>
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
              DCG DATA -CORE SYSTEMS PRIVATE <br /> DG4, SECTOR - II, SALT LAKE
              CITY, <br />
              KOLKATA <br /> 70091 <br />
              India{" "}
            </p>
            <p className="m-0 w-50 p-0 text-end" style={{ fontSize: "14px" }}>
              West Bengal
            </p>
          </div>
        </div>
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>341021000009</td>
                <td>SIKAFLEX-292, BINDING MATERIAL_200-300gm</td>
                <td>1.000</td>
                <td>1.000</td>
                <td>0.000</td>
                <td>EA</td>
                <td>A</td>
                <td>07.03.2024</td>
              </tr>
              <tr>
                <td>1</td>
                <td>341021000009</td>
                <td>SIKAFLEX-292, BINDING MATERIAL_200-300gm</td>
                <td>1.000</td>
                <td>1.000</td>
                <td>0.000</td>
                <td>EA</td>
                <td>A</td>
                <td>07.03.2024</td>
              </tr>
            </tbody>
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

      <div className="row pt-5" style={{marginTop:'270px'}}>
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
    </div>
  );
}

export default Inspection_report;
