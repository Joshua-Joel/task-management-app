import React from 'react'
import EmployeeNavBar from '../components/common/navbar/EmployeeNavBar'
import Dashboard from '../components/Manager/Dashboard/Dashboard'


export const EmployeeHome = () => {
  return (
    <>
        <EmployeeNavBar></EmployeeNavBar>
        <Dashboard></Dashboard>

    </>
  )
}
