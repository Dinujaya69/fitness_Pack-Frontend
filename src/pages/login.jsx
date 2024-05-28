import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginImage from "../images/login.jpg";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        toast.error("Email and password are required.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      const { data } = response;

      if (data.success) {
        toast.success(data.message);

        if (data.data.role === "member") {
          console.log("Navigating to member dashboard...");
          navigate("/member/mdashboard");
          console.log("Navigation complete.");
        } else if (data.data.role === "admin") {
          console.log("Navigating to admin dashboard...");
          navigate("/admin/dashboard");
          console.log("Navigation complete.");
        }

        dispatch({ type: "LOGIN_SUCCESS", payload: data.data.user });
        setEmail("");
        setPassword("");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login.");
    }
  };

  return (
    <div className="bg-#121212 min-h-screen flex items-center justify-center">
      <div className="bg-neutral-900 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center border border-red-900">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-white">Login</h2>
          <p className="text-xs mt-4 text-white">
            If you are already a member, easily log in
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 mt-8 rounded-xl border text-black"
              type="email"
              name="email"
              placeholder="Email"
            />
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 rounded-xl border w-full text-black"
                type="password"
                name="password"
                placeholder="Password"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </div>
            <button
              type="submit"
              className="bg-red-900 rounded-xl text-white py-2 hover:scale-105 duration-300"
            >
              Login
            </button>
          </form>
          <div className="mt-3 text-xs flex justify-between items-center text-white">
            <p>
              Don't have an account?{" "}
              <Link to="/register">
                <button className="py-2 px-5 bg-red-900 border rounded-xl hover:scale-110 duration-300 text-white">
                  Register
                </button>
              </Link>
            </p>
          </div>
        </div>
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={loginImage} alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
