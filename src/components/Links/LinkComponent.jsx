import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { getLinks } from "../../redux/slices/linkSlice";
import { useDispatch, useSelector } from "react-redux";
import "./LinkComponent.css";

// Helper function to check link status
const getStatus = (expiration) => {
  return expiration ? "Inactive" : "Active";
};

const LinkComponent = () => {
  const dispatch = useDispatch();
  const { links, loading } = useSelector((state) => state.links);

  useEffect(() => {
    dispatch(getLinks());
  }, [dispatch]);

  // Columns for the DataTable
  const columns = [
    {
      name: "Date",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Original Link",
      selector: (row) => row.destination_url,
      cell: (row) => (
        <a href={row.destination_url} target="_blank" rel="noopener noreferrer">
          {row.destination_url}
        </a>
      ),
    },
    {
      name: "Short Link",
      selector: (row) => row.short_url_id,
      cell: (row) => (
        <a
          href={`${import.meta.env.VITE_SERVER_BASE_URL}/${row.short_url_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {`${import.meta.env.VITE_SERVER_BASE_URL}/${row.short_url_id}`}
        </a>
      ),
    },
    {
      name: "Remarks",
      selector: (row) => row.remarks,
    },
    {
      name: "Clicks",
      selector: (row) => row.clicks || "N/A", // Placeholder for clicks
    },
    {
      name: "Status",
      selector: (row) => getStatus(row.expiration),
      sortable: true,
      cell: (row) => <span>{getStatus(row.expiration)}</span>,
    },
    {
      name: "Action",
      cell: () => (
        <div>
          <button className="icon-button">🖊️</button>
          <button className="icon-button">🗑️</button>
        </div>
      ),
    },
  ];

  // Custom styles
  const customStyles = {
    tableWrapper: {
      style: {
        borderRadius: "8px",
        overflow: "hidden",
        border: "0.5px solid #F8F8F8",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#F3F7FD",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        backgroundColor: "#fff",
      },
    },
    cells: {
      style: {
        border: "0.5px solid #F8F8F8", // Border between columns in cells
      },
    },
  };

  return (
    <div className="link-component">
      {loading ? (
        <p>Loading...</p>
      ) : links?.length === 0 ? (
        <p>Please create one link</p>
      ) : (
        <div className="lc-data-table">
          <DataTable
            columns={columns}
            data={links}
            customStyles={customStyles}
          />
        </div>
      )}
    </div>
  );
};

export default LinkComponent;
