class Asteroid {
  id;
  imageName;
  startingPosition;

  constructor(imageName, startingPosition) {
    this.id = Date.now() * Math.floor(Math.random() * 1000);
    this.imageName = imageName;
    this.startingPosition = startingPosition;
  }
}

const asteroids = [new Asteroid('asteroid1', { x: 200, y: 270 }), new Asteroid('asteroid1', { x: 400, y: 400 }), new Asteroid('asteroid1', { x: 600, y: 600 })];

export default asteroids;
