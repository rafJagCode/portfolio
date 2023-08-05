import uuid from 'react-uuid';

class Asteroid {
  asteroidID;
  imageName;
  startingPosition;
  asteroidKind;
  asteroidSize;
  startingHealthPoints;
  startingSpeed;
  technology;

  constructor(imageName, startingPosition, technology = null) {
    this.asteroidID = uuid();
    this.imageName = imageName;
    this.startingPosition = startingPosition;
    this.technology = technology;
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
        asteroidSize = 20;
        startingHealthPoints = 1;
        startingSpeed = 1;
        break;
      }
      case 'fragment': {
        asteroidSize = 40;
        startingHealthPoints = 2;
        startingSpeed = 2;
        break;
      }
      case 'whole': {
        asteroidSize = 100;
        startingHealthPoints = 5;
        startingSpeed = 1;
        break;
      }
      default: {
        asteroidSize = 100;
      }
    }
    this.asteroidKind = asteroidKind;
    this.asteroidSize = asteroidSize;
    this.startingHealthPoints = startingHealthPoints;
    this.startingSpeed = startingSpeed;
  }
}

export default Asteroid;
