import uuid from 'react-uuid';

class Asteroid {
  asteroidID;
  imageName;
  startingPosition;
  asteroidKind;
  asteroidSize;
  startingHealthPoints;
  startingSpeed;
  technologies;

  constructor(imageName, startingPosition, technologies = null) {
    this.asteroidID = uuid();
    this.imageName = imageName;
    this.startingPosition = startingPosition;
    this.technologies = technologies;
    const asteroidKind = this.getAsteroidKind(imageName);
    this.setKindDependentProperties(asteroidKind);
  }

  getAsteroidKind(imageName) {
    const [prefix, asteroidKind, number] = imageName.split('-');
    return asteroidKind;
  }

  setKindDependentProperties(asteroidKind) {
    let asteroidSize;
    let startingHealthPoints;
    let startingSpeed;
    switch (asteroidKind) {
      case 'bit': {
        asteroidSize = 2;
        startingHealthPoints = 1;
        startingSpeed = 1;
        break;
      }
      case 'fragment': {
        asteroidSize = 4;
        startingHealthPoints = 2;
        startingSpeed = 2;
        break;
      }
      case 'whole': {
        asteroidSize = 8;
        startingHealthPoints = 5;
        startingSpeed = 1;
        break;
      }
      default: {
        asteroidSize = 8;
      }
    }
    this.asteroidKind = asteroidKind;
    this.asteroidSize = asteroidSize;
    this.startingHealthPoints = startingHealthPoints;
    this.startingSpeed = startingSpeed;
  }
}

export default Asteroid;
