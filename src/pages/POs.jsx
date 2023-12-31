import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutHandler } from "../redux/slices/loginSlice";
import { apiCallBack } from "../utils/fetchAPIs";
import { poHandler } from "../redux/slices/poSlice";
import { FiSearch } from "react-icons/fi";
import moment from "moment";
import MainHeader from "../components/MainHeader";

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
  }, [token]); // Include 'token' as a dependency

  useEffect(() => {
    if (po) {
      navigate(`/po/${po}`);
    }
  }, [po, navigate]);

  // Filter the polist based on the searchQuery
  const filteredPolist = polist.filter(
    (po) =>
      po.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      po.poType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <MainHeader />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-12">
            <div className="card_pos">
              <div className="card">
                <div className="card_headline">
                  <div className="input_search">
                    <input
                      type="text"
                      className="form-control"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
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
                      {filteredPolist.length === 0 ? (
                        <tr>
                          <td colSpan="7">No data found</td>
                        </tr>
                      ) : (
                        filteredPolist.map((po, index) => (
                          <tr key={index}>
                            <td>
                              <button onClick={() => dispatch(poHandler(po))}>
                                {po.poNumber}
                              </button>
                              <br />
                              <span>
                                POTYPE
                                <span style={{ marginLeft: "5px" }}>
                                  &#10163;
                                </span>
                                {po.poType}
                              </span>
                            </td>
                            <td>
                              {/* SDBG Date:{" "} */}
                              {po.SDVG ? (
                                <>
                                  {/* {typeof po.SDVG.created_at === "number"
                                    ? moment(po.SDVG.created_at).format(
                                        "DD-MM-YYYY "
                                      )
                                    : "N/A"}{" "}
                                  <br /> */}
                                  Contractual Submission:
                                  <br />
                                  {po.SDVG.contractual_submission_date
                                    ? moment(
                                        po.SDVG.contractual_submission_date
                                      ).format("DD-MM-YYYY ")
                                    : "N/A"}
                                  <br />
                                  Actual Submission:
                                  <br />
                                  {po.SDVG.actual_submission_date
                                    ? moment(
                                        po.SDVG.actual_submission_date
                                      ).format("DD-MM-YYYY ")
                                    : "N/A"}
                                  <br />
                                  Status:
                                  {po.SDVG.status || "N/A"}
                                </>
                              ) : (
                                "N/A"
                              )}
                            </td>
                            <td>
                              {/* Drawing Date:{" "} */}
                              {po.Drawing ? (
                                <>
                                  {/* {typeof po.Drawing.created_at === "number"
                                    ? moment(po.Drawing.created_at).format(
                                        "DD-MM-YYYY "
                                      )
                                    : "N/A"}{" "}
                                  <br /> */}
                                  Contractual Submission:
                                  <br />
                                  {po.Drawing.contractual_submission_date
                                    ? moment(
                                        po.Drawing.contractual_submission_date
                                      ).format("DD-MM-YYYY ")
                                    : "N/A"}
                                  <br />
                                  Actual Submission:
                                  <br />
                                  {po.Drawing.actual_submission_date
                                    ? moment(
                                        po.Drawing.actual_submission_date
                                      ).format("DD-MM-YYYY ")
                                    : "N/A"}
                                  <br />
                                  Status:
                                  {po.Drawing.status || "N/A"}
                                </>
                              ) : (
                                "N/A"
                              )}
                            </td>
                            <td>
                              {/* QAP Date:{" "} */}
                              {po.qapSubmission ? (
                                <>
                                  {/* {typeof po.qapSubmission.created_at ===
                                  "number"
                                    ? moment(
                                        po.qapSubmission.created_at
                                      ).format("DD-MM-YYYY ")
                                    : "N/A"}{" "}
                                  <br /> */}
                                  Contractual Submission:
                                  <br />
                                  {po.qapSubmission.contractual_submission_date
                                    ? moment(
                                        po.qapSubmission
                                          .contractual_submission_date
                                      ).format("DD-MM-YYYY ")
                                    : "N/A"}
                                  <br />
                                  Actual Submission: <br />
                                  {po.qapSubmission.actual_submission_date
                                    ? moment(
                                        po.qapSubmission.actual_submission_date
                                      ).format("DD-MM-YYYY ")
                                    : "N/A"}
                                  <br />
                                  Status:
                                  {po.qapSubmission.status || "N/A"}
                                </>
                              ) : (
                                "N/A"
                              )}
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
