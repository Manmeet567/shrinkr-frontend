import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="layout">
        <Navbar />
      </div>
    </div>
  );
}

export default Dashboard;
