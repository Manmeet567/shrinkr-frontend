import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import AnalyticsComponent from "../components/AnalyticsComponent/AnalyticsComponent";

function Analytics() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="analytics">
      <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <div className="layout">
        <Navbar setOpenMenu={setOpenMenu} />
        <AnalyticsComponent />
      </div>
    </div>
  );
}

export default Analytics;
