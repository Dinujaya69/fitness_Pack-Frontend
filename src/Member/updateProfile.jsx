import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog } from "@mui/material";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [planDetails, setPlanDetails] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/me");
        setUserData(response.data.user);
        const planId = response.data.user.selectedPlan;
        const planResponse = await axios.get(
          `http://localhost:5000/api/plan/planid/${planId}`
        );
        setPlanDetails(planResponse.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageClick = () => {
    setImagePreview(userData.image);
    setShowPreview(true);
  };

  const handleEditUserData = () => {
    setEditMode(true);
    setEditedUserData(userData);
  };

  const handleSaveUserData = async () => {
    try {
      const formData = new FormData();
      for (const key in editedUserData) {
        formData.append(key, editedUserData[key]);
      }

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const response = await axios.put(
        `http://localhost:5000/api/user/${userData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUserData(response.data.user);
      setEditMode(false);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const handleInputChange = (e) => {
    setEditedUserData({
      ...editedUserData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  if (!userData || !planDetails) {
    return (
      <div className="text-white flex justify-center items-center h-screen bg-gray-200">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col md:flex-row gap-8 text-black p-8">
        <div className="md:w-1/2 bg-white bg-opacity-70 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">User Profile</h2>
          <div className="mb-4">
            <div className="mb-2">
              <label className="font-semibold">Name:</label>{" "}
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={editedUserData.name}
                  onChange={handleInputChange}
                  className="border-b-2 border-gray-400 focus:outline-none"
                />
              ) : (
                <span>{userData.name}</span>
              )}
            </div>
            <div className="mb-2">
              <label className="font-semibold">Age:</label>{" "}
              {editMode ? (
                <input
                  type="number"
                  name="age"
                  value={editedUserData.age}
                  onChange={handleInputChange}
                  className="border-b-2 border-gray-400 focus:outline-none"
                />
              ) : (
                <span>{userData.age}</span>
              )}
            </div>
            <div className="mb-2">
              <label className="font-semibold">Gender:</label>{" "}
              {editMode ? (
                <input
                  type="text"
                  name="gender"
                  value={editedUserData.gender}
                  onChange={handleInputChange}
                  className="border-b-2 border-gray-400 focus:outline-none"
                />
              ) : (
                <span>{userData.gender}</span>
              )}
            </div>
            <div className="mb-2">
              <label className="font-semibold">Email:</label>{" "}
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={editedUserData.email}
                  onChange={handleInputChange}
                  className="border-b-2 border-gray-400 focus:outline-none"
                />
              ) : (
                <span>{userData.email}</span>
              )}
            </div>
            <div className="mb-2">
              <label className="font-semibold">Phone:</label>{" "}
              {editMode ? (
                <input
                  type="tel"
                  name="phone"
                  value={editedUserData.phone}
                  onChange={handleInputChange}
                  className="border-b-2 border-gray-400 focus:outline-none"
                />
              ) : (
                <span>{userData.phone}</span>
              )}
            </div>
            <div className="mb-2">
              <label className="font-semibold">Address:</label>{" "}
              {editMode ? (
                <input
                  type="text"
                  name="address"
                  value={editedUserData.address}
                  onChange={handleInputChange}
                  className="border-b-2 border-gray-400 focus:outline-none"
                />
              ) : (
                <span>{userData.address}</span>
              )}
            </div>
            <div>
              <label className="font-semibold">Selected Plan:</label>{" "}
              <span>{planDetails.title}</span>
            </div>
          </div>
        </div>

        <div className="md:w-1/2">
          <h2 className="text-2xl text-red-600 justify-center font-bold mb-4">
            Profile Picture
          </h2>
          <img
            src={`http://localhost:5000${userData.image}`}
            alt="Profile Pic"
            className="w-40 h-40 rounded-full shadow-lg cursor-pointer transform transition-transform hover:scale-105"
            onClick={handleImageClick}
          />
          {editMode && (
            <input type="file" onChange={handleFileChange} className="mt-4" />
          )}
          <button
            className={`bg-${editMode ? "green" : "yellow"}-500 hover:bg-${
              editMode ? "green" : "yellow"
            }-700 text-white font-bold py-2 px-4 rounded focus:outline-none mt-8 self-center`}
            onClick={editMode ? handleSaveUserData : handleEditUserData}
          >
            {editMode ? "Save" : "Edit User Data"}
          </button>
        </div>
      </div>

      <Dialog open={showPreview} onClose={() => setShowPreview(false)}>
        <img
          src={`http://localhost:5000${imagePreview}`}
          alt="Profile Preview"
        />
      </Dialog>
    </div>
  );
};

export default UserProfile;
