import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutHandler } from "../redux/slices/loginSlice";
import { apiCallBack } from "../utils/fetchAPIs";
import { poHandler } from "../redux/slices/poSlice";

const POs = () => {
  const dispatch = useDispatch();
  const [polist, setPolist] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { po } = useSelector((state) => state.selectedPO);
  const navigate = useNavigate();
  console.log("po", po);

  useEffect(() => {
    (async () => {
      const data = await apiCallBack(
        "GET",
        `getFilteredData?$tableName=ekko`,
        null,
        token
      );
      if (data?.status) {
        setPolist(data?.data);
      }
    })();
  }, []);

  useEffect(() => {
    if (po) {
      console.log(po);
      navigate(`/po/${po}`);
    }
  }, [po]);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-12">
            <div className="card_pos">
              <div className="card">
                <div className="card_headline">Purchase Orders</div>
                <div className="table-responsive res_height">
                  <table className="table table-bordered table-hover table-striped table_styled">
                    <tbody>
                      {polist.map((po, index) => (
                        <tr key={index}>
                          <td>
                            {/* <Link
                              to={`/po/${po.EBELN}`}
                              onClick={() => selectedPOHandler(po.EBELN)}
                            >
                              {po.EBELN}
                            </Link> */}
                            <button
                              onClick={() => dispatch(poHandler(po.EBELN))}
                            >
                              {po.EBELN}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pos_bottom">
        <button
          className="btn btn-danger"
          onClick={() => dispatch(logoutHandler())}
        >
          Log Out
        </button>
      </div>
    </>
  );
};

export default POs;
