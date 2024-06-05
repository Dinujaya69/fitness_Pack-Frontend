import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const TrainerCard = ({ trainer }) => {
  const modifiedEmail = trainer.email.substring(2);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-900 text-white m-4 border-4 border-red-500 transition-transform duration-500 hover:transform hover:-translate-y-2">
      <img
        className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500"
        src={`http://localhost:5000/${trainer.image}`}
        alt={trainer.name}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{trainer.name}</div>
        <p className="text-gray-300 text-base mb-2">Age: {trainer.age}</p>
        <p className="text-gray-300 text-base mb-2">Gender: {trainer.gender}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <div className="flex items-center mb-2">
          <FaPhone className="text-gray-300 mr-2" />
          <span className="text-gray-300">{trainer.phone}</span>
        </div>
        <div className="flex items-center mb-2">
          <FaEnvelope className="text-gray-300 mr-2" />
          <span className="text-gray-300">{modifiedEmail}</span>
        </div>
        <div className="flex items-center mb-2">
          <FaMapMarkerAlt className="text-gray-300 mr-2" />
          <span className="text-gray-300">{trainer.address}</span>
        </div>
      </div>
    </div>
  );
};

const TrainerList = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get("/api/user/trainers");
        setTrainers(response.data.data);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };

    fetchTrainers();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {trainers.map((trainer) => (
        <TrainerCard key={trainer._id} trainer={trainer} />
      ))}
    </div>
  );
};

const App = () => {
  return (
    <div className="container mx-auto p-4 bg-black">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        Trainers
      </h1>
      <TrainerList />
    </div>
  );
};

export default App;
