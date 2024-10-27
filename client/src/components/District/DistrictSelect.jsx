import React from 'react';

const DistrictSelect = ({ districts, setName }) => {
  return (
    <div>
      <fieldset>
        <legend>Select District</legend>
        <select onChange={(e)=>setName(e.target.value)}>
          <option value="">Select District</option>
          {districts.map((district) => (
            <option 
              key={district._id} 
              value={district.name} 
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
    
