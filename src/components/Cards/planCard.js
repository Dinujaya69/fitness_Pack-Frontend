import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const stripePromise = loadStripe(
  "pk_test_51PJx5nSCawkqcSvpFkfC9PpaKhtVCOzjfa52KxXs42psyGGq0IHyMy44VcZ6XWa8qXq1zl9TSf5tzbDiK0raDMac00001mp6DP"
);

const PlanCard = ({ option }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    try {
      const { data } = await axios.post(
        "/api/payment/create-checkout-session",
        {
          plan: [option],
          logeduserid: user._id,
        }
      );

      const result = await stripe.redirectToCheckout({
        sessionId: data.id,
      });

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

  return (
    <Box className="w-full sm:w-1/2 lg:w-1/3 p-3">
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h5" component="div">
            {option.title}
            {option.title === "Six Month" && (
              <Typography component="span" color="primary" className="ml-2">
                (Most Popular)
              </Typography>
            )}
          </Typography>
          <Typography variant="h4" color="text.secondary">
            LKR{option.price}.00
          </Typography>
          <Box component="ul" className="pl-0">
            {option.description &&
              option.description.map((description, idx) => (
                <Box
                  component="li"
                  key={idx}
                  className="flex items-center mb-2"
                >
                  <CheckCircle color="success" />
                  <Typography variant="body2" className="ml-2">
                    {description}
                  </Typography>
                </Box>
              ))}
          </Box>
        </CardContent>
        <CardActions sx={{ marginTop: "auto", justifyContent: "center" }}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            className="w-full"
            onClick={handleButtonClick}
          >
            {user ? "Buy Now" : "Join with Us"}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default PlanCard;
