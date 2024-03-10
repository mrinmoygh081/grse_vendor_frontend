import React, { useEffect } from "react";
// import "../../assets/paymentAdvice.css";
import logo from "../../images/logo.png";

function Payment_Advice() {
  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    const handlePrint = () => {
      window.print();
    };
    handlePrint();
  }, []);

  return (
    <section id="image-gallery" className="py-5">
      <div className="gallery_top">
        <div className=" col-1">
          <img src={logo} alt="logo" className="table_logo" />
        </div>
        <div className="gallary_content col-11 d-flex ">
          <div style={{ width: "85%" }}>
            <h2>GARDEN REACH SHIPBUILDERS & ENGINEERS LTD</h2>

            <h4>(A Govt. of India Undertaking )</h4>

            <h5>
              <u>Regd Office : 43/46 GARDEN REACH ROAD, KOLKATA -700024</u>
            </h5>
            <h5>
              CIN: U35111WB1934GOI007891 &nbsp;&nbsp;&nbsp;&ensp;&nbsp; PHONE
              NO.-(033)2469-8100 TO 8113{" "}
            </h5>
            <h5>
              FAX NO.-(033)2469-8150 &nbsp;&nbsp;&nbsp;&ensp;&nbsp;Website:{" "}
              <a href="">www.grse.in</a>{" "}
            </h5>
          </div>
        </div>
      </div>
      <hr />
      <div className="gallary_certi">
        <h5>The E-payment against your Invoice no 2510033212 has been made.</h5>
      </div>
      <div className="gallary_c1 ">
        <div className="details col-4">
          <p className="fc">BTN</p> <span>:</span>
          <div className="sc">20210913026</div>
        </div>
        <div className="details col-4">
          <p className="fc">BTN Date</p> <span>:</span>
          <div className="sc">13.09.2021</div>
        </div>
        <div className="details col-4">
          <p className="fc">PO</p> <span>:</span>
          <div className="sc">4700023062</div>
        </div>
        <div className="details1 ">
          <div className="details col-4">
            <p className="fc">Vendor</p> <span>:</span>
            <div className="sc">50000419</div>
          </div>
          <div className=" col-3 ">
            <p>LINDE INDIA LIMITED</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 ">
          <div className="contents">
            <h5>The payment details are following:</h5>
            <div className="contentdetails">
              <div className="label">
                <p className="fcont">Met/ser Value</p>
              </div>
              <span>:</span>

              <div className="label2 ">
                <p className="value">47,678</p>
              </div>
            </div>
            <div className="contentdetails">
              <div className="label">
                <p className="fcont">No GR/SR Entry</p>
              </div>
              <span>:</span>

              <div className="label2 ">
                <p className="value">0.00</p>
              </div>
            </div>
            <div className="contentdetails">
              <div className="label">
                <p className="fcont">Net Value</p>
              </div>
              <span>:</span>

              <div className="label2 ">
                <p className="value"></p>
              </div>
            </div>
            <div className="contentdetails">
              <div className="label">
                <p className="fcont"> Taxes/Dudies </p>
                <div className="scont">
                  <p> 18% CGST & SGST</p>
                </div>
              </div>
              <span>:</span>

              <div className="label2 ">
                <p className="value">8,582.12</p>
              </div>
            </div>
            <div className="contentdetails">
              <div className="label">
                <p className="fcont">Total value with Taxes & Duties</p>
              </div>
              <span>:</span>

              <div className="label2 ">
                <p className="value">56,260.52</p>
              </div>
            </div>
            <div className="contentdetails">
              <div className="label">
                <p className="fcont">Any other charges payable</p>
              </div>
              <span>:</span>

              <div className="label2 ">
                <p className="value">0.00</p>
              </div>
            </div>
            <div className="contentdetails">
              <div className="label">
                <p className="fcout">Gross Value</p>
              </div>
              <span>:</span>

              <div className="label2 ">
                <p className="value">56,260.52</p>
              </div>
            </div>
            <div className="contentdetails">
              <div className="label">
                <p className="fcont">Adjustment of Advance</p>
              </div>
              <span>:</span>

              <div className="label2 ">
                <p className="value">0.00</p>
              </div>
            </div>
          </div>
          <div className="contents">
            <h5>Retention :</h5>

            <div className="contentdetails">
              <div className="label">
                <p className="fcont">PBG</p>
                <div className="scont">
                  <p>Mahi123456</p>
                </div>
              </div>
              <span>:</span>

              <div className="label2 ">
                <p className="value">0.00</p>
              </div>
            </div>
            <div className="contentdetails">
              <div className="label">
                <p className="fcont">SD</p>
                <div className="scont">
                  <p>rah10</p>
                </div>
              </div>

              <span>:</span>

              <div className="label2 ">
                <p className="value">0.00</p>
              </div>
            </div>
            <div className="contentdetails">
              <div className="label">
                <p className="fcont">Others</p>
              </div>
              <span>:</span>

              <div className="label2 ">
                <p className="value">0.00</p>
              </div>
            </div>
            <div className="contentdetails">
              <div className="label">
                <p className="fcont">Total Retentions</p>
              </div>
              <span>:</span>

              <div className="label2 ">
                <p className="value">0.00</p>
              </div>
            </div>
          </div>
          <div className="contents">
            <h5>Deduction :</h5>

            <div className="contentdetails">
              <div className="label">
                <p className="fcont">Income TAX TDS</p>
                <div className="scont">2%</div>
              </div>
              <span>:</span>

              <div className="label2 ">
                <p className="value">0.00</p>
              </div>
            </div>
            <div className="contentdetails">
              <div className="label">
                <p className="fcont">GST TDS</p>
                <div className="scont">2%</div>
              </div>
              <span>:</span>

              <div className="label2 ">
                <p className="value">953.58</p>
              </div>
            </div>
            <div className="contentdetails">
              <div className="label">
                <p className="fcont">Cost of Consumables & Paints</p>
              </div>
              <span>:</span>

              <div className="label2 ">
                <p className="value">0.00</p>
              </div>
            </div>
            <div className="contentdetails">
              <div className="label">
                <p className="fcont">LD</p>
              </div>
              <span>:</span>

              <div className="label2 ">
                <p className="value">0.00</p>
              </div>
            </div>
            <div className="contentdetails">
              <div className="label">
                <p className="fcont">Penalty</p>
              </div>
              <span>:</span>

              <div className="label2 ">
                <p className="value">0.00</p>
              </div>
            </div>
            <div className="contentdetails">
              <div className="label">
                <p className="fcont">Interest Charges</p>
              </div>
              <span>:</span>

              <div className="label2 ">
                <p className="value">0.00</p>
              </div>
            </div>
            <div className="contentdetails">
              <div className="label">
                <p className="fcont">Other Deduction</p>
              </div>
              <span>:</span>

              <div className="label2 ">
                <p className="value"></p>
              </div>
            </div>
            <div className="contentdetails">
              <div className="label">
                <p className="fcont">Total Deduction</p>
              </div>
              <span>:</span>

              <div className="label2 ">
                <p className="value">953.58</p>
              </div>
            </div>
            <div className="contentdetails">
              <div className="label">
                <p className="fcont">Net Payment</p>
              </div>
              <span>:</span>

              <div className="label2 ">
                <p className="value">55,306.94</p>
              </div>
            </div>

            <p className="lastpara">
              This is system generated and does not require signature
            </p>
          </div>
        </div>
      </div>
      <div className="row diflex justify-content-center mt-5">
        <button
          className="print_btn"
          style={{ position: "absolute", top: "30px", right: "50px" }}
          onClick={handlePrint}
        >
          Print
        </button>
      </div>
    </section>
  );
}

export default Payment_Advice;
