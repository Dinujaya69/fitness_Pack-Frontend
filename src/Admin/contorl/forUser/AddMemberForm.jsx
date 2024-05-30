import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AuthContext } from "../../../context/AuthContext"; // Adjust the path as per your file structure

const AddMemberForm = () => {
  const { dispatch } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [image, setImage] = useState(null);
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/plan/plans"
        );
        setPlans(response.data);
      } catch (error) {
        console.error("Error fetching plans:", error);
        toast.error("Error fetching plans");
      }
    };

    fetchPlans();
  }, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handlePlanSelect = (e) => {
    setSelectedPlan(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      name === "" ||
      gender === "" ||
      email === "" ||
      !email.includes("@") ||
      password === "" ||
      password.length < 6 ||
      phone === "" ||
      !/^\d{10}$/.test(phone) ||
      address === "" ||
      age === "" ||
      !selectedPlan
    ) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("age", age);
    formData.append("selectedPlan", selectedPlan);
    formData.append("address", address);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Member added successfully!");
        dispatch({ type: "REGISTER_SUCCESS" }); // Refresh the list of users
        resetForm();
        setIsOpen(false);
      } else {
        toast.error(
          `Unexpected response from server: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error adding member:", error);
      toast.error(
        `Error adding member: ${
          error.response?.data?.message || error.message || "Unknown error"
        }`
      );
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setGender("");
    setPassword("");

    setPhone("");
    setSelectedPlan("");
    setAddress("");
    setImage(null);
    setAge("");
  };

  return (
    <div>
      <Button onClick={togglePopup} variant="contained" color="primary">
        New Member
      </Button>
      <Dialog open={isOpen} onClose={togglePopup}>
        <DialogTitle>Register New Member</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h1 className="text-2xl font-bold mb-4">Registration Form</h1>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="mb-4">
                  <label className="block text-fuchsia-50 text-sm font-bold mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-fuchsia-50 text-sm font-bold mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-fuchsia-50 text-sm font-bold mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-fuchsia-50 text-sm font-bold mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-fuchsia-50 text-sm font-bold mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-fuchsia-50 text-sm font-bold mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-fuchsia-50 text-sm font-bold mb-2">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-fuchsia-50 text-sm font-bold mb-2">
                    Plan <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={selectedPlan}
                    onChange={handlePlanSelect}
                    required
                  >
                    <option value="">Select a plan</option>
                    {plans.map((plan) => (
                      <option key={plan._id} value={plan._id}>
                        {plan.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-fuchsia-50 text-sm font-bold mb-2">
                    Profile Image
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add Member
                </button>
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={togglePopup} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddMemberForm;
