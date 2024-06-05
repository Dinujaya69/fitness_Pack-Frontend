import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const PlanMain = () => {
  const { user } = useContext(AuthContext);
  const [newPlan, setNewPlan] = useState({
    title: "",
    price: "",
    description: [],
  });
  const [image, setImage] = useState(null);

  const handleAddPlan = async () => {
    const formData = new FormData();
    formData.append("title", newPlan.title);
    formData.append("price", newPlan.price);
    formData.append("description", JSON.stringify(newPlan.description));
    formData.append("image", image);

    try {
      const response = await axios.post("/api/plan/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      // Reset the form
      setNewPlan({ title: "", price: "", description: [] });
      setImage(null);
    } catch (error) {
      console.error("Error adding plan:", error);
    }
  };

  if (!user || user.role !== "admin") {
    return <div>Access Denied</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-gray-900 shadow-lg rounded-lg p-6 mt-10">
      <h1 className="text-2xl font-bold mb-4 text-red-500">Add New Plan</h1>
      <input
        className="w-full p-2 mb-4 border border-red-500 bg-gray-800 text-white rounded"
        type="text"
        placeholder="Title"
        value={newPlan.title}
        onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
      />
      <input
        className="w-full p-2 mb-4 border border-red-500 bg-gray-800 text-white rounded"
        type="text"
        placeholder="Price"
        value={newPlan.price}
        onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
      />
      <input
        className="w-full p-2 mb-4 border border-red-500 bg-gray-800 text-white rounded"
        type="text"
        placeholder="Description (comma-separated)"
        value={newPlan.description.join(", ")}
        onChange={(e) =>
          setNewPlan({ ...newPlan, description: e.target.value.split(",") })
        }
      />
      <input
        className="w-full p-2 mb-4 border border-red-500 bg-gray-800 text-white rounded"
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button
        className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
        onClick={handleAddPlan}
      >
        Add Plan
      </button>
    </div>
  );
};

export default PlanMain;
