import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import DashboardComponent from "../components/Dashboard/DashboardComponent";

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="layout">
        <Navbar />
        <DashboardComponent />
      </div>
    </div>
  );
}

export default Dashboard;
