// CountryInput.js
import React from "react";

const TextField = ({ label, id, value, onChange, readOnly }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input
      type="text"
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      readOnly={readOnly}
    />
  </div>
);

export default TextField;
