import React, { useState, useEffect } from "react";
import sun from "../../assets/sun.png";
import night from "../../assets/night-mode.png";
import { HiPlus } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import "./Navbar.css";
import SlidingPanel from "../SlidingPanel/SlidingPanel";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

function Navbar() {
  const dispatch = useDispatch();

  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [greeting, setGreeting] = useState("Good Morning");
  const [currentDate, setCurrentDate] = useState("");
  const [isNight, setIsNight] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const { userData } = useSelector((state) => state.auth);

  const togglePanel = () => {
    setIsPanelVisible((prev) => !prev);
  };

  useEffect(() => {
    const date = new Date();

    // Formatting date to "Tue, Jan 25" format
    const options = { weekday: "short", month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    setCurrentDate(formattedDate);

    // Determine the greeting based on current hour
    const currentHour = date.getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good Morning");
      setIsNight(false); // Morning, use sun
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good Afternoon");
      setIsNight(false); // Afternoon, use sun
    } else if (currentHour >= 17 && currentHour < 21) {
      setGreeting("Good Evening");
      setIsNight(false); // Evening, use sun
    } else {
      setGreeting("Good Night");
      setIsNight(true); // Night, use night mode image
    }
  }, []);

  const getProfileInitials = (name) => {
    if (!name) return "";
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <>
      <nav className="navbar">
        <div className="n-greet">
          <div className="ng-greet">
            {/* Dynamically switch between sun and night image */}
            <img
              style={{ marginRight: "5px" }}
              src={isNight ? night : sun}
              alt="sun or night"
            />
            <span>
              {greeting}, {userData?.name}
            </span>
          </div>
          {/* Display the current date */}
          <p>{currentDate}</p>
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
          <div
            className="n-profile-logo"
            onClick={() => setShowLogout(!showLogout)}
          >
            {/* Display first two characters of user name */}
            <p>{getProfileInitials(userData?.name)}</p>
          </div>
        </div>
        <div
          className="n-logout"
          style={showLogout ? { display: "flex" } : { display: "none" }}
          onClick={() => dispatch(logout())}
        >
          <p>Logout</p>
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
