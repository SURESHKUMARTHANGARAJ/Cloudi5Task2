import React from 'react';

const TalukaSelect = ({ talukas }) => {
  return (
    <div>
      <fieldset>
        <legend>Select Taluka</legend>
        <select>
          <option value="">Select Taluka</option>
          {talukas.map((taluka) => (
            <option 
              key={taluka._id} 
              value={taluka._id} 
              disabled={!taluka.isActive}
            >
              {taluka.name}
            </option>
          ))}
        </select>
      </fieldset>
    </div>
  );
};

export default TalukaSelect;
