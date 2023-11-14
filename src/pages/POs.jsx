import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutHandler } from "../redux/slices/loginSlice";
import { apiCallBack } from "../utils/fetchAPIs";
import { poHandler } from "../redux/slices/poSlice";
import { FiSearch } from "react-icons/fi";

const POs = () => {
  const dispatch = useDispatch();
  const [polist, setPolist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { token } = useSelector((state) => state.auth);
  const { po } = useSelector((state) => state.selectedPO);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await apiCallBack("GET", `po/poList`, null, token);
      if (data?.status) {
        setPolist(data?.data);
      }
    })();
  }, []);

  useEffect(() => {
    if (po) {
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
                <div className="card_headline">
                  <h1>Purchase Orders</h1>
                  <div className="input_search">
                    <input
                      type="text"
                      className="form-control"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="search_btn">
                      <FiSearch />
                    </button>
                  </div>
                </div>
                <div className="table-responsive res_height">
                  <table className="table table-bordered table-hover table-striped table_styled">
                    <thead>
                      <tr>
                        <th>POs</th>
                        <th>SDBG</th>
                        <th>Drawings</th>
                        <th>QAP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {polist.length === 0 ? (
                        <tr>
                          <td colSpan="4">No data found</td>
                        </tr>
                      ) : (
                        polist
                          .filter((po) =>
                            po.poNumber
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                          )
                          .map((po, index) => (
                            <tr key={index}>
                              <td>
                                <button onClick={() => dispatch(poHandler(po))}>
                                  {po.poNumber}
                                </button>
                              </td>
                              <td>
                                SDBG Date:{" "}
                                {typeof po?.SDVG?.created_at === "number"
                                  ? new Date(
                                      po?.SDVG?.created_at
                                    ).toLocaleDateString()
                                  : "N/A"}{" "}
                                <br />
                                Created By: {po.SDVG.created_by_name || "N/A"}
                                <br />
                                Remarks: {po?.SDVG?.remarks || "N/A"}
                              </td>
                              <td>
                                Drawing Date:{" "}
                                {typeof po?.Drawing?.created_at === "number"
                                  ? new Date(
                                      po?.Drawing?.created_at
                                    ).toLocaleDateString()
                                  : "N/A"}{" "}
                                <br />
                                Created By:{" "}
                                {po.Drawing.created_by_name || "N/A"}
                                <br />
                                Remarks: {po?.Drawing?.remarks || "N/A"}
                              </td>
                              <td>
                                QAP Date:{" "}
                                {typeof po?.qapSubmission?.created_at ===
                                "number"
                                  ? new Date(
                                      po?.qapSubmission?.created_at
                                    ).toLocaleDateString()
                                  : "N/A"}{" "}
                                <br />
                                Created By:{" "}
                                {po.qapSubmission.created_by_name || "N/A"}
                                <br />
                                Remarks: {po?.qapSubmission?.remarks || "N/A"}
                              </td>
                            </tr>
                          ))
                      )}
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
