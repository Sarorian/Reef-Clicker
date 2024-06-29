import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { Game } from "./pages/Game";
import { NavigationBar } from "./components/NavigationBar";

function App() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);

  const onLoggedIn = ({ user, token }) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  useEffect(() => {
    // Perform any necessary side effects based on user/token state changes
    // Example: Fetch additional data or perform actions upon login/logout
    if (user && token) {
      console.log("User logged in:", user.Username);
    }
  }, [user, token]);

  return (
    <>
      <Router>
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        />
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Col md={5}>
                  <Game user={user} />
                </Col>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/login"
            element={<LoginPage onLoggedIn={onLoggedIn} />}
          />
        </Routes>
      </Router>

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
