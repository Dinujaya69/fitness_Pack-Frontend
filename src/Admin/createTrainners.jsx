import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { dispatch } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [plans, setPlans] = useState([]);
  const [image, setImage] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/plan/plans");
        setPlans(response.data);
      } catch (error) {
        console.error("Error fetching plans:", error);
        toast.error("Error fetching plans");
      }
    };

    fetchPlans();
  }, []);

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
      age === "" 
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
    formData.append("address", address);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/registerTrainer",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Registration Successful!");
        dispatch({ type: "REGISTER_SUCCESS" });
        navigate("/login");
        resetForm();
      } else {
        toast.error(
          `Unexpected response from server: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error(
        `Error registering user: ${
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
    setAddress("");
    setImage(null);
    setAge("");
  };
  return (

     <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit}>
        <div className="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl font-bold mb-4">Registration Form</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="mb-4">
              <label
                className="block text-fuchsia-50 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-fuchsia-50 text-sm font-bold mb-2"
                htmlFor="gender"
              >
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="gender"
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
              <label
                className="block text-fuchsia-50 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-fuchsia-50 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-fuchsia-50 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-fuchsia-50 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Address <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-fuchsia-50 text-sm font-bold mb-2"
                htmlFor="age"
              >
                Age <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="age"
                type="text"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
        

             <div>
              <label
                className="block text-fuchsia-50 text-sm font-bold mb-2"
                htmlFor="image"
              >
                Image
              </label>
              <input
                type="file"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
                accept=".jpg,.jpeg,.png"
              />
            </div> 
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="bg-red-800 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    <div>
      <h2>Trainer Details</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((trainer) => (
            <tr key={trainer._id}>
              <td>{trainer.name}</td>
              <td>{trainer.age}</td>
              <td>{trainer.gender}</td>
              <td>{trainer.email}</td>
              <td>{trainer.phone}</td>
              <td>{trainer.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};
