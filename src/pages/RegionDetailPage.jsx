import React from "react";
import { Link } from "react-router-dom";
import { LifeView } from "../components/LifeView"; // Import LifeView component

export const RegionDetailPage = ({ region }) => {
  return (
    <div>
      <h2>{region.Name} Region</h2>
      <p>Description: {region.Description}</p>
      <h3>Fish in {region.Name}:</h3>
      <ul>
        {region.Lifes.map((life) => (
          <li key={life._id}>
            <LifeView life={life} />
          </li>
        ))}
      </ul>
    </div>
  );
};
