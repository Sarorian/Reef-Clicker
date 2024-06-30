import { toast } from "react-toastify";

const dropChances = {
  Common: 50,
  Uncommon: 25,
  Rare: 15,
  "Ultra Rare": 6,
  Legendary: 3,
  Mythic: 0.9,
  Exotic: 0.1,
};

const common = {
  displayMessage: (level, errorMsg) => {
    let msg = "";
    switch (true) {
      case /.*Firebase.*auth\/too-many-requests.*/.test(errorMsg):
        msg = "Error 403. Too many authentication requests";
        break;
      case /.*Firebase.*auth.*/.test(errorMsg):
        msg = "Error 400. Authentication error";
        break;
      default:
        msg = errorMsg;
        break;
    }
    return toast[level](msg);
  },

  getRandomLife: (bubble) => {
    const organisms = bubble.Lifes.map((life) => {
      return {
        ...life,
        dropChance: dropChances[life.Rarity],
      };
    });

    const totalWeight = organisms.reduce(
      (sum, organism) => sum + organism.dropChance,
      0
    );
    let randomValue = Math.random() * totalWeight;

    for (const organism of organisms) {
      if (randomValue < organism.dropChance) {
        const size = common.getRandomSize(organism.MinSize, organism.MaxSize);
        let value = common.calculateValueBasedOnSize(
          organism.Value,
          size,
          organism.MinSize,
          organism.MaxSize
        );

        const shiny = Math.random() < 0.1;
        if (shiny) {
          value *= 2;
        }

        // Construct lifeObject
        const lifeObject = {
          Name: organism.Name,
          Region: organism.Region,
          Type: organism.Type,
          Description: organism.Description,
          Rarity: organism.Rarity,
          Value: value,
          Size: size,
          ScientificName: organism.ScientificName,
          Shiny: shiny,
          ImageURL: organism.ImageURL,
        };

        return lifeObject;
      }
      randomValue -= organism.dropChance;
    }
  },

  getRandomSize: (min, max) => {
    let size = 0;
    for (let i = 0; i < 6; i++) {
      size += Math.random();
    }
    size = (size / 6) * (max - min) + min;

    // Ensure the size is within the min and max bounds
    size = Math.max(min, Math.min(size, max));

    // Round to 2 decimal places
    size = parseFloat(size.toFixed(2));

    return size;
  },

  calculateValueBasedOnSize: (baseValue, size, min, max) => {
    const range = max - min;

    // Scale factor ranges from 0.5 to 1.5
    const scaleFactor = (size - min) / range; // Normalized size within the range
    let adjustedValue = baseValue * (0.5 + scaleFactor); // Scale from 0.5 to 1.5
    adjustedValue = parseFloat(adjustedValue.toFixed(2));
    return adjustedValue;
  },

  getTickerLifes: (region) => {
    let tickerLifes = [];

    if (region && region.Lifes && region.Lifes.length > 0) {
      const numLifesToAdd = 20;

      const randomIndexes = [];
      while (randomIndexes.length < numLifesToAdd) {
        const randomIndex = Math.floor(Math.random() * region.Lifes.length);
        if (!randomIndexes.includes(randomIndex)) {
          randomIndexes.push(randomIndex);
        }
      }

      // Add the corresponding lifes to tickerLifes based on randomIndexes
      tickerLifes = randomIndexes.map((index) => region.Lifes[index]);
    }

    return tickerLifes;
  },
};

export default common;
