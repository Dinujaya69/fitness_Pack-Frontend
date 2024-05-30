import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPaymentPage = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("/api/payment/payment/details");
        setPayments(response.data.payments);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div>
      <h2>Admin Payment Page</h2>
      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Status</th>
            <th>Payment Method</th>
            <th>Customer Name</th>
            <th>Plan ID</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.paymentId}>
              <td>{payment.paymentId}</td>
              <td>{payment.amount}</td>
              <td>{payment.currency}</td>
              <td>{payment.status}</td>
              <td>{payment.paymentMethod}</td>
              <td>{payment.customerName}</td>
              <td>{payment.planId}</td>
              <td>{new Date(payment.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPaymentPage;
