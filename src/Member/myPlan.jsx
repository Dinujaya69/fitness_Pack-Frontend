import React, { useState, useEffect } from "react";
import axios from "axios";
import { PropagateLoader } from "react-spinners";


const LastPaymentDetails = () => {
  const [lastPayment, setLastPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLastPayment = async () => {
      try {
        const response = await axios.get("/api/payment/myplan/lastpayment");
        setLastPayment(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching last payment:", error);
        setLoading(false);
      }
    };

    fetchLastPayment();
  }, []);



 if (loading) {
   return (
     <div className="flex items-center justify-center min-h-screen bg-transparent bg-opacity-50">
       <PropagateLoader color={"red"} />
     </div>
   );
 }


  if (!lastPayment) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-md shadow-md mb-10">
        <p className="text-center text-gray-600 dark:text-gray-300">
          No payment found
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-transparent dark:bg-gray-800 rounded-md shadow-md mb-8">
      <h2 className="text-2xl flex justify-center items-center min-h-1 font-semibold mb-4  text-gray-100">
        Payment Details
      </h2>
      <div className="flex justify-center items-center min-h-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white border border-red-600 rounded-md overflow-hidden">
            <thead className="text-xs text-gray-700 uppercase bg-slate-300">
              <tr className="bg-red-800 text-white">
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Currency
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment Method
                </th>
                <th scope="col" className="px-6 py-3">
                  Plan Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment Date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr key={lastPayment._id} className="bg-gray-800">
                <td className="px-6 py-4">{lastPayment.amount}</td>
                <td className="px-6 py-4">{lastPayment.currency}</td>
                <td className="px-6 py-4">{lastPayment.status}</td>
                <td className="px-6 py-4">{lastPayment.paymentMethod}</td>
                <td className="px-6 py-4">{lastPayment.planId.title}</td>
                <td className="px-6 py-4">
                  {new Date(lastPayment.createdAt).toLocaleDateString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LastPaymentDetails;
