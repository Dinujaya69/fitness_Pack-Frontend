import React, { useState, useContext } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
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
    <Box className="my-8">
      <Typography variant="h5" className="mb-4">
        Add New Plan
      </Typography>
      <TextField
        label="Title"
        value={newPlan.title}
        onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        value={newPlan.price}
        onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={newPlan.description.join(", ")}
        onChange={(e) =>
          setNewPlan({ ...newPlan, description: e.target.value.split(",") })
        }
        fullWidth
        margin="normal"
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        style={{ margin: "20px 0" }}
      />
      <Button variant="contained" color="primary" onClick={handleAddPlan}>
        Add Plan
      </Button>
    </Box>
  );
};

export default PlanMain;
