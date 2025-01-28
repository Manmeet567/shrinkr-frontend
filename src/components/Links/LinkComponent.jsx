import React from "react";
import DataTable from "react-data-table-component";
import { setCurrentPage } from "../../redux/slices/linkSlice";
import { useDispatch, useSelector } from "react-redux";
import "./LinkComponent.css";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { IoCopyOutline } from "react-icons/io5";
import { getLinks } from "../../redux/slices/linkSlice";

const getStatus = (expiration) => {
  const currentDate = new Date();
  return expiration === null || new Date(expiration) > currentDate
    ? "Active"
    : "Inactive";
};

const LinkComponent = () => {
  const dispatch = useDispatch();
  const { linksByPage, totalPages, currentPage, loading, shortUrlIds } =
    useSelector((state) => state.links);
  const limit = 10;

  const links = linksByPage[currentPage] || [];

  const columns = [
    {
      name: "Date",
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
      selector: (row) => row.destination_url,
      cell: (row) => (
        <a
          href={row.destination_url}
          target="_blank"
          rel="noopener noreferrer"
          className="sl-original-link"
          style={{
            color: "#3B3C51",
          }}
        >
          {row.destination_url}
        </a>
      ),
    },
    {
      name: "Short Link",
      selector: (row) => row.short_url_id,
      cell: (row) => (
        <div className="sl-container">
          <p
            className="sl-link"
            style={{
              color: "#3B3C51",
            }}
          >
            {`${import.meta.env.VITE_SERVER_BASE_URL}/${row.short_url_id}`}
          </p>
          <IoCopyOutline className="sl-copy-icon" />
        </div>
      ),
    },
    {
      name: "Remarks",
      selector: (row) => row.remarks,
    },
    {
      name: "Clicks",
      selector: (row) => row.clicks || "N/A",
    },
    {
      name: "Status",
      selector: (row) => getStatus(row.expiration),
      sortable: true,
      cell: (row) => {
        const status = getStatus(row.expiration);
        const color = status === "Active" ? "#1EB036" : "#B0901E";
        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      name: "Action",
      cell: () => (
        <div>
          <MdEdit className="icon-button" />
          <RiDeleteBin6Line className="icon-button" />
        </div>
      ),
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
      if (page !== currentPage) {
        dispatch(setCurrentPage(page));
        dispatch(getLinks({ page, limit })); 
      }
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
    <div className="link-component">
      {loading ? (
        <p>Loading...</p>
      ) : links?.length === 0 ? (
        <p>Please create one link</p>
      ) : (
        <div className="lc-data-table">
          <div className="lcdt-table">
            <DataTable
              columns={columns}
              data={links}
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

export default LinkComponent;
