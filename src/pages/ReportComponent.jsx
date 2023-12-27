import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { apiCallBack } from "../utils/fetchAPIs";
import { useSelector } from "react-redux";

const ReportComponent = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Bar Chart",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [],
      },
    ],
  });
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [logCount, setLogCount] = useState(0);
  const { token, user } = useSelector((state) => state.auth);

  const { id } = useParams();

  const handleSearch = async () => {
    try {
      const formDataToSend = {
        user_id: 600231,
        page: currentPage,
        limit: 2,
      };

      const response = await apiCallBack(
        "POST",
        "po/deptwiselog",
        formDataToSend,
        token
      );

      const chartLabels = response.data.report.map((entry) => entry.status);
      const chartDataValues = response.data.report.map(
        (entry) => entry.status_count
      );

      setChartData({
        labels: chartLabels,
        datasets: [
          {
            label: "Bar Chart",
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: chartDataValues,
          },
        ],
      });

      setTableData(response.data.result);
      setLogCount(response.data.logCount);
    } catch (error) {
      console.error("Error fetching log data:", error.message);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const options = {
    scales: {
      x: {
        type: "category",
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <SideBar />
      <div className="wrapper d-flex flex-column flex-row-fluid">
        <Header title={"Log Report"} id={id} />
        <div className="container mt-4">
          <form>
            <div className="row mb-3">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="startDate">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="endDate">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="endDate"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="col align-self-end">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </form>

          <div className="row mt-4 justify-content-center">
            <div className="col-12 col-md-6">
              <Bar data={chartData} options={options} />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col">
              <table className="table table-striped table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Date Time</th>
                    <th>PO Number</th>
                    <th>Remarks</th>
                    <th>Updated By</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.datetime}</td>
                      <td>{row.purchasing_doc_no}</td>
                      <td>{row.remarks}</td>
                      <td>Mrinmoy Ghosh ({row.id})</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: Math.ceil(logCount / 2) }).map(
                    (_, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    )
                  )}
                  <li
                    className={`page-item ${
                      currentPage === Math.ceil(logCount / 2) ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportComponent;
