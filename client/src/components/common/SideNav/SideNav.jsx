import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/cloudi5-logo.png'
import { FaHome } from "react-icons/fa";
import { GiWorld } from "react-icons/gi";
import { GiIndiaGate } from "react-icons/gi";
import { GiCircleForest } from "react-icons/gi";
import { MdLocationPin } from "react-icons/md";
import { GlobalContext } from '../../../context/globalContext';

const SideNav = () => {

    const {isOpen,changeToggle} = useContext(GlobalContext)
 
    return (
    <div className={`side-nav ${isOpen?"open":""}`}>
      <h3 onClick={changeToggle} className="close">X</h3>
      <div className="title">
        <img src={logo} alt="Logo"/>
      </div>
      <div className="d-flex justify-content-start align-items-center flex-column">
        <Link 
          to='/' 
          className="nav-link"
        >
          <FaHome className="sidenav-icon"/> Master
        </Link>
        <Link 
          to='/country' 
        className="nav-link"
        >
          <GiWorld className="sidenav-icon"/> Country
        </Link>
        <Link 
          to='/state' 
        className="nav-link"
        >
          <GiIndiaGate className="sidenav-icon"/> State
        </Link>
        <Link 
          to='/district' 
        className="nav-link"
        >
          <GiCircleForest className="sidenav-icon"/> District
        </Link>
        <Link 
          to='/taluka' 
        className="nav-link"
        >
          <MdLocationPin className="sidenav-icon"/> Taluka
        </Link>
     </div>
    </div>
  )
}

export default SideNav
