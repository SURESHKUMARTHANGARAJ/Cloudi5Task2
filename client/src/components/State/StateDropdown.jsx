import React from 'react'

const StateDropdown = ({countries,setSelectedCountry}) => {
  return (
    <div>
          <label htmlFor="country">Country Name</label>
          <select onChange={(e) => setSelectedCountry(e.target.value)}>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option 
              key={country._id} 
              value={country.code} 
              disabled={!country.isActive} 
            >
              {country.name}
            </option>
          ))}
        </select>
        </div>
  )
}

export default StateDropdown
