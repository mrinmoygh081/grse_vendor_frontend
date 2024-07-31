import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logoutHandler } from "../redux/slices/loginSlice";
import { poRemoveHandler } from "../redux/slices/poSlice";
import { reConfirm } from "../utils/reConfirm";
import { toast } from "react-toastify";
import { apiCallBack } from "../utils/fetchAPIs";
import DynamicButton from "../Helpers/DynamicButton";

const SyncComponent = () => {
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");
  const dispatch = useDispatch();

  const logOutFun = () => {
    dispatch(logoutHandler());
    dispatch(poRemoveHandler());
    // window.location.href = "/";
  };

  const handleSync = async () => {
    setSyncing(true);
    setSyncMessage("");
    try {
      const resp = await apiCallBack("POST", "sync/sync_unzip", null, null);
      console.log(resp);
      if (resp.status) {
        const upRes = await apiCallBack("POST", "sync/sync_upload", null, null);
        if (upRes?.status) {
          toast.success(upRes.message || "Data has been synced");
        } else {
          toast.info(upRes.message);
        }
      } else {
        toast.info(resp.message);
      }
    } catch (error) {
      toast.error(
        "Sync failed: " + (error.response?.data?.message || error.message)
      );
    }
    setSyncing(false);
  };

  const handleFileSync = async () => {
    setSyncing(true);
    setSyncMessage("");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/sync/sync_file_upload`
      );
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
            Garden Reach Shipbuilders & Engineers Ltd. <br /> (A GOVT.OF INDIA
            UNDERTAKING)
          </h1>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <ol>
                <li>
                  Copy The Zip File named as sync_data.zip stored in the other
                  server in a specific path
                  (/var/www/html/obps/obps_backend/sync/zipData/
                  {"<Latest Date>"})
                </li>
                <li>
                  Transfer the sync_data.zip file from the other server to the
                  this server where this website is running on.
                </li>
                <li>
                  Open a specic folder path to this server
                  (/var/www/html/obps/obps_backend/sync/otherServerData/Data){" "}
                </li>
                <li>Create a Directory named as today's date (DD-MM-YYYY)</li>
                <li>
                  Paste the copied sync_data.zip inside the today's date folder
                </li>
              </ol>
              {/* <button
                className="btn btn-primary btn-sm mt-2"
                onClick={() => handleSync()}
                disabled={syncing}
              >
                Sync Data
              </button> */}
              <DynamicButton
                label="Sync Data"
                onClick={() => handleSync()}
                className="btn btn-primary btn-sm mt-2"
              />
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
              {/* <button
                className="btn btn-secondary btn-sm mt-2"
                disabled={syncing}
                onClick={() => handleFileSync()}
              >
                Sync File
              </button> */}
              <DynamicButton
                label=" Sync File"
                onClick={() => handleFileSync()}
                className="btn btn-secondary btn-sm mt-2"
              />
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
