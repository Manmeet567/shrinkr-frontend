import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { setAnalyticsCurrentPage } from "../../redux/slices/analyticsSlice";
import { useDispatch, useSelector } from "react-redux";
import "./AnalyticsComponent.css";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { fetchAnalytics } from "../../redux/slices/analyticsSlice";

const AnalyticsComponent = () => {
  const dispatch = useDispatch();
  const { analyticsByPage, totalPages, currentPage, loading } = useSelector(
    (state) => state.analytics
  );

  const { shortUrlIds } = useSelector((state) => state.links);

  useEffect(() => {
    if (shortUrlIds && shortUrlIds.length > 0) {
      dispatch(fetchAnalytics({ shortUrlIds, page: currentPage, limit: 10 }));
    }
  }, [shortUrlIds]);

  const analytics = analyticsByPage[currentPage] || [];

  const columns = [
    {
      name: "Timestamp",
      selector: (row) =>
        new Date(row.createdAt).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      sortable: true,
    },
    {
      name: "Original Link",
      selector: (row) => row.original_url,
      cell: (row) => (
        <a
          href={row.original_url}
          target="_blank"
          rel="noopener noreferrer"
          className="analytics-original-link"
          style={{
            color: "#3B3C51",
          }}
        >
          {row.original_url}
        </a>
      ),
    },
    {
      name: "Short Link",
      selector: (row) => row.short_url_id,
      cell: (row) => (
        <p
          className="analytics-short-link"
          style={{
            color: "#3B3C51",
          }}
        >
          {`${import.meta.env.VITE_SERVER_BASE_URL}/${row.short_url_id}`}
        </p>
      ),
    },
    {
      name: "IP Address",
      selector: (row) => row.IP || "N/A",
    },
    {
      name: "User Device",
      selector: (row) => row.user_os || "Unknown",
    },
  ];

  const customStyles = {
    tableWrapper: {
      style: {
        borderRadius: "8px",
        overflow: "auto",
        border: "0.5px solid #F8F8F8",
        width: "100%",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#F3F7FD",
        fontWeight: "600",
        fontSize: "16px",
        color: "#3B3C51",
        padding: "20px 24px",
      },
    },
    rows: {
      style: {
        backgroundColor: "#fff",
      },
    },
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      dispatch(setAnalyticsCurrentPage(page));
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`pagination-button ${
            i === currentPage ? "pb-active" : ""
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="analytics-component">
      {loading ? (
        <p>Loading...</p>
      ) : analytics?.length === 0 ? (
        <p>No analytics data available.</p>
      ) : (
        <div className="ac-data-table">
          <div className="acd-table">
            <DataTable
              columns={columns}
              data={analytics}
              customStyles={customStyles}
            />
          </div>
          {/* Pagination */}
          <div className="pagination-container">
            <button
              className="pagination-button-un"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <GrFormPrevious />
            </button>
            {renderPageNumbers()}
            <button
              className="pagination-button-un"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <GrFormNext />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsComponent;
