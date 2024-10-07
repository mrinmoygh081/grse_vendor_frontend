import React, { useEffect, useState } from "react";
import { apiCallBack } from "../../utils/fetchAPIs";
import { checkTypeArr } from "../../utils/smallFun";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import BTNAdvanceVendorInfo from "../../components/BTNAdvanceVendorInfo";

const AdvanceBillHybridView = () => {
  const navigate = useNavigate();
  const { isDO } = useSelector((state) => state.selectedPO);
  const { user, token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { state } = useLocation();
  const [data, setData] = useState(null);

  const getDataByBTN = async () => {
    try {
      const response = await apiCallBack(
        "GET",
        `po/btn/abh?type=details&btn_num=${state}`,
        null,
        token
      );
      console.log("response", response);
      if (response?.status) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDataByBTN();
  }, []);

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"Advance Bill"} id={id} />
            <div className="content d-flex flex-column flex-column-fluid">
              <div className="post d-flex flex-column-fluid">
                <div className="container">
                  <form>
                    <div className="row g-5 g-xl-8">
                      <div className="col-12">
                        <div className="card">
                          <h3 className="m-3">Advance Bill:</h3>
                          <BTNAdvanceVendorInfo
                            navigate={navigate}
                            id={id}
                            data={data}
                          />
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

export default AdvanceBillHybridView;
