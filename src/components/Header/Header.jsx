import React, { useState, useContext, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../../images/Logo.jpg";
import ASideBar from "../adminComponents/ASideBar/ASideBar";
import MSideBar from "../memberComponets/MSideBar/MSideBar";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify"; // Import the toast module
import "react-toastify/dist/ReactToastify.css";

const navItems = [
  { label: "Home", href: "/home" },
  { label: "About us", href: "/about" },
  { label: "Plans", href: "/plan" },
  { label: "Trainers", href: "/trainner" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { user, dispatch } = useContext(AuthContext);

  const toggleHeader = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.href = "/home";
  };

  useEffect(() => {
    // Check if the toast message has been displayed
    const toastDisplayed = localStorage.getItem("toastDisplayed");

    if (user && !toastDisplayed) {
      // Display welcome message when user logs in
      toast.success(`Welcome ${user.name}`);
      // Set flag to indicate that the toast message has been displayed
      localStorage.setItem("toastDisplayed", true);
    }
  }, [user]);

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80 ">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          {user?.role === "admin" && <ASideBar />}
          {user?.role === "member" && <MSideBar />}
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={Logo} alt="logo" />
            <span className="text-2xl font-semibold text-red-700">
              FITTNES{" "}
              <span className="btext-2xl font-semibold text-white"> PACK </span>
            </span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-white">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 py-2 px-3 border rounded-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex justify-center space-x-12 place-items-center">
              <a href="/login" className="py-2 px-3 border rounded-md">
                Sign in
              </a>
              <a
                href="/register"
                className="bg-red-600 py-2 px-3 border rounded-md"
              >
                Create Account
              </a>
            </div>
          )}
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleHeader}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20  bg-neutral-900 w-full p-12 flex flex-col items-center justify-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              <a href="/login" className="py-2 px-3 border rounded-md">
                Sign in
              </a>
              <a
                href="/register"
                className="bg-red-600 py-2 px-3 border rounded-md"
              >
                Create Account
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
