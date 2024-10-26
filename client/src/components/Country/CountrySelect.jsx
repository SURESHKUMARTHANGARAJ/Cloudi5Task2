import React from 'react';

const CountrySelect = ({ countries }) => {
  return (
    <div>
      <fieldset>
        <legend>Search Country</legend>
        <select>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option 
              key={country._id} 
              value={country._id} 
              disabled={!country.isActive} 
            >
              {country.name}
            </option>
          ))}
        </select>
      </fieldset>
    </div>
  );
};

export default CountrySelect;
