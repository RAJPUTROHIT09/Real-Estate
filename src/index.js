import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

//import Router
import { BrowserRouter as Router } from "react-router-dom";
import HouseContextProvider from "./components/HouseContext";
//import housecontext provider
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HouseContextProvider>
    <Router>
      <App />
    </Router>
  </HouseContextProvider>
);
