import {useState} from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import DashboardComponent from "../components/Dashboard/DashboardComponent";

function Dashboard() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="dashboard">
      <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <div className="layout">
        <Navbar setOpenMenu={setOpenMenu} />
        <DashboardComponent />
      </div>
    </div>
  );
}

export default Dashboard;
