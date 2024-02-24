import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutHandler } from "../redux/slices/loginSlice";
import { apiCallBack } from "../utils/fetchAPIs";
import { poHandler } from "../redux/slices/poSlice";
import { FiSearch } from "react-icons/fi";
import moment from "moment";
import MainHeader from "../components/MainHeader";
import WBS from "./WBS";

const POs = () => {
  const dispatch = useDispatch();
  const [polist, setPolist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { token, user } = useSelector((state) => state.auth);
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
      (po?.poNumber &&
        po?.poNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (po?.poType &&
        po?.poType.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (po?.vendor_code &&
        po?.vendor_code.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (po?.vendor_name &&
        po?.vendor_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (po?.wbs_id &&
        po?.wbs_id.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (po?.project_code &&
        po?.project_code.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      {user.department_name !== "PPC" && <MainHeader title={"POs"} />}
      {user.department_name !== "PPC" ? (
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
                        {filteredPolist && filteredPolist.length === 0 ? (
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
                                <br />
                                <span>
                                  Vendor: {po.vendor_code} ({po.vendor_name})
                                </span>
                                {user && user?.user_type !== 1 && (
                                  <>
                                    <br />
                                    <span>Project Code: {po.project_code}</span>
                                    <br />
                                    <span>WBS: {po.wbs_id}</span>
                                  </>
                                )}
                              </td>
                              <td>
                                {/* SDBG Date:{" "} */}
                                {po?.SDVG ? (
                                  <>
                                    Contractual:
                                    <br />
                                    {po?.SDVG?.contractual_submission_date
                                      ? new Date(
                                          po.SDVG.contractual_submission_date
                                        ).toLocaleDateString()
                                      : "N/A"}
                                    <br />
                                    Actual:
                                    <br />
                                    {po.SDVG.actual_submission_date
                                      ? moment(
                                          po.SDVG.actual_submission_date
                                        ).format("DD/MM/YY HH:mm ")
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
                                        ).format("DD/MM/YY HH:mm ")
                                      : "N/A"}
                                    <br />
                                    Actual Submission:
                                    <br />
                                    {po.Drawing.actual_submission_date
                                      ? moment(
                                          po.Drawing.actual_submission_date
                                        ).format("DD/MM/YY HH:mm ")
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
                                    {po.qapSubmission
                                      .contractual_submission_date
                                      ? moment(
                                          po.qapSubmission
                                            .contractual_submission_date
                                        ).format("DD/MM/YY HH:mm ")
                                      : "N/A"}
                                    <br />
                                    Actual Submission: <br />
                                    {po.qapSubmission.actual_submission_date
                                      ? moment(
                                          po.qapSubmission
                                            .actual_submission_date
                                        ).format("DD/MM/YY HH:mm ")
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
      ) : (
        <WBS />
      )}
      <div className="pos_bottom">
        <button
          className="btn btn-danger"
          onClick={() => {
            dispatch(logoutHandler());
            window.location.href = "/";
          }}
        >
          Log Out
        </button>
      </div>
    </>
  );
};

export default POs;
