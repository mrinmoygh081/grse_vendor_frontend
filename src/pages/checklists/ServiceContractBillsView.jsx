import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import { checkTypeArr } from "../../utils/smallFun";
import { apiCallBack } from "../../utils/fetchAPIs";
import { FaCaretLeft } from "react-icons/fa";
import BTNServiceVendor from "../../components/BTNServiceVendor";
import { initialDataService } from "../../data/btnData";

const ServiceContractBillsView = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { state } = useLocation();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [form, setForm] = useState(initialDataService);

  const getData = async () => {
    const d = await apiCallBack(
      "GET",
      `po/btn/initServiceHybrid?poNo=${id}`,
      null,
      token
    );
    if (d?.status) {
      setData((prevData) => ({ ...prevData, initial: d?.data }));
    }
  };

  const getForm = async (btn) => {
    const d = await apiCallBack(
      "GET",
      `po/btn/getServiceBtnData?type=sbtn-details&btn_num=${btn}`
    );
    if (d?.status) {
      setForm(d?.data);
      checkWDCDetails(d?.data?.wdc_number);
    }
  };

  const checkWDCDetails = async (wdc_number) => {
    const d = await apiCallBack(
      "GET",
      `po/btn/getWdcInfoServiceHybrid?reference_no=${wdc_number}`,
      null,
      token
    );
    if (d?.status) {
      setData((prevData) => ({
        ...prevData,
        wdcDetails: d?.data,
      }));
      getData();
    }
  };

  useEffect(() => {
    getForm(state);
  }, [state]);

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"Service Contract Bills"} id={id} />
            <div className="content d-flex flex-column flex-column-fluid">
              <div className="post d-flex flex-column-fluid">
                <div className="container">
                  <form>
                    <div className="row g-5 g-xl-8">
                      <div className="col-12">
                        <div className="card">
                          <h3 className="d-flex align-items-center m-3">
                            <button
                              className="btn_icon me-3"
                              type="button"
                              onClick={() =>
                                navigate(`/invoice-and-payment-process/${id}`)
                              }
                            >
                              <FaCaretLeft className="fs-20" />
                            </button>{" "}
                            Bills for Service PO:
                          </h3>
                          <BTNServiceVendor data={data} form={form} />
                          <div className="text-center mb-5">
                            <button
                              className="btn fw-bold btn-primary me-3"
                              type="button"
                              onClick={() =>
                                navigate(`/invoice-and-payment-process/${id}`)
                              }
                            >
                              BACK
                            </button>
                          </div>
                        </div>
                      </div>
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

export default ServiceContractBillsView;
