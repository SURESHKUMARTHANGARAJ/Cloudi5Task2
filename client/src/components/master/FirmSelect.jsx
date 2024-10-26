import React from 'react';

const FirmSelect = ({ firms }) => {
  return (
    <div>
      <fieldset>
        <legend>Search Firm</legend>
        <select>
          <option value="">Select Firm</option>
          {firms.map((firm) => (
            <option 
              key={firm._id} 
              value={firm._id} 
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
