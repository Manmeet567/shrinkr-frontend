import {useState} from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import SettingsComponent from "../components/SettingsComponent/SettingsComponent";

function Settings() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="settings">
      <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <div className="layout">
        <Navbar setOpenMenu={setOpenMenu} />
        <SettingsComponent />
      </div>
    </div>
  );
}

export default Settings;
