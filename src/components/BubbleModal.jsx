import React, { useEffect, useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";

export const BubbleModal = ({ show, onHide, region, finalLife }) => {
  const [displayedLife, setDisplayedLife] = useState(null);
  const [isFlashing, setIsFlashing] = useState(true);
  const tickerRef = useRef();

  // Uncomment and adjust if you want to re-enable flashing effect
  // useEffect(() => {
  //   if (show) {
  //     setIsFlashing(true); // Reset flashing state when modal is shown

  //     const flashingInterval = setInterval(() => {
  //       const randomLife =
  //         region.Lifes[Math.floor(Math.random() * region.Lifes.length)];
  //       setDisplayedLife(randomLife);
  //     }, 100);

  //     setTimeout(() => {
  //       clearInterval(flashingInterval);
  //       setDisplayedLife(finalLife);
  //       setIsFlashing(false);
  //       if (tickerRef.current) {
  //         tickerRef.current.classList.add("ticker-stopped");
  //       }
  //     }, 3000); // Flashing duration (3 seconds)

  //     return () => clearInterval(flashingInterval);
  //   }
  // }, [show, region, finalLife]);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>New Life!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <img
            src={`/images/${finalLife.Name.toLowerCase().replace(
              /\s+/g,
              ""
            )}.png`}
            alt={finalLife.Name}
            data-rarity={finalLife.Rarity}
            style={{
              maxWidth: "150px",
              maxHeight: "150px",
            }}
            className="image-with-glow"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
