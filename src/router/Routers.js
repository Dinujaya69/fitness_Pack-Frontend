import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../components/layouts/Layout";
import Home from "../pages/home";
import About from "../pages/about";
import Contact from "../pages/contact";
import Register from "../pages/register";
import Trainner from "../pages/trainner";
import Plan from "../pages/plan";

import AdminLayout from "../components/layouts/AdminLayout";
import Dashboard from "../Admin/dashboard";
import Payment from "../Admin/payment";
import Health from "../Admin/userList";
import Member from "../Admin/member";
import Repots from "../Admin/attendanceList";
import CreatePlan from "../Admin/createPlan";
import CreateTrainners from "../Admin/createTrainners";



import MemberLayout from "../components/layouts/MemberLayout";
import Login from "../pages/login";
import MyPlan from "../Member/myPlan";
import UpdateProfile from "../Member/updateProfile";
import HealthStatus from "../Member/healthStatus";
import MDashboard from "../Member/mdashboard";
import Cart from "../pages/cart";
import AttendanceForm from "../Admin/markAttendence";
import UserList from "../Admin/userList";
import AttendanceList from "../Admin/attendanceList";
import TrainerLayout from "../components/layouts/TrainerLayout";
import TDashboard from "../Trainer/tdashboard";

;


const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/trainner" element={<Trainner />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="cart" element={<Cart />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/payment" element={<Payment />} />
        <Route path="/admin/attendanceList" element={<AttendanceList />} />
        <Route path="/admin/userList" element={<UserList />} />
        <Route path="/admin/createTrainners" element={<CreateTrainners />} />
        <Route path="/admin/createPlan" element={<CreatePlan />} />
        <Route path="/admin/member" element={<Member />} />
        <Route path="/admin/markAttendence" element={<AttendanceForm />} />
      </Route>

      <Route path="/member" element={<MemberLayout />}>
        <Route
          path="/member"
          element={<Navigate to="/member/UpdateProfile" />}
        />
        <Route path="/member/mdashboard" element={<MDashboard />} />
        <Route path="/member/myplan" element={<MyPlan />} />
        <Route path="/member/updateProfile" element={<UpdateProfile />} />
        <Route path="/member/healthStatus" element={<HealthStatus />} />
      </Route>

      <Route path="/trainer" element={<TrainerLayout />}>
        <Route
          path="/trainer"
          element={<Navigate to="/trainer/UpdateProfile" />}
        />
        <Route path="/trainer/dashboard" element={< TDashboard/>} />
        <Route path="/trainer/myplan" element={<MyPlan />} />
        <Route path="/trainer/updateProfile" element={<UpdateProfile />} />
        <Route path="/trainer/healthStatus" element={<HealthStatus />} />
      </Route>
    </Routes>
  );
};

export default Routers;
