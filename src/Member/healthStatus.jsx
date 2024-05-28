import React, { useState } from "react";

const HealthStatus = () => {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmiResult, setBmiResult] = useState(null);

  const handleCalculateBMI = (e) => {
    e.preventDefault();

    // Validate input values
    if (!isNumeric(age) || !isNumeric(height) || !isNumeric(weight)) {
      alert("Please enter valid numeric values for Age, Height, and Weight.");
      return;
    }

    // Calculate BMI
    const heightInMeters = height / 100; 
    const bmi = weight / (heightInMeters * heightInMeters);
    const bmiStatus = getBmiStatus(bmi);

    // Set BMI result and status
    setBmiResult({
      bmi: bmi.toFixed(2),
      status: bmiStatus,
    });
  };

  const isNumeric = (value) => {
    return /^\d+$/.test(value);
  };

  const getBmiStatus = (bmi) => {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return "Normal weight";
    } else if (bmi >= 25 && bmi <= 29.9) {
      return "Overweight";
    } else {
      return "Obesity";
    }
  };

  const handleReset = () => {
    setAge("");
    setHeight("");
    setWeight("");
    setBmiResult(null);
  };

  const getBmiResultColor = (status) => {
    switch (status) {
      case "Normal weight":
        return "text-green-600";
      case "Underweight":
        return "text-yellow-600";
      default:
        return "text-red-600";
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h1 className="mb-6 text-3xl font-extrabold text-center text-gray-900">
            BMI Calculator
          </h1>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <input
                type="text"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Age.."
              />
            </div>
            <div>
              <label
                htmlFor="height"
                className="block text-sm font-medium text-gray-700"
              >
                Height (cm)
              </label>
              <input
                type="text"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Height.."
              />
            </div>
            <div>
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-gray-700"
              >
                Weight (kg)
              </label>
              <input
                type="text"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300  text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Weight.."
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                onClick={handleCalculateBMI}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Calculate BMI
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Reset
              </button>
            </div>
          </form>
          {bmiResult && (
            <div className="mt-6 text-center">
              <p
                className={`text-lg font-semibold ${getBmiResultColor(bmiResult.status)}`}
              >
                Your BMI is {bmiResult.bmi} - {bmiResult.status}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthStatus;
