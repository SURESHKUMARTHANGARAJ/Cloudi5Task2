import React, { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";

const AddressDetails = () => {
  const {
    countries,
    states,
    districts,
    talukas,
    addressDetails,
    setSelectedCountry,
    setSelectedState,
    setSelectedDistrict,
    handleAddressDetailChange,
  } = useContext(GlobalContext);

  return (
    <fieldset className="address">
      <legend>Address Details</legend>

      <div className="pb-2">
        <label htmlFor="country">Country Name</label>
        <select
          name="country"
          value={addressDetails.country}
          onChange={(e) => {
            setSelectedCountry(e.target.value);
            handleAddressDetailChange(e);
          }}
        >
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

      <div className="pb-2">
        <label htmlFor="state">State Name</label>
        <select
          name="state"
          value={addressDetails.state}
          onChange={(e) => {
            setSelectedState(e.target.value);
            handleAddressDetailChange(e);
          }}
        >
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

      <div className="pb-2">
        <label htmlFor="district">District Name</label>
        <select
          name="district"
          value={addressDetails.district}
          onChange={(e) => {
            setSelectedDistrict(e.target.value);
            handleAddressDetailChange(e);
          }}
        >
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

      <div className="pb-2">
        <label htmlFor="taluka">Taluka Name</label>
        <select
          name="taluka"
          value={addressDetails.taluka}
          onChange={handleAddressDetailChange}
        >
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
      </div>

      <div className="pb-2">
        <label htmlFor="pincode">Pincode</label>
        <input
          type="text"
          id="pincode"
          name="pincode"
          value={addressDetails.pincode}
          onChange={handleAddressDetailChange}
        />
      </div>

      <div className="pb-2">
        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          name="address"
          value={addressDetails.address}
          onChange={handleAddressDetailChange}
        ></textarea>
      </div>
    </fieldset>
  );
};

export default AddressDetails;
