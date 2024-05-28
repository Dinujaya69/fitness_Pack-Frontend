import React, { useState, useEffect } from "react";
import axios from "axios";

const PaymentDetails = () => {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        // Make req to backend route to get payment details
        const response = await axios.get("/api/payment/payment/details");

        // Set the payment details
        setPaymentDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payment details:", error);
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!paymentDetails) {
    return <p>No payment details found.</p>;
  }

  return (
    <div>
      <h2>Payment Details</h2>
      <p>Amount: {paymentDetails.amount}</p>
      <p>Currency: {paymentDetails.currency}</p>
      <p>Status: {paymentDetails.status}</p>
      <p>Payment Method: {paymentDetails.paymentMethod}</p>
      <h3>User Details</h3>
      <p>Name: {paymentDetails.customerId.name}</p>
      <p>Email: {paymentDetails.customerId.email}</p>
      <h3>Plan Details</h3>
      <p>Name: {paymentDetails.planId.name}</p>
      <p>Description: {paymentDetails.planId.description}</p>
    </div>
  );
};

export default PaymentDetails;
