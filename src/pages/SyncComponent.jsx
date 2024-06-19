import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logoutHandler } from "../redux/slices/loginSlice";
import { poRemoveHandler } from "../redux/slices/poSlice";
import { reConfirm } from "../utils/reConfirm";
import { ToastContainer, toast } from "react-toastify";

const SyncComponent = () => {
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");
  const dispatch = useDispatch();

  const logOutFun = () => {
    dispatch(logoutHandler());
    dispatch(poRemoveHandler());
    window.location.href = "/";
  };

  const handleSync = async (endpoint) => {
    setSyncing(true);
    setSyncMessage("");
    try {
      const response = await axios.post(endpoint);
      toast.success(response.data.message || "Sync successful");
      if (response.data.status) {
        const uploadResponse = await axios.post(
          `${process.env.REACT_APP_BACKEND_API}/sync/sync_upload`
        );
        toast.success(uploadResponse.data.message || "Data has been synced");
      }
    } catch (error) {
      toast.error(
        "Sync failed: " + (error.response?.data?.message || error.message)
      );
    }
    setSyncing(false);
  };

  const handleFileSync = async (endpoint) => {
    setSyncing(true);
    setSyncMessage("");
    try {
      const response = await axios.post(endpoint);
      toast.success(response.data.message || "File sync successful");
    } catch (error) {
      toast.error(
        "File sync failed: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div
          className="card-header text-center"
          style={{ margin: "20px auto" }}
        >
          <img
            src={require("../images/logo.png")}
            alt="Logo"
            className="img-fluid"
            style={{ width: "60px", marginRight: "10px" }}
          />
          <h1 className="card-title mt-3" style={{ marginBottom: "10px" }}>
            Garden Reach Shipbuilders & Engineers Ltd. (A GOVT.OF INDIA
            UNDERTAKING)
          </h1>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <ol>
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                  Quisque scelerisque diam non nisi semper, et elementum lorem
                  ornare.
                </li>
                <li>Maecenas placerat facilisis mollis.</li>
                <li>Duis sagittis ligula in sodales vehicula.</li>
                <li>Vivamus pretium suscipit leo at tincidunt.</li>
                <li>Etiam cursus laoreet ultricies.</li>
              </ol>
              <button
                className="btn btn-primary btn-sm mt-2"
                onClick={() =>
                  handleSync(
                    `${process.env.REACT_APP_BACKEND_API}/sync/sync_unzip`
                  )
                }
                disabled={syncing}
              >
                Sync Data
              </button>
            </div>
            <div className="col-md-6">
              <ol>
                <li>Ensure all data is up-to-date before syncing.</li>
                <li>Check your network connection.</li>
                <li>Do not close the browser while syncing.</li>
                <li>Contact support if you encounter any issues.</li>
                <li>Refer to the documentation for detailed instructions.</li>
                <li>Log out and log in again if the sync fails repeatedly.</li>
              </ol>
              <button
                className="btn btn-secondary btn-sm mt-2"
                disabled={syncing}
                onClick={() =>
                  handleFileSync(
                    `${process.env.REACT_APP_BACKEND_API}/sync/sync_file_upload`
                  )
                }
              >
                Sync File
              </button>
            </div>
          </div>
          {syncMessage && (
            <div className="alert alert-info mt-3">{syncMessage}</div>
          )}
        </div>
      </div>
      <div className="d-flex mt-3">
        <button
          className="btn btn-danger ms-auto"
          href={"#"}
          onClick={() =>
            reConfirm({ file: true }, logOutFun, "You're going to Logout!")
          }
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SyncComponent;
