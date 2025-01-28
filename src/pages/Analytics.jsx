import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from '../components/Navbar/Navbar';
import AnalyticsComponent from "../components/AnalyticsComponent/AnalyticsComponent";

function Analytics() {
  return (
    <div className="analytics">
      <Sidebar />
      <div className="layout">
        <Navbar />
        <AnalyticsComponent />
      </div>
    </div>
  );
}

export default Analytics;
