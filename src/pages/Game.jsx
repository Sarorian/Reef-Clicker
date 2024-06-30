import React, { useEffect, useState } from "react";
import common from "../helpers/common";

export const Game = ({ user, token }) => {
  const [pearls, setPearls] = useState(0);

  const fetchUserData = () => {
    fetch(`http://localhost:8080/users/${user.Username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPearls(data.Pearls);
      })
      .catch((error) => {
        common.displayMessage(
          "error",
          error.message || "Error fetching user data"
        );
      });
  };

  const updatePearlsInDatabase = (newPearls) => {
    fetch(`http://localhost:8080/users/${user.Username}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ Pearls: newPearls }),
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        setPearls(updatedUser.Pearls);
      })
      .catch((error) => {
        common.displayMessage("error", error.message || "Error");
      });
  };

  useEffect(() => {
    fetchUserData();
  }, [user.Username, token]); // Only fetch user data on mount or if user.Username/token changes

  useEffect(() => {
    const intervalId = setInterval(() => {
      updatePearlsInDatabase(pearls);
    }, 60000);

    return () => clearInterval(intervalId);
  }, [pearls, user.Username, token]);

  const handleButtonClick = () => {
    setPearls((prevPearls) => prevPearls + 1);
  };

  const handleSaveButtonClick = () => {
    updatePearlsInDatabase(pearls);
  };

  return (
    <>
      <div>hello this is the game yes. your fish is {user.Fish}</div>
      <div>Your pearls count: {pearls}</div>
      <button onClick={handleButtonClick}>Increase Pearls</button>
      <button onClick={handleSaveButtonClick}>Save Pearls</button>
    </>
  );
};
