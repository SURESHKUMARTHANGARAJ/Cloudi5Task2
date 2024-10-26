import React from 'react'
import SideNav from '../components/common/SideNav/SideNav'
import Nav from '../components/common/nav/Nav'
import TalukaForm from '../components/Taluka/TalukaForm'

const Taluka = () => {
  return (
    <div className='Grid-box' >
    <SideNav />
    <Nav title="Taluka"/>
    <TalukaForm />
    </div>
  )
}

export default Taluka
