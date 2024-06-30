import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const RegionsPage = ({ regionsData }) => {
  useEffect(() => {}, []);

  return (
    <div>
      <h2>All Regions</h2>
      <ul>
        {regionsData.map((region) => (
          <li key={region._id}>
            <Link to={`/regions/${region.Name}`}>{region.Name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
