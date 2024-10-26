import React from 'react'
import SideNav from '../components/common/SideNav/SideNav'
import Nav from '../components/common/nav/Nav'
import CountryForm from '../components/Country/CountryForm'

const Country = () => {
  
    return (
        <div className='Grid-box' >
        <SideNav />
        <Nav title="Country"/>
        <CountryForm />
        </div>
      )
}

export default Country
