import React, { createContext, useEffect, useState } from "react";
//import routes and route
import { Routes, Route } from "react-router-dom";

//import components
import Header from "./components/Header";
import Footer from "./components/Footer";
//import pages
import Home from "./pages/Home";
import PropertyDeatails from "./pages/PropertyDetails";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";
import Profile from "./Profile";
import Cart from "./pages/Cart";
export const control = createContext();
const App = () => {
  const [isLog, setLog] = useState(false);

  const [userData, setUserData] = useState([]);
  const [userFound, setUserFound] = useState([]);
  // const [signIn, setSignIn] = useState(false);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserData(data);
      });
  }, []);
  return (
    <div className="max-w-[1440px] mx-auto bg-white">
      <control.Provider value={{ userData, userFound, setUserFound }}>
        <Header isLog={isLog} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property/:id" element={<PropertyDeatails />} />
          <Route path="/login" element={<Login setLog={setLog} />} />
          <Route path="/logout" element={<Logout setLog={setLog} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart/" element={<Cart />} />

          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </control.Provider>
    </div>
  );
};

export default App;
