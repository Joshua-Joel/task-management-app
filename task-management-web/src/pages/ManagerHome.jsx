import React from "react";
import ManagerNavBar from "../components/common/navbar/ManagerNavBar";
import Dashboard from "../components/Manager/Dashboard/Dashboard";

export const ManagerHome = () => {
  return (
    <>
      <ManagerNavBar></ManagerNavBar>
      <Dashboard></Dashboard>
    </>
  );
};
