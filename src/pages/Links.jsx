import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

function Links() {
  return (
    <div className="links">
      <Sidebar />
      <div className="layout">
        <Navbar />
      </div>
    </div>
  );
}

export default Links;
