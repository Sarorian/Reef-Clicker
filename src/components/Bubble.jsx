import React from "react";

export const Bubble = ({ region, handleBubbleClick }) => {
  return <button onClick={handleBubbleClick}>{region.Name}</button>;
};
