import React, { useEffect, useState } from "react";
import axios from "axios";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PaymentsIcon from "@mui/icons-material/Payments";
import CountUp from "react-countup";
import AdminPaymentPage from "./payment";

const Dashboard = () => {
  const [memberCount, setMemberCount] = useState(0);
  const [planCount, setPlanCount] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);
  const [trainerCount, setTrainerCount] = useState(0);

  useEffect(() => {
    const fetchMemberCount = async () => {
      try {
        const response = await axios.get("/api/user/member-count");
        setMemberCount(response.data.count);
      } catch (error) {
        console.error("Error fetching member count", error);
      }
    };

    const fetchPlanCount = async () => {
      try {
        const response = await axios.get("/api/user/plan-count");
        setPlanCount(response.data.count);
      } catch (error) {
        console.error("Error fetching plan count", error);
      }
    };
    const fetchTrainerCount = async () => {
      try {
        const response = await axios.get("/api/user/trainer-count");
        setTrainerCount(response.data.count);
      } catch (error) {
        console.error("Error fetching plan count", error);
      }
    };
    

    const fetchTotalPayments = async () => {
      try {
        const response = await axios.get("/api/user/total-payments");
        setTotalPayments(response.data.totalAmount);
      } catch (error) {
        console.error("Error fetching total payments", error);
      }
    };
    fetchTrainerCount();
    fetchMemberCount();
    fetchPlanCount();
    fetchTotalPayments();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-transparent to-gray-900 p-8">
      <h1 className="text-4xl font-bold text-center text-white mb-8 drop-title">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card border-3d p-6 rounded-lg shadow-lg flex flex-col items-center">
          <PeopleIcon
            className="icon-drop"
            style={{ fontSize: 50, color: "white" }}
          />
          <h2 className="text-2xl font-semibold text-white mb-4 drop-text">
            Member Count
          </h2>
          <CountUp
            className="text-4xl text-white drop-text"
            end={memberCount}
            duration={2}
          />
        </div>
        <div className="card border-3d p-6 rounded-lg shadow-lg flex flex-col items-center">
          <PeopleIcon
            className="icon-drop"
            style={{ fontSize: 50, color: "white" }}
          />
          <h2 className="text-2xl font-semibold text-white mb-4 drop-text">
            Trainer Count
          </h2>
          <CountUp
            className="text-4xl text-white drop-text"
            end={trainerCount}
            duration={2}
          />
        </div>
        <div className="card border-3d p-6 rounded-lg shadow-lg flex flex-col items-center">
          <AssignmentIcon
            className="icon-drop"
            style={{ fontSize: 50, color: "white" }}
          />
          <h2 className="text-2xl font-semibold text-white mb-4 drop-text">
            Plan Count
          </h2>
          <CountUp
            className="text-4xl text-white drop-text"
            end={planCount}
            duration={2}
          />
        </div>
        <div className="card border-3d p-6 rounded-lg  shadow-lg flex flex-col items-center">
          <PaymentsIcon
            className="icon-drop"
            style={{ fontSize: 50, color: "white" }}
          />
          <h2 className="text-2xl font-semibold text-white mb-4 drop-text">
            Total Payments
          </h2>
          <CountUp
            className="text-4xl text-white drop-text"
            end={totalPayments}
            duration={2}
          />
        </div>
      </div>
      <AdminPaymentPage />
    </div>
  );

};

export default Dashboard;
