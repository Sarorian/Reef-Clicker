import React, { useState } from "react";
import { Bubble } from "../components/Bubble";
import { BubbleModal } from "../components/BubbleModal";
import common from "../helpers/common";

export const BubbleShop = ({ regions }) => {
  const [newestLife, setNewestLife] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleBubbleClick = (region) => {
    const life = common.getRandomLife(region);
    setNewestLife(life);
    setSelectedRegion(region);
    setShowModal(true);
  };

  return (
    <>
      <ul>
        {regions.map((region) => (
          <li key={region._id}>
            <Bubble
              region={region}
              handleBubbleClick={() => handleBubbleClick(region)}
            />
          </li>
        ))}
      </ul>
      {selectedRegion && newestLife && (
        <BubbleModal
          show={showModal}
          onHide={() => setShowModal(false)}
          region={selectedRegion}
          finalLife={newestLife}
        />
      )}
    </>
  );
};
