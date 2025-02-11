import React from 'react';

const CountrySelect = ({ countries, setName }) => {
  return (
    <div>
      <fieldset>
        <legend>Search Country</legend>
        <select onChange={(e)=>setName(e.target.value)}>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option 
              key={country._id} 
              value={country.name} 
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
