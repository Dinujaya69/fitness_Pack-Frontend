import React from "react";

import { Outlet } from "react-router";
import Footer from "../Footer/AdminFooter";
import Header from "../Header/Header";

const MemberLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MemberLayout;
