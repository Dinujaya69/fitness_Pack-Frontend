import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [dialogOpen, setDialogOpen] = useState({});
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleClickOpen = (paymentId) => {
    setDialogOpen((prevOpen) => ({
      ...prevOpen,
      [paymentId]: true,
    }));
    setSelectedPayment(paymentId);
  };

  const handleClose = () => {
    setDialogOpen((prevOpen) => ({
      ...prevOpen,
      [selectedPayment]: false,
    }));
    setSelectedPayment(null);
  };

  const fetchPayments = async () => {
    try {
      const response = await axios.get("/api/payment/allpayments");
      const filteredPayments = response.data.payments.filter((payment) => {
        const createdAt = new Date(payment.createdAt);
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return createdAt > oneMonthAgo;
      });
      setPayments(filteredPayments);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

 const deletePayment = async (paymentId) => {
   try {
     await axios.delete(`/api/payment/payments/${paymentId}`);
     setPayments((prevPayments) =>
       prevPayments.filter((payment) => payment._id !== paymentId)
     );
     toast.success("Payment deleted successfully");
   } catch (error) {
     console.error("Error deleting payment:", error);
     toast.error("Failed to delete payment");
   }
 };

 const updatePaymentStatus = async (paymentId, status) => {
   try {
     await axios.patch("/api/payment/update-status", { paymentId, status });
     setPayments((prevPayments) =>
       prevPayments.map((payment) =>
         payment._id === paymentId ? { ...payment, status } : payment
       )
     );
     toast.success("Payment status updated successfully");
   } catch (error) {
     console.error("Error updating payment status:", error);
     toast.error("Failed to update payment status");
   }
 };

 useEffect(() => {
   fetchPayments();
 }, []);
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-orange-500";
      case "completed":
        return "text-green-500";
      case "failed":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-yellow-50 border border-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr className="bg-red-800 text-white">
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Currency
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Method
              </th>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Plan
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td className="px-6 py-4">{payment.amount}</td>
                <td className="px-6 py-4">{payment.currency}</td>
                <td className="px-6 py-4">{payment.paymentMethod}</td>
                <td className="px-6 py-4">
                  {payment.customerId ? payment.customerId.name : "Unknown"}
                </td>

                <td className="px-6 py-4">{payment.planId.title}</td>
                <td className="px-6 py-4">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </td>
                <td className={`px-6 py-4 ${getStatusColor(payment.status)}`}>
                  {payment.status}
                </td>
                <td className="px-6 py-4">
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleClickOpen(payment._id)}
                  >
                    Get Action
                  </Button>

                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => deletePayment(payment._id)}
                  >
                    Delete
                  </Button>

                  <Dialog
                    disableEscapeKeyDown
                    open={dialogOpen[payment._id] || false}
                    onClose={handleClose}
                  >
                    <DialogTitle>Select Action</DialogTitle>
                    <DialogContent>
                      <Box
                        component="form"
                        sx={{ display: "flex", flexWrap: "wrap" }}
                      >
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                          <InputLabel htmlFor={`dialog-native-${payment._id}`}>
                            Change Status
                          </InputLabel>
                          <Select
                            native
                            value={selectedStatus}
                            onChange={handleChange}
                            input={
                              <OutlinedInput
                                label="Change Status"
                                id={`dialog-native-${payment._id}`}
                              />
                            }
                          >
                            <option aria-label="None" value="" />
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="failed">Failed</option>
                          </Select>
                        </FormControl>
                      </Box>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button
                        onClick={() => {
                          updatePaymentStatus(payment._id, selectedStatus);
                          handleClose();
                        }}
                      >
                        Ok
                      </Button>
                    </DialogActions>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminPaymentPage;

