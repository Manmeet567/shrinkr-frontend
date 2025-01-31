import React from "react";
import "./Sidebar.css";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import { ImLink } from "react-icons/im";
import { IoAnalyticsSharp } from "react-icons/io5";
import { MdOutlineSettings, MdOutlineDashboard } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

function Sidebar({ openMenu, setOpenMenu }) {
  return (
    <div className={`sidebar ${openMenu ? "show-sidebar" : ""}`}>
      <div className="s-logo">
        <img src={logo} alt="logo" />
        <IoCloseSharp className="s-close" onClick={() => setOpenMenu(false)} />
      </div>
      <div className="s-options">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "s-active" : "s-inactive")}
        >
          <MdOutlineDashboard style={{ marginRight: "8px" }} />
          Dashboard
        </NavLink>
        <NavLink
          to="/links"
          className={({ isActive }) => (isActive ? "s-active" : "s-inactive")}
        >
          <ImLink style={{ marginRight: "8px" }} />
          Links
        </NavLink>
        <NavLink
          to="/analytics"
          className={({ isActive }) => (isActive ? "s-active" : "s-inactive")}
        >
          <IoAnalyticsSharp style={{ marginRight: "8px" }} />
          Analytics
        </NavLink>
      </div>
      <div className="s-settings">
        <NavLink
          to="/settings"
          className={({ isActive }) => (isActive ? "s-active" : "s-inactive")}
        >
          <MdOutlineSettings style={{ marginRight: "8px" }} />
          Settings
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
