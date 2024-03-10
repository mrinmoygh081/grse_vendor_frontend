import React, { useEffect } from "react";

import logo from "../../images/logo.png"
// import { useNavigate } from "react-router-dom";


function Goods_issue_slip() {

  // const navigate = useNavigate();


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
      {/* <button onClick={()=>history.goBack()}>hii</button> */}
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

      <div className="row mt-3">
        <div className="col-6">
          <p className="m-0">Plant: Palnt Bailey bridge</p>
          <p className="m-0">
            Address: 61 Garden Reach Road , Kolkata, Pin - 700024
          </p>
          <p className="m-0">State: West Bengal , GSTIN: 19AAACG9371K1J4</p>
        </div>
        <div className="col-6 d-flex justify-content-end top_info_table">
          <table className="w-75" style={{ fontSize: "14px" }}>
            <tbody>
              <tr>
                <td width={"40%"}>Issue No</td>
                <td className="text-start" width={"5%"}>
                  :
                </td>
                <td>4900757635</td>
              </tr>
              <tr>
                <td>Issue Date</td>
                <td className="text-start">:</td>
                <td>06.03.2024</td>
              </tr>
              <tr>
                <td>Reservation No</td>
                <td className="text-start">:</td>
                <td>236608</td>
              </tr>
              <tr>
                <td>Reservation Date</td>
                <td className="text-center">:</td>
                <td>06.03.2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <h4 className="text-center">GOODS ISSUE SLIP</h4>
        <div className="col-12">
          <table className="table table_container_1">
            <thead>
              <tr>
                <th>SR.N0/SIR Item</th>
                <th>Material Code</th>
                <th>Material Description</th>
                <th>UOM</th>
                <th>Batch No.</th>
                <th>Required Qty</th>
                <th>Issued Qty</th>
                <th>Cost Center</th>
                <th>WBS Element</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1 / 0001</td>
                <td>P9101EF050000</td>
                <td>CENTRAL STEEL DECK(LONG) BTEB EF 5/1(OG)</td>
                <td>EA</td>
                <td></td>
                <td>1</td>
                <td>1</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>1 / 0001</td>
                <td>P9101EF050000</td>
                <td>CENTRAL STEEL DECK(LONG) BTEB EF 5/1(OG)</td>
                <td>EA</td>
                <td></td>
                <td>1</td>
                <td>1</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>1 / 0001</td>
                <td>P9101EF050000</td>
                <td>CENTRAL STEEL DECK(LONG) BTEB EF 5/1(OG)</td>
                <td>EA</td>
                <td></td>
                <td>1</td>
                <td>1</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>1 / 0001</td>
                <td>P9101EF050000</td>
                <td>CENTRAL STEEL DECK(LONG) BTEB EF 5/1(OG)</td>
                <td>EA</td>
                <td></td>
                <td>1</td>
                <td>1</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={9}></td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>
                  <h6 className="text-center pb-3">Issued To</h6>
                  <h6 className="text-center">DCG1</h6>
                </td>
                <td colSpan={1}>
                  <h6 className="text-center pb-3">Issued By</h6>
                  <h6 className="text-center">DCG1</h6>
                </td>
                <td colSpan={3}>
                  <h6 className="text-center pb-3">Authorized By</h6>
                  <h6 className="text-center"></h6>
                </td>
                <td colSpan={3}>
                  <h6 className="text-center pb-3">Received By</h6>
                  <h6 className="text-center"></h6>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="row diflex justify-content-center mt-5">
        <button className="print_btn" 
        style={{ position: "absolute", top: "30px", right: "50px" }}
        onClick={handlePrint}
        >
          Print
        </button>
      </div>
    </div>
  );
}

export default Goods_issue_slip;
