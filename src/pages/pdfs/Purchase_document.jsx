import React, { useEffect } from 'react'
import logo from "../../images/logo.png"

function Purchase_document() {
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
        <p className='w-75 text-end'>Date: 06.03.2024</p>
      </div>
    </div>

    <div className="row" style={{ minHeight: "300px" }}>
      <div className="col-12">
        <table className="table table_container_1">
          <thead>
            <tr>
              <th>RES. No.</th>
              <th>Item No</th>
              <th>Material Description</th>
              <th>UOM</th>
              <th>Qty</th>
              <th>Storage Location</th>
              <th>WBS/Order</th>
              <th>WBS Description</th>
              <th>Activity</th>
              <th>Activity Desc.</th>
              <th>Plant</th>
              <th>Qty to Withdraw</th>
              <th>Issue Unit</th>
              <th>Issue Qty</th>
              <th>Stock indtr</th>
              <th>PO Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0000236608</td>
              <td>0001</td>
              <td>P9101EF0500</td>
              <td>EA</td>
              <td>1000</td>
              <td>3000</td>
              <td>Q.40511783/8B-CWIP/5611 <br />Q.40511783/8B-CWIP/5611 /</td>
              <td>1 No Domatrix Printer/</td>
              <td></td>
              <td></td>
              <td>0110</td>
              <td></td>
              <td>EA</td>
              <td>1000</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>0000236608</td>
              <td>0001</td>
              <td>P9101EF0500</td>
              <td>EA</td>
              <td>1000</td>
              <td>3000</td>
              <td>Q.40511783/8B-CWIP/5611 <br />Q.40511783/8B-CWIP/5611 /</td>
              <td>1 No Domatrix Printer/</td>
              <td></td>
              <td></td>
              <td>0110</td>
              <td></td>
              <td>EA</td>
              <td>1000</td>
              <td></td>
              <td></td>
            </tr>
       
          </tbody>
        </table>
        <div className="col-12">
          <h6 className="m-0">Remarks:-</h6>
          <p
            className="m-0 w-75"
            style={{ wordWrap: "break-word", fontSize: "14px" }}
          >
            
          </p>
        </div>

        <div className="row d-flex mt-5 pt-2">
          <h6 className='col-6'>Depatment:-</h6>
          <h6 className='col-6'>Authorized by:-</h6>
        </div>
        <div className="row mt-5 pt-2">
          <h6 className='col-6'>Signature G.R.S.E. REP :-</h6>
          <h6 className='col-6'>WOT. Kolkata</h6>
        </div>
      </div>
    </div>


    <div className="row diflex justify-content-center mt-5">
      <button
        className="print_btn"
        onClick={handlePrint}
        style={{ position: "absolute", top: "30px", right: "50px" }}
      >
        Print
      </button>
    </div>
  </div>
  )
}

export default Purchase_document;