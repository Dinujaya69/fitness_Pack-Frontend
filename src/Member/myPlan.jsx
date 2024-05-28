import React, { useState, useEffect } from "react";
import axios from "axios";

const LastPaymentDetails = () => {
  const [lastPayment, setLastPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLastPayment = async () => {
      try {
        const response = await axios.get("api/payment/myplan/lastpayment");
        setLastPayment(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching last payment:", error);
      }
    };

    fetchLastPayment();
  }, []);

  if (loading) {
    return (
      <div className="p-4  rounded-md shadow-md">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  if (!lastPayment) {
    return (
      <div className="p-4 rounded-md shadow-md">
        <p className="text-center">No payment found</p>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
      <p>
        <span className="font-semibold">Amount:</span> {lastPayment.amount}
      </p>
      <p>
        <span className="font-semibold">Currency:</span> {lastPayment.currency}
      </p>
      <p>
        <span className="font-semibold">Status:</span> {lastPayment.status}
      </p>
      <p>
        <span className="font-semibold">Payment Method:</span>{" "}
        {lastPayment.paymentMethod}
      </p>
      <p>
        <span className="font-semibold">Plan Name:</span>{" "}
        {lastPayment.planId.title}
      </p>
      <p>
        <span className="font-semibold">Plan Description:</span>{" "}
        {lastPayment.planId.description}
      </p>
      <p>
        <span className="font-semibold">Payment Date:</span>{" "}
        {new Date(lastPayment.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default LastPaymentDetails;
