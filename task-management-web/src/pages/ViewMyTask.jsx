import React from 'react'
import EmployeeNavBar from '../components/common/navbar/EmployeeNavBar'
import MyTasksTable from '../components/Employee/taskstable/TasksTable'


export const ViewMyTask = () => {
  return (
    <>
        <EmployeeNavBar></EmployeeNavBar>
        <div 
        style={{
          width: "97%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          direction:"row",
          position:"relative",
          left:"2%",
          margin:"30px 0"
        }}
      >
        <MyTasksTable></MyTasksTable>
      </div>
    </>
  )
}
