import React, { useContext } from 'react'
import { RiMenu2Fill } from "react-icons/ri";
import { GlobalContext } from '../../../context/globalContext';


const Nav = ({title}) => {

    const {changeToggle} = useContext(GlobalContext)

  return (
     <nav>
        <div className="d-flex justify-content-center align-items-center gap-2">
        <RiMenu2Fill className="menu" onClick={changeToggle}/>
        {title}
        </div>
     </nav>
  )
}

export default Nav
