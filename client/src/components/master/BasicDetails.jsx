import React, { useContext } from 'react'
import LogoUpload from "./LogoUpload";
import { GlobalContext } from '../../context/globalContext';
import InputField from './InputField';

const BasicDetails = () => {

    const {image,setImage,setLogo,firmDetails,handleFirmDetailChange} = useContext(GlobalContext)

  return (
    <fieldset>
    <legend>Basic Details</legend>
    <div className="container-fluid">
      <div className="row">
        <div className="col col-lg-7 col-sm-12 col-12 basic">
        <InputField
              id="id"
              label="ID"
              name="id"
              value={firmDetails.id}
              onChange={handleFirmDetailChange}
              readOnly
            />
            <InputField
              id="firmname"
              label="Firm Name"
              name="firmName"
              value={firmDetails.firmName}
              onChange={handleFirmDetailChange}
            />
            <InputField
              id="altfirmname"
              label="Alt Firm Name"
              name="altFirmName"
              value={firmDetails.altFirmName}
              onChange={handleFirmDetailChange}
            />
            <InputField
              id="ownerName"
              label="Owner Name"
              name="ownerName"
              value={firmDetails.ownerName}
              onChange={handleFirmDetailChange}
            />
            <InputField
              id="email"
              label="Email"
              name="email"
              value={firmDetails.email}
              onChange={handleFirmDetailChange}
            />
            <InputField
              id="website"
              label="Website"
              name="website"
              value={firmDetails.website}
              onChange={handleFirmDetailChange}
            />
        </div>
        <div className="col col-lg-5 col-sm-12 col-12 basic-right">
          <LogoUpload
            image={image}
            setLogo={setLogo}
            setImage={setImage}
          />
          <div>
          <InputField
              id="mobile"
              label="Mobile No"
              name="mobile"
              value={firmDetails.mobile}
              onChange={handleFirmDetailChange}
            />
          </div>
        </div>
      </div>
    </div>
  </fieldset>
  )
}

export default BasicDetails
