import React from 'react'
import SideNav from '../components/common/SideNav/SideNav'
import Nav from '../components/common/nav/Nav'
import DistrictForm from '../components/District/DistrictForm'

const District = () => {
  return (
    <div className='Grid-box' >
        <SideNav />
        <Nav title="District"/>
        <DistrictForm />
        </div>
  )
}

export default District
