export const LifeView = ({ life }) => {
  const lifeName = life.Name.toLowerCase().replace(/\s+/g, "");

  return (
    <div>
      <h4>{life.Name}</h4>
      <p>Type: {life.Type}</p>
      <p>Description: {life.Description}</p>
      <p>Rarity: {life.Rarity}</p>
      <p>Value: {life.Value}</p>
      <p>Scientific Name: {life.ScientificName}</p>
      <p>
        <img
          src={`/images/${lifeName}.png`}
          alt=""
          data-rarity={life.Rarity}
          style={{
            maxWidth: "150px",
            maxHeight: "150px",
          }}
          className="image-with-glow"
        />
      </p>
    </div>
  );
};
