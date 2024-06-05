import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  CardMedia,
} from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";

const stripePromise = loadStripe(
  "pk_test_51PJx5nSCawkqcSvpFkfC9PpaKhtVCOzjfa52KxXs42psyGGq0IHyMy44VcZ6XWa8qXq1zl9TSf5tzbDiK0raDMac00001mp6DP"
);

const PlanCard = ({ option, onDelete }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    try {
      const { data } = await axios.post(
        "/api/payment/create-checkout-session",
        {
          plan: [option],
          loggedUserId: user._id,
        }
      );
      const result = await stripe.redirectToCheckout({ sessionId: data.id });
      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  const handleButtonClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      handleCheckout();
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/plan/delete/${option._id}`);
      onDelete(option._id);
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  return (
    <Box className="w-full sm:w-1/2 lg:w-1/3 p-3" data-aos="fade-up">
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#333",
          color: "#fff",
        }}
        className="border-2 border-red-500 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300"
      >
        {option.planImage && (
          <CardMedia
            component="img"
            height="140"
            image={`http://localhost:5000/${option.planImage}`}
            alt={option.title}
            className="rounded-t-lg"
          />
        )}
        <CardContent sx={{ flex: 1 }} className="p-6">
          <Typography variant="h5" component="div">
            {option.title}
            {option.title === "Six Month" && (
              <Typography
                component="span"
                color="primary"
                className="ml-2 text-red-600"
              >
                (Most Popular)
              </Typography>
            )}
          </Typography>
          <Typography
            variant="h4"
            color="text.secondary"
            className="text-gray-400"
          >
            LKR{option.price}.00
          </Typography>
          <Box component="ul" className="pl-0 mt-4">
            {option.description &&
              option.description.map((description, idx) => (
                <Box
                  component="li"
                  key={idx}
                  className="flex items-center mb-2 text-gray-400"
                >
                  <CheckCircle className="text-green-500" />
                  <Typography variant="body2" className="ml-2">
                    {description}
                  </Typography>
                </Box>
              ))}
          </Box>
        </CardContent>
        <CardActions
          sx={{ marginTop: "auto", justifyContent: "center" }}
          className="p-4"
        >
          <Button
            size="large"
            variant="contained"
            color="primary"
            className="w-full bg-red-600 text-white hover:bg-red-700 transition duration-300"
            onClick={handleButtonClick}
          >
            {user ? "Buy Now" : "Join with Us"}
          </Button>
          {user && user.role === "admin" && (
            <Button
              size="large"
              variant="contained"
              color="secondary"
              className="w-full mt-2 bg-gray-700 text-white hover:bg-gray-800 transition duration-300"
              onClick={handleDelete}
            >
              Delete Plan
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

export default PlanCard;
