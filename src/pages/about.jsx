import React from "react";
import { FaDumbbell, FaUserTie, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

const featured = [
  {
    icon: <FaDumbbell size={40} />,
    title: "Top-notch Facilities",
    subtitle: "State-of-the-art gym equipment and amenities.",
  },
  {
    icon: <FaUserTie size={40} />,
    title: "Expert Guidance",
    subtitle: "Experienced trainers to guide you through your fitness journey.",
  },
  {
    icon: <FaUsers size={40} />,
    title: "Supportive Environment",
    subtitle: "A community dedicated to helping you achieve your goals.",
  },
];

const About = () => {
  return (
    <section className=" py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            About Us
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Welcome to Fitness Pack, your ultimate destination for fitness and
            community. With top-notch facilities, expert guidance, and a
            supportive environment, we're here to empower you on your fitness
            journey. Join us and discover the extraordinary.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className=" rounded-lg p-6 shadow-md flex flex-col items-center border border-red-500"
            >
              <div className="bg-red-500 rounded-full p-5 mb-4 text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-center">{feature.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
