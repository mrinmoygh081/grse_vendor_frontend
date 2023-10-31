import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const durationOptions = [
  { value: "", label: "Choose Duration" },
  { value: "10", label: "10 Seconds" },
  { value: "30", label: "30 Seconds" },
  { value: "60", label: "60 Seconds" },
  { value: "120", label: "120 Seconds" },
];

const timeGapOptions = [
  { value: "", label: "Choose Time" },
  { value: "1", label: "1 Minute" },
  { value: "5", label: "5 Minutes" },
  { value: "10", label: "10 Minutes" },
  { value: "30", label: "30 Minutes" },
  { value: "60", label: "60 Minutes" },
  { value: "120", label: "120 Minutes" },
];

const animatedComponents = makeAnimated();

const PODetails = () => {
  return (
    <>
      <main>
        <div className="d-flex flex-column flex-root">
          <div className="page d-flex flex-row flex-column-fluid">
            <SideBar />
            <div className="wrapper d-flex flex-column flex-row-fluid">
              <Header title={"Dashboard"} />
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
                        <div className="row">
                          <div className="col-12 col-md-6">
                            <div className="card card-xxl-stretch mb-5 mb-xxl-8">
                              <div className="card-body py-3">
                                <div className="card_header_data">
                                  <span className="label">PO Number:</span>
                                  <span className="label_data">8787667099</span>
                                </div>
                                <div className="card_header_data">
                                  <span className="label">PO Date:</span>
                                  <span className="label_data">8787667099</span>
                                </div>
                                <div className="card_header_data">
                                  <span className="label">MAN:</span>
                                  <span className="label_data">8787667099</span>
                                </div>
                                <div className="card_header_data">
                                  <span className="label">Vendor Name:</span>
                                  <span className="label_data"></span>
                                </div>
                                <div className="card_header_data">
                                  <span className="label">Purchase Group:</span>
                                  <span className="label_data">8787667099</span>
                                </div>
                                <div className="card_header_data">
                                  <span className="label">
                                    PO Acceptance Date:
                                  </span>
                                  <span className="label_data">05/10/2023</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className="card card-xxl-stretch mb-5 mb-xxl-8">
                              <div className="card-body py-3">
                                <div className="card_header_data">
                                  <span className="label">
                                    Contractual SDBG/IB submission date:
                                  </span>
                                  <span className="label_data">05/10/2023</span>
                                </div>
                                <div className="card_header_data">
                                  <span className="label">
                                    Contractual drawing submission date:
                                  </span>
                                  <span className="label_data">05/10/2023</span>
                                </div>
                                <div className="card_header_data">
                                  <span className="label">
                                    Contractual QAP submission date:
                                  </span>
                                  <span className="label_data">05/10/2023</span>
                                </div>
                                <div className="card_header_data">
                                  <span className="label">
                                    Raw material stamping date/Test witness
                                    date:
                                  </span>
                                  <span className="label_data">05/10/2023</span>
                                </div>
                                <div className="card_header_data">
                                  <span className="label">
                                    Final inspection date/FAT:
                                  </span>
                                  <span className="label_data">05/10/2023</span>
                                </div>
                              </div>
                            </div>
                          </div>
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
                                  <tbody style={{ maxHeight: "100%" }}>
                                    <tr>
                                      <td className="table_center">
                                        7876655445
                                      </td>

                                      <td className="">MANDS7876</td>
                                      <td className="">MANDS7876</td>
                                      <td className="">MANDS7876</td>
                                      <td className="">MANDS7876</td>
                                      <td className="">MANDS7876</td>
                                    </tr>
                                    <tr>
                                      <td className="table_center">
                                        7876655445
                                      </td>

                                      <td className="">MANDS7876</td>
                                      <td className="">MANDS7876</td>
                                      <td className="">MANDS7876</td>
                                      <td className="">MANDS7876</td>
                                      <td className="">MANDS7876</td>
                                    </tr>
                                    <tr>
                                      <td className="table_center">
                                        7876655445
                                      </td>

                                      <td className="">MANDS7876</td>
                                      <td className="">MANDS7876</td>
                                      <td className="">MANDS7876</td>
                                      <td className="">MANDS7876</td>
                                      <td className="">MANDS7876</td>
                                    </tr>
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
