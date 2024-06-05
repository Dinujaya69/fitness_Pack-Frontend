import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for making HTTP requests

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5); // Default rating is 5 stars

  useEffect(() => {
    // Fetch reviews from the backend when the component mounts
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("/api/review/reviews"); // Replace "/api/review/reviews" with your backend endpoint
      setReviews(response.data.reviews); // Assuming the backend returns reviews in the form of an array
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      // Send review data to the backend
      await axios.post("/api/review/reviews", {
        name,
        email,
        message,
        rating,
      });

      // Reset the form fields and set submitted to true
      setName("");
      setEmail("");
      setMessage("");
      setRating(5);
      setSubmitted(true);

      // Refetch reviews to update the list with the new review
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="bg-transparent min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Contact Us
        </h1>
        <div className="bg-black bg-opacity-60 rounded-lg shadow-lg overflow-hidden">
          <div className="px-8 py-6">
            {submitted ? (
              <div className="text-center">
                <p className="text-xl font-semibold text-green-600 mb-2">
                  Thank you for your message!
                </p>
                <p className="text-lg text-gray-200">
                  We'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block text-gray-200 text-sm font-bold mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:border-red-500"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-gray-200 text-sm font-bold mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 text-black  rounded-md focus:outline-none focus:border-red-500"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-gray-200 text-sm font-bold mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-black resize-none focus:outline-none focus:border-red-500"
                    rows="6"
                    placeholder="Write your message here"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="mb-6">
                  <p className="block text-gray-200 text-sm font-bold mb-2">
                    Rating
                  </p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <img
                        key={i}
                        src={
                          i < rating
                            ? "https://img.icons8.com/?size=100&id=bSBJ7165l9Vr&format=png&color=000000"
                            : "https://img.icons8.com/?size=100&id=7856/star"
                        }
                        alt="star"
                        className="h-5 w-5 cursor-pointer"
                        onClick={() => setRating(i + 1)}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-red-500 text-white font-bold py-2 px-8 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 transition duration-300"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="max-w-4xl mx-auto px-4 mt-20">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Testimonials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border-4 border-gray-700"
            >
              <p className="text-white text-base mb-4">{review.message}</p>
              <div className="flex justify-between items-center">
                <p className="text-gray-400 text-sm">
                  - {review.name}, {review.email}
                </p>
                <div className="flex items-center">
                  {/* Display star ratings */}
                  {[...Array(review.rating)].map((_, i) => (
                    <img
                      key={i}
                      src="https://img.icons8.com/?size=100&id=bSBJ7165l9Vr&format=png&color=000000"
                      alt="star"
                      className="h-5 w-5"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
