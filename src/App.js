import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom"; // Change to HashRouter
import React, { useState } from "react";
import common from "./helpers/common";

function App() {
  return (
    <>
      <Router></Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
