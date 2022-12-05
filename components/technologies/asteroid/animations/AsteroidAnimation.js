class AsteroidAnimation {
  #asteroidData;
  #speed;
  #position;
  #setPosition;
  #angle;
  #requestAnimationID;

  constructor(asteroidData, startingSpeed, position, setPosition) {
    this.#asteroidData = asteroidData;
    this.#speed = startingSpeed;
    this.#position = position;
    this.#setPosition = setPosition;
    this.#angle = Math.random() * (2 * Math.PI);
    this.step = this.step.bind(this);
  }

  start() {
    if (this.#requestAnimationID) return;
    this.#requestAnimationID = requestAnimationFrame(this.step);
  }

  stop() {
    if (!this.#requestAnimationID) return;
    cancelAnimationFrame(this.#requestAnimationID);
  }

  step() {
    if (this.isVerticalScreenLimit()) this.bounceVertical();
    if (this.isHoriziontalScreenLimit()) this.bounceHorizontal();
    this.moveAsteroid();
    this.#requestAnimationID = requestAnimationFrame(this.step);
  }

  moveAsteroid() {
    const moveX = this.#speed * Math.cos(this.#angle);
    const moveY = this.#speed * Math.sin(this.#angle);
    const newPosition = { x: this.#position.x + moveX, y: this.#position.y + moveY };
    this.#position = newPosition;
    this.#setPosition(newPosition);
  }

  isVerticalScreenLimit() {
    if (this.#position.y + this.#asteroidData.minY <= 0) return true;
    if (this.#position.y + this.#asteroidData.maxY >= window.innerHeight) return true;
    return false;
  }

  isHoriziontalScreenLimit() {
    if (this.#position.x + this.#asteroidData.minX <= 0) return true;
    if (this.#position.x + this.#asteroidData.maxX >= window.innerWidth) return true;
    return false;
  }

  bounceVertical() {
    this.#angle = 2 * Math.PI - this.#angle;
  }

  bounceHorizontal() {
    this.#angle = Math.PI - this.#angle;
  }
}

export default AsteroidAnimation;
