import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../../components/Footer";
import MainHeader from "../../components/MainHeader";
import SkeletonLoader from "../../loader/SkeletonLoader";
import DynamicButton from "../../Helpers/DynamicButton";
import { checkTypeArr } from "../../utils/smallFun";
import { apiCallBack } from "../../utils/fetchAPIs";
import { toast } from "react-toastify";

const Authorisation = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    const d = await apiCallBack("GET", "auth2/getListPendingEmp", null, null);
    console.log(d);
    if (d?.status) {
    } else {
      toast.info(d.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <div className="d-flex flex-column flex-row-fluid">
            <MainHeader title={"Authorisation"} />
            <div className="content d-flex flex-column flex-column-fluid">
              <div className="post d-flex flex-column-fluid">
                <div className="container">
                  <div className="row g-5 g-xl-8">
                    <div className="col-12">
                      <div className="card-body p-3">
                        <div className="table-responsive">
                          <table className="table table-striped table-bordered table_height">
                            <thead>
                              <tr className="border-0">
                                <th>PO Num</th>
                                <th>BG Ref Num</th>
                                <th>BG File No</th>
                              </tr>
                            </thead>
                            <tbody>
                              {loading ? (
                                <tr>
                                  <td colSpan="6">
                                    <SkeletonLoader />
                                  </td>
                                </tr>
                              ) : checkTypeArr(data) ? (
                                data.map((item, index) => (
                                  <tr key={index}>
                                    <td className="table_center">
                                      {item.purchasing_doc_no}
                                    </td>
                                    <td>{item.reference_no}</td>
                                    <td>{item.bg_file_no || ""}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="5" className="text-center">
                                    No data available
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
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

export default Authorisation;
