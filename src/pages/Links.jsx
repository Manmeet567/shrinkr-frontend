import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import LinkComponent from "../components/Links/LinkComponent";

function Links() {
  return (
    <div className="links">
      <Sidebar />
      <div className="layout">
        <Navbar />
        <LinkComponent />
      </div>
    </div>
  );
}

export default Links;
