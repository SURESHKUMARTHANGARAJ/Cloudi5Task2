import React from 'react'
import StateForm from '../components/State/StateForm'
import SideNav from '../components/common/SideNav/SideNav'
import Nav from '../components/common/nav/Nav'

const State = () => {
  return (
    <div className='Grid-box' >
        <SideNav />
        <Nav title="State"/>
        <StateForm />
        </div>
  )
}

export default State
