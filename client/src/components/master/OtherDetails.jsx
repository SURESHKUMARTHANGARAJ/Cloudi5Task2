import React, { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import InputField from "./InputField";

const OtherDetails = () => {
  const { otherDetails, handleOtherDetailChange } = useContext(GlobalContext);
  return (
    <fieldset className="other">
      <legend>Other Details</legend>

      <InputField
        id="panNo"
        label="PAN No"
        name="panNo"
        value={otherDetails.panNo}
        onChange={handleOtherDetailChange}
      />
      <InputField
        id="tanNo"
        label="TAN No"
        name="tanNo"
        value={otherDetails.tanNo}
        onChange={handleOtherDetailChange}
      />
      <InputField
        id="gstNo"
        label="GST No"
        name="gstNo"
        value={otherDetails.gstNo}
        onChange={handleOtherDetailChange}
      />
      <InputField
        id="fssaiNo"
        label="FSSAI No"
        name="fssaiNo"
        value={otherDetails.fssaiNo}
        onChange={handleOtherDetailChange}
      />
      <InputField
        id="cinNo"
        label="CIN No"
        name="cinNo"
        value={otherDetails.cinNo}
        onChange={handleOtherDetailChange}
      />
      <InputField
        id="contactNo"
        label="Contact No"
        name="contactNo"
        value={otherDetails.contactNo}
        onChange={handleOtherDetailChange}
      />

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
  );
};

export default OtherDetails;
