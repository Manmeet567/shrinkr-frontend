import React, { useState, useEffect } from "react";
import "./SlidingPanel.css";
import { IoCloseSharp } from "react-icons/io5";
import ToggleSwitch from "./ToggleSwitch";
import { toast } from "react-toastify";
import { isURL } from "validator";
import { createLink, updateLink } from "../../redux/slices/linkSlice";
import { useDispatch } from "react-redux";

function SlidingPanel({ isVisible, togglePanel, linkData, type }) {
  const dispatch = useDispatch();

  const [destinationUrl, setDestinationUrl] = useState("");
  const [remarks, setRemarks] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [isExpiryEnabled, setIsExpiryEnabled] = useState(false);

  useEffect(() => {
    if (linkData) {
      setDestinationUrl(linkData.destination_url);
      setRemarks(linkData.remarks);
      setExpiryDate(
        linkData.expiration
          ? new Date(linkData.expiration).toISOString().slice(0, 10)
          : ""
      );
      setIsExpiryEnabled(!!linkData.expiration);
    }
  }, [linkData]);

  const handleSubmit = () => {
    if (!destinationUrl) {
      toast.error("Destination URL is required.");
      return;
    }
    if (
      !isURL(destinationUrl, {
        protocols: ["http", "https"],
        require_protocol: true,
      })
    ) {
      toast.error("Please enter a valid URL.");
      return;
    }

    if (!remarks) {
      toast.error("Remarks are required.");
      return;
    }

    if (isExpiryEnabled && !expiryDate) {
      toast.error("Please select an expiration date.");
      return;
    }

    const linkDataToSubmit = {
      destination_url: destinationUrl,
      remarks,
      expiration: isExpiryEnabled ? expiryDate : null,
    };

    // Check if the form data has changed
    if (
      linkData &&
      linkData.destination_url === destinationUrl &&
      linkData.remarks === remarks &&
      (linkData.expiration
        ? new Date(linkData.expiration).toISOString().slice(0, 10)
        : "") === expiryDate
    ) {
      toast.error("No changes detected.");
      return;
    }

    if (type === "create") {
      dispatch(createLink(linkDataToSubmit));

      setDestinationUrl("");
      setRemarks("");
      setExpiryDate("");
      setIsExpiryEnabled(false);
    } else {
      dispatch(updateLink({ _id: linkData._id, ...linkDataToSubmit }));
    }
  };

  return (
    <div className={`sliding-panel ${isVisible ? "visible" : ""}`}>
      <div className="sliding-panel-content">
        <div className="sp-nav">
          <p>{type === "create" ? "New" : "Edit"} Link</p>
          <IoCloseSharp className="spn-close" onClick={togglePanel} />
        </div>

        <div className="spc-content">
          <div className="spc-input">
            <label>
              Destination Url <span style={{ color: "#FF0101" }}>*</span>
            </label>
            <input
              type="url"
              placeholder="https://web.whatsapp.com/"
              value={destinationUrl}
              onChange={(e) => setDestinationUrl(e.target.value)}
              required
            />
          </div>

          <div className="spc-input">
            <label>
              Remarks <span style={{ color: "#FF0101" }}>*</span>
            </label>
            <textarea
              placeholder="Enter remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              required
            />
          </div>

          <div className="spc-input">
            <div className="spci-bar">
              <label>Link Expiration</label>
              <ToggleSwitch
                isChecked={isExpiryEnabled}
                onToggle={() => setIsExpiryEnabled((prev) => !prev)}
              />
            </div>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              disabled={!isExpiryEnabled}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

        <div className="spc-footer">
          <button
            onClick={() => {
              // Clear all fields
              setDestinationUrl("");
              setRemarks("");
              setExpiryDate("");
              setIsExpiryEnabled(false);
            }}
          >
            Clear
          </button>
          <button onClick={handleSubmit}>
            {type === "create" ? "Create New" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SlidingPanel;
