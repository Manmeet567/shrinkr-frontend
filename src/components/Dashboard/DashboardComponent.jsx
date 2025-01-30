import "./DashboardComponent.css";
import { useSelector } from "react-redux";

function DashboardComponent() {
  const { completeAnalytics } = useSelector((state) => state.analytics);

  // Extracting data from completeAnalytics
  const totalClicks = completeAnalytics?.totalClicks || 0;
  const dailyClicks = completeAnalytics?.dailyClicks || [];
  const deviceCount = completeAnalytics?.deviceCount || {
    mobile: 0,
    tablet: 0,
    desktop: 0,
  };

  return (
    <div className="dashboard-component">
      <div className="dc-clicks">
        <span>Total Clicks</span>
        <span>{totalClicks}</span> {/* Total clicks from the API */}
      </div>
      <div className="dc-analytics">
        <div className="dc-date-wise">
          <p>Date-wise Clicks</p>
          <div className="dc-data">
            {dailyClicks.length === 0 && <p>No data found</p>}
            {dailyClicks.map((day) => (
              <div className="dc-data-bar" key={day.date}>
                <span>{day.date}</span>
                <div className="dcd-bar">
                  <div
                    className="dcdb"
                    style={{
                      width: `${(day.totalClicks / totalClicks) * 100}%`,
                    }}
                  ></div>
                </div>
                <span>{day.totalClicks}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="dc-click-devices">
          <p>Click Devices</p>
          {dailyClicks.length === 0 ? (
            <p style={{color:"#000", marginTop:"30px", fontSize:"16px", fontWeight:"400"}}>No data found!</p>
          ) : (
            <div className="dc-data">
              <div className="dc-data-bar">
                <span>Mobile</span>
                <div className="dcd-bar">
                  <div
                    className="dcdb"
                    style={{
                      width: `${(deviceCount.mobile / totalClicks) * 100}%`,
                    }}
                  ></div>
                </div>
                <span>{deviceCount.mobile}</span>
              </div>
              <div className="dc-data-bar">
                <span>Tablet</span>
                <div className="dcd-bar">
                  <div
                    className="dcdb"
                    style={{
                      width: `${(deviceCount.tablet / totalClicks) * 100}%`,
                    }}
                  ></div>
                </div>
                <span>{deviceCount.tablet}</span>
              </div>
              <div className="dc-data-bar">
                <span>Desktop</span>
                <div className="dcd-bar">
                  <div
                    className="dcdb"
                    style={{
                      width: `${(deviceCount.desktop / totalClicks) * 100}%`,
                    }}
                  ></div>
                </div>
                <span>{deviceCount.desktop}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardComponent;
