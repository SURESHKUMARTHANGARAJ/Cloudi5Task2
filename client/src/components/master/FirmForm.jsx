import React, { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import LogoUpload from "./LogoUpload";
import FirmSelect from "./FirmSelect";

const Master = () => {

  const {image,setImage,countries,firms,states,districts,talukas,setLogo,firmDetails,addressDetails,otherDetails,setSelectedCountry,setSelectedState,setSelectedDistrict,handleFirmDetailChange,handleAddressDetailChange,handleOtherDetailChange,handleAddFirm,handleUpdateFirm,handleDeleteFirm,handleGetFirmByName,
  
  } = useContext(GlobalContext)
  
  return (
   
      <main className="container-fluid p-4 w-100">
        <h3>Firm Master</h3>
        <hr />
        <form className="master p-2" onSubmit={(e) => e.preventDefault()}>
          {/* Basic Details Fieldset */}
          <fieldset>
            <legend>Basic Details</legend>
            <div className="container-fluid">
              <div className="row">
                <div className="col col-lg-7 col-sm-12 col-12 basic">
                  <div className="pb-2">
                    <label htmlFor="id">ID</label>
                    <input
                      type="text"
                      id="id"
                      name="id"
                      value={firmDetails.id}
                      onChange={handleFirmDetailChange}
                      readOnly
                    />
                  </div>
                  <div className="pb-2">
                    <label htmlFor="firmname">Firm Name</label>
                    <input
                      type="text"
                      id="firmname"
                      name="firmName"
                      value={firmDetails.firmName}
                      onChange={handleFirmDetailChange}
                    />
                  </div>
                  <div className="pb-2">
                    <label htmlFor="altfirmname">Alt Firm Name</label>
                    <input
                      type="text"
                      id="altfirmname"
                      name="altFirmName"
                      value={firmDetails.altFirmName}
                      onChange={handleFirmDetailChange}
                    />
                  </div>
                  <div className="pb-2">
                    <label htmlFor="ownerName">Owner Name</label>
                    <input
                      type="text"
                      id="ownerName"
                      name="ownerName"
                      value={firmDetails.ownerName}
                      onChange={handleFirmDetailChange}
                    />
                  </div>
                  <div className="pb-2">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={firmDetails.email}
                      onChange={handleFirmDetailChange}
                    />
                  </div>
                  <div className="pb-2">
                    <label htmlFor="website">Web Site</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={firmDetails.website}
                      onChange={handleFirmDetailChange}
                    />
                  </div>
                </div>
                <div className="col col-lg-5 col-sm-12 col-12 basic-right">
                  <LogoUpload
                    image={image}
                    setLogo={setLogo}
                    setImage={setImage}
                  />
                  <div>
                    <label htmlFor="mobile">Mobile No</label>
                    <input
                      type="text"
                      id="mobile"
                      name="mobile"
                      value={firmDetails.mobile}
                      onChange={handleFirmDetailChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </fieldset>

          {/* Address Details Fieldset */}
          <div className="container-fluid">
            <div className="row">
              <div className="col col-lg-7 col-md-12 col-12 address">
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
              </div>

              {/* Other Details Fieldset */}
              <div className="col col-lg-5 col-md-12 col-12 other-details">
                <fieldset className="other">
                  <legend>Other Details</legend>

                  <div className="pb-2">
                    <label htmlFor="panNo">PAN No</label>
                    <input
                      type="text"
                      id="panNo"
                      name="panNo"
                      value={otherDetails.panNo}
                      onChange={handleOtherDetailChange}
                    />
                  </div>

                  <div className="pb-2">
                    <label htmlFor="tanNo">TAN No</label>
                    <input
                      type="text"
                      id="tanNo"
                      name="tanNo"
                      value={otherDetails.tanNo}
                      onChange={handleOtherDetailChange}
                    />
                  </div>

                  <div className="pb-2">
                    <label htmlFor="gstNo">GST No</label>
                    <input
                      type="text"
                      id="gstNo"
                      name="gstNo"
                      value={otherDetails.gstNo}
                      onChange={handleOtherDetailChange}
                    />
                  </div>

                  <div className="pb-2">
                    <label htmlFor="fssaiNo">FSSAI No</label>
                    <input
                      type="text"
                      id="fssaiNo"
                      name="fssaiNo"
                      value={otherDetails.fssaiNo}
                      onChange={handleOtherDetailChange}
                    />
                  </div>

                  <div className="pb-2">
                    <label htmlFor="cinNo">CIN No</label>
                    <input
                      type="text"
                      id="cinNo"
                      name="cinNo"
                      value={otherDetails.cinNo}
                      onChange={handleOtherDetailChange}
                    />
                  </div>

                  <div className="pb-2">
                    <label htmlFor="contactNo">Contact No</label>
                    <input
                      type="text"
                      id="contactNo"
                      name="contactNo"
                      value={otherDetails.contactNo}
                      onChange={handleOtherDetailChange}
                    />
                  </div>

                  <div className="pb-2">
                    <label htmlFor="status">Status</label>
                    <input
                      type="checkbox"
                      id="status"
                      name="status"
                      checked={otherDetails.status}
                      onChange={handleOtherDetailChange}
                    />
                    <span className="p-2">isActive</span>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <div className="buttons d-flex gap-2">
            <button type="button" onClick={handleGetFirmByName}>
              Get Firm by Name
            </button>
            <button type="button" onClick={handleAddFirm}>
              Add Firm
            </button>
            <button type="button" onClick={handleUpdateFirm}>
              Update Firm
            </button>
            <button type="button" onClick={handleDeleteFirm}>
              Delete Firm
            </button>
          </div>
        </form>
        <FirmSelect firms={firms} />
      </main>
  );
};

export default Master;
