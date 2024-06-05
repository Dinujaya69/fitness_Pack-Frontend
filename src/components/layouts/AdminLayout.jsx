import React from "react";

import { Outlet } from "react-router";
import Header from "../Header/Header";
import Footer from "../Footer/AdminFooter";


const AdminLayout = () => {
  return (
    <div>
      
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AdminLayout;
