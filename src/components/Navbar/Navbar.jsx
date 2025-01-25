import React, { useState } from "react";
import sun from "../../assets/sun.png";
import night from "../../assets/night-mode.png";
import { HiPlus } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import "./Navbar.css";
import SlidingPanel from "../SlidingPanel/SlidingPanel";
import { useSelector } from "react-redux";

function Navbar() {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const { userData } = useSelector((state) => state.auth);

  const togglePanel = () => {
    setIsPanelVisible((prev) => !prev);
  };

  return (
    <>
      <nav className="navbar">
        <div className="n-greet">
          <div className="ng-greet">
            <img style={{ marginRight: "5px" }} src={sun} alt="sun" />
            <span>Good Morning, {userData?.name}</span>
          </div>
          <p>Tue, Jan 25</p>
        </div>

        <div className="n-left-options">
          <button onClick={togglePanel}>
            <HiPlus style={{ marginRight: "6px", fontSize: "20px" }} />
            Create new
          </button>
          <div className="n-search-bar">
            <IoIosSearch style={{ marginRight: "6px", fontSize: "20px" }} />
            <input type="text" placeholder="Search by remarks" />
          </div>
          <div className="n-profile-logo">
            <p>MA</p>
          </div>
        </div>
      </nav>
      <SlidingPanel
        isVisible={isPanelVisible}
        togglePanel={togglePanel}
        type="create"
      />
    </>
  );
}

export default Navbar;
