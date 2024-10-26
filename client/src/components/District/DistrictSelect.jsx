import React from 'react';

const DistrictSelect = ({ districts }) => {
  return (
    <div>
      <fieldset>
        <legend>Select District</legend>
        <select>
          <option value="">Select District</option>
          {districts.map((district) => (
            <option 
              key={district._id} 
              value={district._id} 
              disabled={!district.isActive}
            >
              {district.name}
            </option>
          ))}
        </select>
      </fieldset>
    </div>
  );
};

export default DistrictSelect;
    
