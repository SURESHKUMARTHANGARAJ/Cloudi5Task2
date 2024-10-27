// StatusToggle.js
import React from "react";

const StatusToggle = ({ isActive, setIsActive }) => (
  <div>
    <label htmlFor="status">Status</label>
    <input
      type="checkbox"
      id="status"
      checked={isActive}
      onChange={(e) => setIsActive(e.target.checked)}
    />
    <span className="p-3">isActive</span>
  </div>
);

export default StatusToggle;
