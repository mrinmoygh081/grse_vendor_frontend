import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutHandler } from "../redux/slices/loginSlice";

const POs = () => {
  const dispatch = useDispatch();

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
                      <tr>
                        <td>
                          <Link to={"/po/7890978789"}>7890978789</Link>
                        </td>
                      </tr>
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
