import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { control } from "./App";

const Profile = () => {
  const { userFound } = useContext(control);

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-gray-200 px-11 py-11 p-8 rounded shadow-md w-full sm:w-96">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-semibold text-gray-800">Profile</h3>
          <span className="text-3xl" role="img" aria-label="profile-symbol">
          🕴🏻
          </span>
        </div>
        <div className="mb-4">
          <div className="mb-2">
            <span className="font-semibold text-red-700">First Name:</span>{" "}
            {userFound.fname}
          </div>
          <div className="mb-2">
            <span className="font-semibold text-red-700">Last Name:</span>{" "}
            {userFound.lname}
          </div>
          <div className="mb-2">
            <span className="font-semibold text-red-700">Phone Number:</span>{" "}
            {userFound.phone}
          </div>
          <div>
            <span className="font-semibold text-red-700">Email Address:</span>{" "}
            {userFound.email}
          </div>
        </div>
        {/* Add profile-related content here */}
        <div className="mb-4">
          {/* Display additional profile information */}
        </div>
        <Link
          to="/"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Profile;
