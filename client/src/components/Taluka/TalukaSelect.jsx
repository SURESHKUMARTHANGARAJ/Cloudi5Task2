import React from 'react';

const TalukaSelect = ({ talukas, setName }) => {
  return (
    <div>
      <fieldset>
        <legend>Select Taluka</legend>
        <select onChange={(e)=>setName(e.target.value)}>
          <option value="">Select Taluka</option>
          {talukas.map((taluka) => (
            <option 
              key={taluka._id} 
              value={taluka.name} 
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
