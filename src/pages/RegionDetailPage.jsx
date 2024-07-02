import React from "react";
import { LifeView } from "../components/LifeView"; // Import LifeView component

export const RegionDetailPage = ({ region }) => {
  const rarityTargets = {
    Common: 15,
    Uncommon: 10,
    Rare: 5,
    "Ultra Rare": 3,
    Legendary: 3,
    Mythic: 2,
    Exotic: 1,
  };

  const rarityCounts = region.Lifes.reduce((counts, life) => {
    counts[life.Rarity] = (counts[life.Rarity] || 0) + 1;
    return counts;
  }, {});

  const remainingCounts = Object.keys(rarityTargets).reduce(
    (remaining, rarity) => {
      remaining[rarity] = rarityTargets[rarity] - (rarityCounts[rarity] || 0);
      return remaining;
    },
    {}
  );

  return (
    <div>
      <h3>Rarity Requirements</h3>
      <ul>
        {Object.keys(rarityTargets).map((rarity) => (
          <li key={rarity}>
            {rarity}: {remainingCounts[rarity]} remaining
          </li>
        ))}
      </ul>
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
