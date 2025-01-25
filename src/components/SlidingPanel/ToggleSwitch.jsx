import React from "react";
import Switch from "react-switch";

const ToggleSwitch = ({ isChecked, onToggle }) => {
  return (
    <div>
      <Switch
        checked={isChecked}       // State of the switch
        onChange={onToggle}       // Toggle handler
        onColor="#1A5FFF"         // Background color when checked
        offColor="#ccc"           // Background color when unchecked
        handleDiameter={15}       // Diameter of the toggle handle
        height={21}               // Height of the switch
        width={51}                // Width of the switch
        uncheckedIcon={false}     // No icons inside the switch
        checkedIcon={false}       // No icons inside the switch
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.2)"  // Shadow for the switch handle
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.1)" // Active shadow
      />
    </div>
  );
};

export default ToggleSwitch;
