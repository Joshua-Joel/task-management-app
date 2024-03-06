import React from "react";
import ManagerNavBar from "../components/common/navbar/ManagerNavBar";
import Dashboard from "../components/Manager/dashboard/Dashboard";

export const ManagerHome = () => {
  return (
    <>
      <ManagerNavBar></ManagerNavBar>
      <Dashboard></Dashboard>
    </>
  );
};
