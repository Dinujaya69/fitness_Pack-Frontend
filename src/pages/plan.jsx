import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import PlanCard from "../components/Cards/planCard";

const Plan = () => {
  const [planOptions, setPlanOptions] = useState([]);

  useEffect(() => {
    const fetchPlanOptions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/plan/plans");
        setPlanOptions(response.data);
      } catch (error) {
        console.error("Error fetching plan options:", error);
      }
    };

    fetchPlanOptions();
  }, []);

  if (!planOptions || planOptions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="mx-auto max-w-screen-xl px-8 lg:px-20 mt-20">
      <Typography variant="h2" className="text-center my-8 tracking-wider">
        Program Plans
      </Typography>
      <Box className="flex flex-wrap">
        {planOptions.map((option, index) => (
          <PlanCard key={index} option={option} />
        ))}
      </Box>
    </Box>
  );
};

export default Plan;
