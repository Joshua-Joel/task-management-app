import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ManagerHome } from './pages/ManagerHome';
import { ViewAllTasks } from './pages/ViewAllTasks';
import { ViewMyTask } from './pages/ViewMyTask';
import { EmployeeHome } from './pages/EmployeeHome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route> 
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/manager-home" element={<ManagerHome />}></Route>
        <Route path="/employee-home" element={<EmployeeHome />}></Route>
        <Route path="/view-all-tasks" element={<ViewAllTasks />}></Route>
        <Route path="/view-my-tasks" element={<ViewMyTask/>}></Route>
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
