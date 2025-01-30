import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import SettingsComponent from "../components/SettingsComponent/SettingsComponent";

function Settings() {
  return (
    <div className="settings">
      <Sidebar />
      <div className="layout">
        <Navbar />
        <SettingsComponent />
      </div>
    </div>
  );
}

export default Settings;
