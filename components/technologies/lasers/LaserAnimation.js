class LaserAnimation {
  #requestAnimationID;
  #dispatch;
  #promise;
  #resolve;
  #laser;
  #speed = 10;
  #speedX;
  #speedY;
  #angle;
  #position;
  #laserTipPosition;
  #asteroidsData;

  constructor(laserRef, startingPosition, setPosition, crosshairAngle, dispatch) {
    this.reset();
    this.#laser = laserRef.current;
    this.#position = startingPosition;
    this.#angle = crosshairAngle;
    this.#speedX = this.#speed * Math.cos(crosshairAngle);
    this.#speedY = this.#speed * -Math.sin(crosshairAngle);
    this.setLaserTipPosition();
    this.#dispatch = dispatch;
    this.step = this.step.bind(this);
    this.moveLaser = this.moveLaser.bind(this, setPosition);
  }

  reset() {
    this.#requestAnimationID = null;
  }

  step() {
    if (this.isLaserBeyondScreen()) return this.stop();

    const asteroid = this.checkAsteroidsCollisionZones();
    if (asteroid) {
      const hitpoint = this.checkCollisionPoints(asteroid);
      if (hitpoint) {
        this.#dispatch({ type: 'ADD_ASTEROID_HIT', asteroidID: asteroid.asteroidID, hitpoint: hitpoint });
        return this.stop();
      }
    }

    this.moveLaser();
    this.setLaserTipPosition();
    this.#requestAnimationID = requestAnimationFrame(this.step);
  }

  start() {
    if (this.#requestAnimationID) return;
    this.#promise = new Promise((resolve) => {
      this.#resolve = resolve;
    });
    this.#laser.style.transform = `rotate(${-this.#angle - Math.PI}rad)`;
    this.#requestAnimationID = requestAnimationFrame(this.step);
    return this.#promise;
  }

  stop() {
    if (!this.#requestAnimationID) return;
    cancelAnimationFrame(this.#requestAnimationID);
    this.#resolve();
    this.reset();
  }

  moveLaser(setPosition) {
    this.#position = { x: this.#position.x + this.#speedX, y: this.#position.y + this.#speedY };
    setPosition(this.#position);
  }

  setLaserTipPosition() {
    const posX = this.#laser.offsetWidth * Math.cos(this.#angle) + this.#laser.offsetWidth + this.#position.x;
    const posY = this.#laser.offsetWidth * -Math.sin(this.#angle) + this.#position.y;
    this.#laserTipPosition = {
      x: posX,
      y: posY,
    };
  }

  isLaserBeyondScreen() {
    if (this.#laserTipPosition.x <= -this.#laser.offsetWidth) return true;
    if (this.#laserTipPosition.x >= window.innerWidth + this.#laser.offsetWidth) return true;
    if (this.#laserTipPosition.y <= -this.#laser.offsetWidth) return true;
    if (this.#laserTipPosition.y >= window.innerHeight + this.#laser.offsetWidth) return true;
    return false;
  }

  getLaserTipPositionRelativeToAsteroid(posX, posY) {
    const relativeLaserTipPosition = { x: this.#laserTipPosition.x - posX, y: this.#laserTipPosition.y - posY };
    return relativeLaserTipPosition;
  }

  checkAsteroidsCollisionZones() {
    const checkResult = Object.entries(this.#asteroidsData).find(([id, data]) => {
      const relativeLaserTipPosition = this.getLaserTipPositionRelativeToAsteroid(data.posX, data.posY);
      if (relativeLaserTipPosition.x < data.minX) return false;
      if (relativeLaserTipPosition.x > data.maxX) return false;
      if (relativeLaserTipPosition.y < data.minY) return false;
      if (relativeLaserTipPosition.y > data.maxY) return false;
      return true;
    });
    if (!checkResult) return null;
    return { asteroidID: checkResult[0], data: checkResult[1] };
  }

  // checkCollisionPoints searches for collision point in hitbox area with angle between point and laser tip closest to that of laser angle
  checkCollisionPoints(asteroid) {
    const hitbox = 10;
    const relativeLaserTipPosition = this.getLaserTipPositionRelativeToAsteroid(asteroid.data.posX, asteroid.data.posY);
    const collisionPoints = this.getCollisionPointsInHitboxRange(asteroid, relativeLaserTipPosition, hitbox);
    if (!collisionPoints.length) return null;

    let closestAngleDiff;
    let hitpoint;
    collisionPoints.forEach((point) => {
      const angle = this.getAngleBetweenPoints(relativeLaserTipPosition, { x: point[0], y: point[1] });
      const angleDiff = Math.abs(this.#angle - angle);

      if (!closestAngleDiff) {
        closestAngleDiff = angleDiff;
        hitpoint = point;
        return;
      }
      if (angleDiff < closestAngleDiff) {
        closestAngleDiff = angleDiff;
        hitpoint = point;
      }
    });

    return { x: hitpoint[0] + asteroid.data.posX, y: hitpoint[1] + asteroid.data.posY };
  }

  setAsteroidsData(asteroidsData) {
    this.#asteroidsData = asteroidsData;
  }

  getAngleBetweenPoints(point1, point2) {
    let angle = Math.PI - Math.atan2(point1.y - point2.x, point1.x - point2.x);
    if (angle < 0) angle += 2 * Math.PI;
    return angle;
  }

  getCollisionPointsInHitboxRange(asteroid, relativeLaserTipPosition, hitbox) {
    const collisionPoints = asteroid.data.collisionPoints.filter((point) => {
      if (Math.abs(point[0] - relativeLaserTipPosition.x) > hitbox) return false;
      if (Math.abs(point[1] - relativeLaserTipPosition.y) > hitbox) return false;
      return true;
    });
    return collisionPoints;
  }
}

export default LaserAnimation;
