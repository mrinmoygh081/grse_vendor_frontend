import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutHandler } from "../redux/slices/loginSlice";
import { poRemoveHandler } from "../redux/slices/poSlice";
import { reConfirm } from "../utils/reConfirm";
import { toast } from "react-toastify";
import { apiCallBack } from "../utils/fetchAPIs";
import DynamicButton from "../Helpers/DynamicButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { convertToEpoch } from "../utils/getDateTimeNow";

const SyncComponent = () => {
  // const inputFileRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState({
    dataSync: new Date(new Date().setDate(new Date().getDate() - 1)),
    fileSync: new Date(new Date().setDate(new Date().getDate() - 1)),
  });

  const dispatch = useDispatch();

  const logOutFun = () => {
    dispatch(logoutHandler());
    dispatch(poRemoveHandler());
  };

  // const downloadDataHandler = async () => {
  //   try {
  //     const resp = await apiCallBack("POST", "sync/sync_download", null, null);
  //     console.log("resp", resp);
  //     if (resp.status) {
  //       const upRes = await apiCallBack("POST", "sync/sync_zip", null, null);
  //       if (upRes?.status) {
  //         toast.success(upRes.message || "Data has been downloaded");
  //       } else {
  //         toast.info(upRes.message);
  //       }
  //     } else {
  //       toast.info(resp.message);
  //     }
  //   } catch (error) {
  //     toast.error(
  //       "Sync failed: " + (error.response?.data?.message || error.message)
  //     );
  //   }
  // };

  console.log("selectedDate", selectedDate);

  const DataUploadHndlar = async () => {
    try {
      console.log("formData?.data", selectedDate?.dataSync);
      if (!selectedDate?.dataSync || selectedDate?.dataSync === "") {
        return toast.info("Zip File is mandatory.");
      }
      let payload = {
        from_date: selectedDate?.dataSync,
      };
      const resp = await apiCallBack("POST", "sync/sync_unzip", payload, null);
      if (resp.status) {
        console.log(resp, "resp file dataSync");
        toast.success(resp.message || "Data has been synced");
      } else {
        toast.info(resp.message);
      }
    } catch (error) {
      toast.error(
        "Sync failed: " + (error.response?.data?.message || error.message)
      );
    }
  };

  // const fileDownloadHandler = async () => {
  //   try {
  //     let payload = {
  //       sync_date: new Date(selectedDate).getTime(),
  //     };
  //     const response = apiCallBack(
  //       "POST",
  //       "/sync/sync_file_zip",
  //       payload,
  //       null
  //     );
  //     toast.success(response.data.message || "File sync successful");
  //   } catch (error) {
  //     toast.error(
  //       "File sync failed: " + (error.response?.data?.message || error.message)
  //     );
  //   }
  // };

  const uploadFileHandler = async () => {
    try {
      if (!selectedDate?.fileSync || selectedDate?.fileSync === "") {
        return toast.info("Zip File is mandatory.");
      }
      let payload = {
        from_date: selectedDate?.fileSync,
      };
      console.log("payload", payload);
      const resp = await apiCallBack(
        "POST",
        "sync/sync_file_upload",
        payload,
        null
      );
      if (resp.status) {
        console.log(resp, "resp file dataSync");
        toast.success(resp.message || "File has been synced");
      } else {
        toast.info(resp.message);
      }
    } catch (error) {
      toast.error(
        "File sync failed: " + (error.response?.data?.message || error.message)
      );
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
            {/* <div className="col-md-6">
              <h3>Download Unsynced Data</h3>
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
                  Open a specific folder path to this server
                  (/var/www/html/obps/obps_backend/sync/otherServerData/Data){" "}
                </li>
                <li>Create a Directory named as today's date (DD-MM-YYYY)</li>
                <li>
                  Paste the copied sync_data.zip inside the today's date folder
                </li>
              </ol> 
              <DynamicButton
                label="DOWNLOAD DATA"
                onClick={() => downloadDataHandler()}
                className="btn btn-primary btn-sm mt-2"
              />
            </div> */}
            <div className="col-md-6">
              <h3>Upload Unsynced Data</h3>
              <ol>
                <li>
                  Copy all required folders (named according to the date of the
                  dump) stored on the other server in a specific path
                  (/var/www/html/obps/obps_backend/sync/unsyncedFiles/"DD-MM-YYYY").
                </li>
                <li>
                  Transfer the folders from the other server to the server where
                  this website is running.
                </li>
                <li>
                  Open a specific folder path to this server <br />
                  (/var/www/html/obps/obps_backend/sync/otherServerData/Data){" "}
                </li>
                <li>Paste the copied folders into the specified folder.</li>
              </ol>
              <label htmlFor="">Select From Date You want to Sync Data:</label>
              <DatePicker
                selected={selectedDate?.dataSync}
                onChange={(date) =>
                  setSelectedDate({ ...selectedDate, dataSync: date })
                }
                className="form-control my-2"
                placeholderText="Select Date"
                maxDate={new Date(new Date().setDate(new Date().getDate() - 1))}
              />
              <DynamicButton
                label="UPLOAD DATA"
                onClick={() => DataUploadHndlar()}
                className="btn btn-primary btn-sm mt-2"
              />
            </div>
            <div className="col-md-6">
              <h3>Upload Unsynced File</h3>
              <ol>
                <li>
                  Copy all required folders (named according to the date of the
                  dump) stored on the other server in a specific path
                  (/var/www/html/obps/obps_backend/sync/unsyncedFiles/"DD-MM-YYYY").
                </li>
                <li>
                  Transfer the folders from the other server to the server where
                  this website is running.
                </li>
                <li>
                  Open a specific folder path to this server <br />
                  (/var/www/html/obps/obps_backend/sync/otherServerData/Files){" "}
                </li>
                <li>Paste the copied folders into the specified folder.</li>
              </ol>
              <label htmlFor="">Select From Date You want to Sync File:</label>
              <DatePicker
                selected={selectedDate?.fileSync}
                onChange={(date) =>
                  setSelectedDate({ ...selectedDate, fileSync: date })
                }
                className="form-control my-2"
                placeholderText="Select Date"
                maxDate={new Date(new Date().setDate(new Date().getDate() - 1))}
              />
              <DynamicButton
                label="UPLOAD FILE"
                onClick={uploadFileHandler}
                className="btn btn-primary btn-sm mt-2"
              />
            </div>
          </div>

          {/* New section for Sync Download and Sync Upload */}
          <div className="row mt-4">
            {/* <div className="col-md-6">
              <h3>Download Unsynced File</h3>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="form-control my-2"
                placeholderText="Select Date"
                maxDate={new Date()}
              />

              <DynamicButton
                label="DOWNLOAD FILE"
                onClick={fileDownloadHandler}
                className="btn btn-primary btn-sm mt-2"
              />
            </div> */}
          </div>
        </div>
      </div>
      <div className="d-flex mt-3">
        <button
          className="btn btn-danger ms-auto"
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
