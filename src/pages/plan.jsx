import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import PlanCard from "../components/Cards/planCard";
import { AuthContext } from "../context/AuthContext";
import Admin from "../Admin/createPlan";

const Plan = () => {
  const { user } = useContext(AuthContext);
  const [planOptions, setPlanOptions] = useState([]);

  useEffect(() => {
    const fetchPlanOptions = async () => {
      try {
        const response = await axios.get("/api/plan/plans");
        setPlanOptions(response.data);
      } catch (error) {
        console.error("Error fetching plan options:", error);
      }
    };

    fetchPlanOptions();
  }, []);

  const handleDeletePlan = (planId) => {
    setPlanOptions((prevOptions) =>
      prevOptions.filter((option) => option._id !== planId)
    );
  };

  if (!planOptions || planOptions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="mx-auto max-w-screen-xl px-8 lg:px-20 mt-20">
      <Typography variant="h2" className="text-center my-8 tracking-wider">
        Program Plans
      </Typography>
      {user && user.role === "admin" && <Admin />}
      <Box className="flex flex-wrap">
        {planOptions.map((option, index) => (
          <PlanCard key={index} option={option} onDelete={handleDeletePlan} />
        ))}
      </Box>
    </Box>
  );
};

export default Plan;
