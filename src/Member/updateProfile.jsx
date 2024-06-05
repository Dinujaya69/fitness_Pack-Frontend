import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

import { FaEdit, FaSave } from "react-icons/fa";

const UserProfile = () => {
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const [formData, setFormData] = useState({});
  const [lastPayment, setLastPayment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        address: user.address,
        phone: user.phone,
        age: user.age,
        gender: user.gender,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`/api/users/update/${user._id}`, formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  useEffect(() => {
    const fetchLastPayment = async () => {
      try {
        const response = await axios.get("/api/payment/myplan/lastpayment");
        setLastPayment(response.data);
      } catch (error) {
        console.error("Error fetching last payment:", error);
      }
    };

    fetchLastPayment();
  }, []);

  if (loading) return 
  if (error) return <div>{error}</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="max-w-md w-full bg-slate-600 shadow-md rounded-lg overflow-hidden p-6 space-y-4 animate-pulse">
        <img
          src={`http://localhost:5000/${user.image}`}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"
        />
        <h2 className="text-2xl font-semibold text-center mb-2 text-white">
          {user.name}
        </h2>
        <p className="text-white text-center mb-4">{user.email}</p>

        <form className="space-y-4 w-full">
          {/* Form fields for user details */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="input-field text-black block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isEditing}
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="input-field text-black block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isEditing}
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="input-field text-black block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isEditing}
          />
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="input-field text-black block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isEditing}
          />
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Gender"
            className="input-field text-black block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isEditing}
          />
        </form>

        <div className="flex justify-center mt-4">
          {isEditing ? (
            <button
              onClick={handleSaveClick}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
            >
              <FaSave className="mr-2" />
              Save
            </button>
          ) : (
            <button
              onClick={handleEditClick}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none"
            >
              <FaEdit className="mr-2" />
              Edit
            </button>
          )}
        </div>

        {/* Display last payment details */}
        {lastPayment && (
          <div className="text-white">
            <p className="text-2xl font-semibold text-center mb-2 text-white">
              Last Payment Details:
            </p>
            <p className="text-white text-center mb-4">
              Amount: {lastPayment.amount}
            </p>
            <p className="text-white text-center mb-4">
              Status: {lastPayment.status}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
