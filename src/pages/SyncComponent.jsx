import React, { useState } from "react";
import axios from "axios";

const SyncComponent = () => {
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");

  const handleSync = async (endpoint) => {
    setSyncing(true);
    setSyncMessage("");
    try {
      const response = await axios.post(endpoint);
      setSyncMessage(response.data.message || "Sync successful");
    } catch (error) {
      setSyncMessage(
        "Sync failed: " + (error.response?.data?.message || error.message)
      );
    }
    setSyncing(false);
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">GRSE Portal Sync</h1>
        </div>
        <div className="card-body">
          <p className="mb-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            scelerisque diam non nisi semper, et elementum lorem ornare.
            Maecenas placerat facilisis mollis. Duis sagittis ligula in sodales
            vehicula. Vivamus pretium suscipit leo at tincidunt. Etiam cursus
            laoreet ultricies.
          </p>
          <div className="d-flex mb-2">
            <button
              className="btn btn-primary me-2"
              onClick={() =>
                handleSync("http://localhost:4001/api/v1/sync/sync_unzip")
              }
              disabled={syncing}
            >
              Sync Unzip
            </button>
            <button
              className="btn btn-secondary"
              onClick={() =>
                handleSync("http://localhost:4001/api/v1/sync/sync_upload")
              }
              disabled={syncing}
            >
              Sync Upload
            </button>
          </div>
          {syncMessage && (
            <div className="alert alert-info mt-3">{syncMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SyncComponent;
