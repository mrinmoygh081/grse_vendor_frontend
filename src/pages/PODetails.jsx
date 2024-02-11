import React, { Fragment, useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { apiCallBack, postAPI } from "../utils/fetchAPIs";
import { useDispatch, useSelector } from "react-redux";
import { doHandler } from "../redux/slices/poSlice";
import moment from "moment";
import { toast } from "react-toastify";
import axios from "axios";
import swal from "sweetalert";

const PODetails = () => {
  const dispatch = useDispatch();
  const [poDetails, setPoDetails] = useState([]);
  const [file, setFile] = useState(null);
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [isPopup, setIsPopup] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await apiCallBack("GET", `po/details?id=${id}`, null, token);
      if (data?.status) {
        setPoDetails(data?.data);
        dispatch(doHandler(data?.data[0].isDO));
      }
    })();
  }, [id]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const reConfirmcheckHandleUploadChange = () => {
    if (file) {
      swal({
        title: "Are you sure?",
        text: "Once updated, the previous TNC minutes will be updated if uploaded!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          handleUploadTNCMinutes();
        }
      });
    } else {
      swal({
        title: "Warning",
        text: "You forget to add a file!",
        icon: "warning",
        button: true,
      });
    }
  };

  const handleUploadTNCMinutes = async () => {
    try {
      const formData = new FormData();
      formData.append("purchasing_doc_no", id);
      formData.append("file", file);

      const response = await apiCallBack(
        "POST",
        "upload/tncminutes",
        formData,
        token
      );

      if (response.status === true) {
        toast.success("TNC Minutes uploaded successfully!");

        setIsPopup(false);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error("Error uploading TNC Minutes:", error.message);
      toast.error("Error uploading TNC Minutes. Please try again.");
    }
  };
  const handleViewTNCMinutes = async () => {
    try {
      console.log(process.env.REACT_APP_PDF_URL);
      const response = await axios.get(
        `${process.env.REACT_APP_PDF_URL}/tncminutes/${id}.pdf`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const contentType = response.headers["content-type"];
      if (contentType !== "application/pdf") {
        console.error("Invalid content type:", contentType);
        toast.error("Invalid content type. Expected application/pdf.");
        return;
      }

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      window.open(url, "_blank");
    } catch (error) {
      console.error("Error viewing TNC Minutes:", error.message);
      toast.error("Error viewing TNC Minutes. Please try again.");
    }
  };
  const handleViewSAPPO = async () => {
    try {
      const d = await apiCallBack(
        "GET",
        `po/download/latestDocFile?poNo=${id}`,
        null,
        token
      );
      if (d?.status) {
        window.open(
          `${process.env.REACT_APP_ROOT_URL}sapuploads/po/${d.data[0].file_name}`
        );
      }
    } catch (error) {
      console.error("Error viewing TNC Minutes:", error.message);
      toast.error("Error viewing TNC Minutes. Please try again.");
    }
  };

  return (
    <>
      <main>
        <div className="d-flex flex-column flex-root">
          <div className="page d-flex flex-row flex-column-fluid">
            <SideBar id={id} />
            <div className="wrapper d-flex flex-column flex-row-fluid">
              <Header title={"Dashboard"} id={id} />
              <div
                className="content d-flex flex-column flex-column-fluid"
                id="kt_content"
              >
                <div className="post d-flex flex-column-fluid">
                  <div className="container-xxl">
                    <div className="row g-5 g-xl-8">
                      <div className="col-12">
                        <div className="screen_header">
                          <div className="screen_header_top">
                            {/* <h2>
                              Welcome <span>Admin</span>
                            </h2> */}
                          </div>
                        </div>
                        <div>
                          <div className="d-flex align-items-center pb-3 justify-content-between">
                            <h1>Purchase Order Details</h1>
                            <div className="d-flex">
                              <button
                                className="btn btn-primary me-3"
                                onClick={() => setIsPopup(true)}
                                style={{
                                  display:
                                    poDetails.length > 0 && poDetails[0].isDO
                                      ? "inline-block"
                                      : "none",
                                }}
                              >
                                Upload TNC Minutes
                              </button>
                              <button
                                className="btn btn-primary me-3"
                                onClick={handleViewTNCMinutes}
                              >
                                Download TNC Minutes
                              </button>
                              <button
                                className="btn btn-primary"
                                onClick={handleViewSAPPO}
                              >
                                Download SAP PO
                              </button>
                            </div>
                          </div>
                          {poDetails &&
                            poDetails.map((po, index) => (
                              <div key={index}>
                                <div className="row">
                                  <div className="col-12 col-md-5">
                                    <div className="card card-xxl-stretch mb-5 mb-xxl-8">
                                      <div className="card-body py-3">
                                        <div className="card_header_data">
                                          <span className="label">
                                            PO Number:
                                          </span>
                                          <span className="label_data">
                                            {po.EBELN}
                                          </span>
                                        </div>
                                        <div className="card_header_data">
                                          <span className="label">
                                            PO Date:
                                          </span>
                                          <span className="label_data">
                                            {moment(po.AEDAT)
                                              .utc()
                                              .format("YYYY-MM-DD")}
                                            {/* {po.AEDAT} */}
                                          </span>
                                        </div>
                                        <div className="card_header_data">
                                          <span className="label">Vendor:</span>
                                          <span className="label_data">
                                            {po.LIFNR} (<span>{po.NAME1}</span>)
                                          </span>
                                        </div>
                                        <div className="card_header_data">
                                          <span className="label">
                                            Purchase Group:
                                          </span>
                                          <span className="label_data">
                                            {po.EKGRP}
                                          </span>
                                        </div>
                                        <div className="card_header_data">
                                          <span className="label_data">
                                            {/* PO Acceptance Date */}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {po.timeline === "" ? (
                                    ""
                                  ) : (
                                    <div className="col-12 col-md-7">
                                      <div className="card card-xxl-stretch mb-5 mb-xxl-8">
                                        <div className="card-body py-3">
                                          {po?.timeline &&
                                            po.timeline.map((it, index) => (
                                              <Fragment key={index}>
                                                <div className="card_header_data">
                                                  <span className="label">
                                                    {/* Contractual SDBG/IB submission date: */}
                                                    {it?.MTEXT} :
                                                  </span>
                                                  <span className="label_data">
                                                    {moment(
                                                      it?.PLAN_DATE
                                                    ).format("YYYY-MM-DD")}{" "}
                                                    ({it?.status})
                                                  </span>
                                                </div>
                                              </Fragment>
                                            ))}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <div className="card card-xxl-stretch mb-5 mb-xxl-8 customer_feedback">
                                  {/* Add customer feedback information here */}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div className="col-12 customer_feedback">
                        <div className="card card-xxl-stretch mb-5 mb-xxl-8">
                          {/* <div className="card-header border-0 pt-5 justify-content-between">
                            <h3 className="card-title align-items-start flex-column">
                              <span className="card-label fw-bold fs-3 mb-1">
                                POs
                              </span>
                            </h3>
                          </div> */}

                          <div className="card-body py-3">
                            <div className="tab-content">
                              <div className="table-responsive">
                                <table className="table table-striped table-bordered table_height">
                                  <thead>
                                    <tr className="border-0">
                                      <th className="">Item number</th>
                                      <th>Material code</th>
                                      <th>Description</th>
                                      <th>Quanity</th>
                                      <th>UOM</th>
                                      <th>Contractual delivery date </th>
                                    </tr>
                                  </thead>
                                  {/* <tbody style={{ maxHeight: "100%" }}>
                                    {poDetails.MAT_DETAILS ? (
                                      poDetails.MAT_DETAILS.map((material) => (
                                        <tr key={material.EBELP}>
                                          <td>{material.EBELP}</td>
                                          <td>{material.MATNR}</td>
                                          <td>{material.TXZ01}</td>
                                          <td>{material.MENGE}</td>
                                          <td>{material.MEINS}</td>
                                          <td>{material.KTMNG}</td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan="6">
                                          No material details available.
                                        </td>
                                      </tr>
                                    )}
                                  </tbody> */}
                                  <tbody style={{ maxHeight: "100%" }}>
                                    {poDetails.length > 0 ? (
                                      poDetails.map((po) =>
                                        po.materialResult.map(
                                          (material, index) => (
                                            <tr key={index}>
                                              <td>
                                                {material.material_item_number}
                                              </td>
                                              <td>{material.material_code}</td>
                                              <td>
                                                {material.mat_description}
                                              </td>
                                              <td>
                                                {material.material_quantity}
                                              </td>
                                              <td>{material.material_unit}</td>
                                              <td>
                                                {material.contractual_delivery_date ==
                                                null
                                                  ? "no date found"
                                                  : moment(
                                                      material.contractual_delivery_date
                                                    ).format("YYYY-MM-DD")}
                                              </td>
                                            </tr>
                                          )
                                        )
                                      )
                                    ) : (
                                      <tr>
                                        <td colSpan="6">
                                          😔No material details available.😔
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                                {/* <div className="d-flex align-items-center justify-content-between py-3">
                                  <button className="btn fw-bold btn-info">
                                    ADD NEW
                                  </button>
                                  <div>
                                    <button className="btn fw-bold btn-primary mx-3">
                                      Stop
                                    </button>
                                    <button className="btn fw-bold btn-primary">
                                      Send
                                    </button>
                                  </div>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={isPopup ? "popup active" : "popup"}>
                        <div className="card card-xxl-stretch mb-5 mb-xxl-8">
                          <div className="card-header border-0 pt-5">
                            <h3 className="card-title align-items-start flex-column">
                              <span className="card-label fw-bold fs-3 mb-1">
                                Upload TNC Minutes
                              </span>
                            </h3>
                            <button
                              className="btn fw-bold btn-danger"
                              onClick={() => setIsPopup(false)}
                            >
                              Close
                            </button>
                          </div>
                          <form>
                            <div className="row">
                              <div className="col-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Choose File
                                  </label>
                                  <input
                                    type="file"
                                    className="form-control"
                                    onChange={handleFileChange}
                                  />
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="mb-3">
                                  <button
                                    type="button"
                                    className="btn fw-bold btn-primary"
                                    onClick={reConfirmcheckHandleUploadChange}
                                  >
                                    UPDATE
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
        {/* <div className={isPopup.isPop ? "popup active" : "popup"}>
          <div className="card card-xxl-stretch mb-5 mb-xxl-8">
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">
                  Instructions
                </span>
                <span className="text-muted mt-1 fw-semibold fs-7">
                  {imagesData && `Total ${imagesData.length} Instructions`}
                </span>
              </h3>
              <button
                className="btn fw-bold btn-danger"
                onClick={() =>
                  setIsPopup({
                    isPop: false,
                    itemNo: null,
                  })
                }
              >
                Close
              </button>
            </div>
            <div className="row">
              {imagesData &&
                imagesData.length > 0 &&
                imagesData.map((item, index) => (
                  <div className="col-12 col-md-3" key={index}>
                    <div
                      className={
                        selected.image == item?.instruction_id
                          ? "image_list active"
                          : "image_list"
                      }
                      onClick={() => handleSelectImg(item)}
                    >
                      <Image
                        loader={({ src }) => {
                          return `uploads/${src}`;
                        }}
                        src={item?.instruction_img}
                        alt=""
                        width={300}
                        height={150}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div> */}
      </main>
    </>
  );
};

export default PODetails;
