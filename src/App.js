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
import { RegionsPage } from "./pages/RegionsPage";
import { RegionDetailPage } from "./pages/RegionDetailPage";
import common from "./helpers/common";
import { BubbleShop } from "./pages/BubbleShop";

function App() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [regions, setRegions] = useState([]);

  const onLoggedIn = ({ user, token }) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  useEffect(() => {
    if (user && token) {
      console.log("User logged in:", user.Username);
      fetch("http://localhost:8080/regions", {})
        .then((res) => res.json())
        .then((data) => {
          setRegions(data);
        })
        .catch((error) => {
          common.displayMessage("error", error.message || "Error");
          console.error(error);
        });
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
          <Route
            path="/regions"
            element={<RegionsPage regionsData={regions} />}
          />
          {regions.map((region) => (
            <Route
              key={region.Name}
              path={`/regions/${region.Name}`}
              element={<RegionDetailPage region={region} />}
            />
          ))}
          <Route
            path="/bubbleshop"
            element={<BubbleShop regions={regions} />}
          ></Route>
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
