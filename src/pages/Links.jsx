import {useState} from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import LinkComponent from "../components/Links/LinkComponent";

function Links() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="links">
      <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <div className="layout">
        <Navbar setOpenMenu={setOpenMenu} />
        <LinkComponent />
      </div>
    </div>
  );
}

export default Links;
