import React from "react";
import SideNav from "../components/common/SideNav/SideNav";
import Nav from "../components/common/nav/Nav";
import FirmForm from "../components/master/FirmForm";

const Master = () => {
  
  return (
    <div className="Grid-box">
      <SideNav />
      <Nav title="Firm" />
      <FirmForm />
    </div>
  );
};

export default Master;
