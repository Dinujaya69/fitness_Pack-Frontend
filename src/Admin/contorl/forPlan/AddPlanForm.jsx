import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const AddPlanForm = ({ onAddPlan }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    planImage: null, // Changed initial value to null
  });

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    // For file input, access e.target.files
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // FormData is used for multipart/form-data requests (like file uploads)
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("planImage", formData.planImage); // Append the file

      const response = await axios.post(
        "http://localhost:5000/api/plan/add",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type for file uploads
          },
        }
      );
      console.log("Plan added successfully:", response.data);
      onAddPlan(); // Refresh the list of plans
      // Reset the form and close the popup
      setFormData({
        title: "",
        price: "",
        description: "",
        planImage: null, // Reset plan image to null
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding plan:", error.response.data); // Log the server response
    }
  };

  return (
    <div>
      <Button onClick={togglePopup} variant="contained" color="primary">
        New Plan
      </Button>
      <Dialog open={isOpen} onClose={togglePopup}>
        <DialogTitle>Add New Plan</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Title:
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Price:
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description:
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Plan Image:
              </label>
              <input
                type="file"
                name="planImage"
                accept="image/*"
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <DialogActions>
              <Button onClick={togglePopup} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="secondary" autoFocus>
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPlanForm;
