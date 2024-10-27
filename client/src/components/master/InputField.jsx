import React from 'react';

const InputField = ({ id, label, name, value, onChange, type = "text", readOnly = false }) => (
  <div className="pb-2">
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
    />
  </div>
);

export default InputField;
