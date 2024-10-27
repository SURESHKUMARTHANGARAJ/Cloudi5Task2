import React from 'react'

const TalukaDropdown = ({countries,states,districts,setSelectedState,setSelectedDistrict,setSelectedCountry}) => {
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

        {/* District Select */}
        <div>
          <label htmlFor="district">District Name</label>
          <select onChange={(e) => setSelectedDistrict(e.target.value)}>
            <option value="">Select District</option>
            {districts.map((district) => (
              <option 
                key={district._id} 
                value={district.code} 
                disabled={!district.isActive}
              >
                {district.name}
              </option>
            ))}
          </select>
        </div>
    </>
  )
}

export default TalukaDropdown
