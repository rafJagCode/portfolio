import uuid from 'react-uuid';

class Asteroid {
  asteroidID;
  imageName;
  startingPosition;
  asteroidKind;
  asteroidSize;
  startingHealthPoints;

  constructor(imageName, startingPosition) {
    this.asteroidID = uuid();
    this.imageName = imageName;
    this.startingPosition = startingPosition;
    const asteroidKind = this.getAsteroidKind(imageName);
    this.asteroidKind = asteroidKind;
    this.setAsteroidSize(asteroidKind);
    this.setStartingHealthPoints(asteroidKind);
  }

  getAsteroidKind(imageName) {
    const [prefix, asteroidKind, number] = imageName.split('-');
    return asteroidKind;
  }

  setAsteroidSize(asteroidKind) {
    let asteroidSize;
    switch (asteroidKind) {
      case 'bit': {
        asteroidSize = 20;
        break;
      }
      case 'fragment': {
        asteroidSize = 40;
        break;
      }
      case 'whole': {
        asteroidSize = 100;
        break;
      }
      default: {
        asteroidSize = 100;
      }
    }
    this.asteroidSize = asteroidSize;
  }

  setStartingHealthPoints(asteroidKind) {
    let startingHealthPoints;
    switch (asteroidKind) {
      case 'bit': {
        startingHealthPoints = 1;
        break;
      }
      case 'fragment': {
        startingHealthPoints = 2;
        break;
      }
      case 'whole': {
        startingHealthPoints = 5;
        break;
      }
      default: {
        startingHealthPoints = 5;
      }
    }
    this.startingHealthPoints = startingHealthPoints;
  }
}

const asteroids = [
  new Asteroid('asteroid-whole-1', { x: 900, y: 200 }),
  new Asteroid('asteroid-whole-2', { x: 100, y: 400 }),
  new Asteroid('asteroid-whole-3', { x: 600, y: 100 }),
  new Asteroid('asteroid-fragment-1', { x: 100, y: 800 }),
  new Asteroid('asteroid-fragment-2', { x: 200, y: 800 }),
  new Asteroid('asteroid-bit-1', { x: 600, y: 700 }),
  new Asteroid('asteroid-bit-2', { x: 700, y: 700 }),
];

export default asteroids;
