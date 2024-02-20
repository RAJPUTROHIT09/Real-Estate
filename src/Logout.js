import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { control } from "./App";

const Logout = ({ setLog }) => {
  const nav = useNavigate();
  const { userFound } = useContext(control);
  const [showPopup, setShowPopup] = useState(false);

  const clickHandler = () => {
    // Show the confirmation popup
    setShowPopup(true);
  };

  const confirmLogout = () => {
    // Close the popup
    setShowPopup(false);
    // Perform logout
    setLog(false);
    // Navigate to home page
    nav('/');
  };

  const cancelLogout = () => {
    // Close the popup
    setShowPopup(false);
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-semibold">Log Out</h3>
          {/* User Symbol */}
          <span className="text-2xl" role="img" aria-label="user-symbol">
            👤
          </span>
        </div>
        <div className="mb-4">
          Welcome, <span className="text-red-600">{userFound.fname}</span>
        </div>
        <button
          onClick={clickHandler}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Logout
        </button>

        {/* Confirmation Popup */}
        {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-md">
              <p>Are you sure you want to logout?</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={confirmLogout}
                  className="bg-blue-500 text-white py-2 px-4 mr-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                >
                  Yes
                </button>
                <Link
                  to="/"
                  onClick={cancelLogout}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:shadow-outline-gray active:bg-gray-500"
                >
                  No
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logout;
