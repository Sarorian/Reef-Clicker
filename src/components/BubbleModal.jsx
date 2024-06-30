import React, { useEffect, useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";

export const BubbleModal = ({ show, onHide, region, finalLife }) => {
  const [displayedLife, setDisplayedLife] = useState(null);
  const [isFlashing, setIsFlashing] = useState(true);
  const tickerRef = useRef();

  useEffect(() => {
    if (show) {
      setIsFlashing(true); // Reset flashing state when modal is shown

      const flashingInterval = setInterval(() => {
        const randomLife =
          region.Lifes[Math.floor(Math.random() * region.Lifes.length)];
        setDisplayedLife(randomLife);
      }, 100);

      setTimeout(() => {
        clearInterval(flashingInterval);
        setDisplayedLife(finalLife);
        setIsFlashing(false);
        if (tickerRef.current) {
          tickerRef.current.classList.add("ticker-stopped");
        }
      }, 3000); // Flashing duration (3 seconds)

      return () => clearInterval(flashingInterval);
    }
  }, [show, region, finalLife]);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Discovering Life</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {region.Lifes && (
          <div className="ticker-container" ref={tickerRef}>
            <div className="ticker-content">
              {region.Lifes.map((life, index) => (
                <img
                  key={index}
                  src={`/images/${life.Name.toLowerCase().replace(
                    /\s+/g,
                    ""
                  )}.png`}
                  alt={life.Name}
                  className={`ticker-image ${isFlashing ? "silhouette" : ""}`}
                />
              ))}
            </div>
          </div>
        )}
        {!isFlashing && displayedLife && (
          <div>
            <h3>{displayedLife.Name}</h3>
            <p>{displayedLife.Description}</p>
            <p>Size: {displayedLife.Size} in.</p>
            <p>Value: {displayedLife.Value} Pearls</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
