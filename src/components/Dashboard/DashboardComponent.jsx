import React from "react";
import "./DashboardComponent.css";

function DashboardComponent() {
  return (
    <div className="dashboard-component">
      <div className="dc-clicks">
        <span>Total Clicks</span>
        <span>1234</span>
      </div>
      <div className="dc-analytics">
        <div className="dc-date-wise">
          <p>Date-wise Clicks</p>
          <div className="dc-data">
            <div className="dc-data-bar">
              <span>21-01-25</span>
              <div className="dcd-bar">
                <div className="dcdb" style={{ width: "80%" }}></div>
              </div>
              <span>1234</span>
            </div>
            <div className="dc-data-bar">
              <span>21-01-25</span>
              <div className="dcd-bar">
                <div className="dcdb" style={{ width: "60%" }}></div>
              </div>
              <span>1234</span>
            </div>
            <div className="dc-data-bar">
              <span>21-01-25</span>
              <div className="dcd-bar">
                <div className="dcdb" style={{ width: "40%" }}></div>
              </div>
              <span>1234</span>
            </div>
            <div className="dc-data-bar">
              <span>21-01-25</span>
              <div className="dcd-bar">
                <div className="dcdb" style={{ width: "20%" }}></div>
              </div>
              <span>1234</span>
            </div>
          </div>
        </div>
        <div className="dc-click-devices">
          <p>Click Devices</p>
          <div className="dc-data">
            <div className="dc-data-bar">
              <span>21-01-25</span>
              <div className="dcd-bar">
                <div className="dcdb" style={{ width: "50%" }}></div>
              </div>
              <span>1234</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardComponent;
