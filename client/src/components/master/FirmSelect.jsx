import React from 'react';

const FirmSelect = ({ firms, setFirmDetails }) => {
  return (
    <div>
      <fieldset>
        <legend>Search Firm</legend>
        <select onChange={(e)=>setFirmDetails({firmName:e.target.value})}>
          <option value="">Select Firm</option>
          {firms.map((firm) => (
            <option 
              key={firm._id} 
              value={firm.firmName} 
              disabled={!firm.otherDetails.status} 
            >
              {firm.firmName}
            </option>
          ))}
        </select>
      </fieldset>
    </div>
  );
};

export default FirmSelect;
