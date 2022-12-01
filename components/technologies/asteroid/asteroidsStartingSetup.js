import uuid from 'react-uuid';

class Asteroid {
  id;
  imageName;
  startingPosition;

  constructor(imageName, startingPosition) {
    this.id = uuid();
    this.imageName = imageName;
    this.startingPosition = startingPosition;
  }
}

const asteroids = [new Asteroid('asteroid1', { x: 900, y: 200 })];

export default asteroids;
