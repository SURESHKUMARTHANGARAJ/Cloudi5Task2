import React, { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import FirmSelect from "./FirmSelect";
import ButtonGroup from "../common/ButtonGroup";
import BasicDetails from "./BasicDetails";
import AddressDetails from "./AddressDetails";
import OtherDetails from "./OtherDetails";

const Master = () => {

  const {firms,handleAddFirm,handleUpdateFirm,handleDeleteFirm,handleGetFirmByName,setFirmDetails} = useContext(GlobalContext)
  
  return (
   
      <main className="container-fluid p-4 w-100">
        <h3>Firm Master</h3>
        <hr />
        <form className="master p-2" onSubmit={(e) => e.preventDefault()}>
          
          <BasicDetails />
          <div className="container-fluid">
            <div className="row">
              <div className="col col-lg-7 col-md-12 col-12 address">
                <AddressDetails />
              </div>
              <div className="col col-lg-5 col-md-12 col-12 other-details">
                <OtherDetails />
              </div>
            </div>
          </div>
          <ButtonGroup handleAdd={handleAddFirm} handleDelete={handleDeleteFirm} handleUpdate={handleUpdateFirm} handleGet={handleGetFirmByName}/>

        </form>
        <FirmSelect firms={firms} setFirmDetails={setFirmDetails}/>
      </main>
  );
};

export default Master;
