import React, { useState } from "react";

function LogoUpload({ setLogo, image, setImage }) {

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file); 
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogo(null);
    setImage(null); 
    document.getElementById("logo-input").value = ""; 
  };

  return (
    <div className="d-flex flex-row flex-wrap image-box">
      <label htmlFor="logo">Logo</label>
      <div className="logo-container">
        {image && <img src={image} alt="Logo preview" id="logo" className="logoImage" />}
      </div>
      <input
        type="file"
        id="logo-input"
        accept="image/*"
        onChange={handleLogoChange}
        style={{ display: "none" }}
      />
      <div className="d-flex flex-column gap-4 m-auto buttonGroup">
        <button type="button" onClick={() => document.getElementById("logo-input").click()}>Browse</button>
        <button type="button" onClick={handleRemoveLogo} disabled={!image}>Remove</button>
      </div>
    </div>
  );
}

export default LogoUpload;
