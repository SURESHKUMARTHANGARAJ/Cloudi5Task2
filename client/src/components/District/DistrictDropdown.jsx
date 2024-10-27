import React from 'react'

const DistrictDropdown = ({countries,states,setSelectedCountry,setSelectedState}) => {
  return (
    <>
    {/* Country Select */}
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

        {/* State Select */}
        <div>
          <label htmlFor="state">State Name</label>
          <select onChange={(e) => setSelectedState(e.target.value)}>
            <option value="">Select State</option>
            {states.map((state) => (
              <option 
                key={state._id} 
                value={state.code} 
                disabled={!state.isActive} 
              >
                {state.name}
              </option>
            ))}
          </select>
        </div>
    </>
  )
}

export default DistrictDropdown
