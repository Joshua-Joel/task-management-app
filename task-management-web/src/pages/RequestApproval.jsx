import React from "react";
import ManagerNavBar from "../components/common/navbar/ManagerNavBar";
import AllTasksTable from "../components/Manager/taskstable/TasksTable";
import ApprovalTable from "../components/Manager/requestapproval/ApprovalTable";

export const RequestApproval = () => {
  return (
    <>
      <ManagerNavBar></ManagerNavBar>
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
        <ApprovalTable></ApprovalTable>
      </div>
    </>
  );
};
