class LaserAnimation {
  #requestAnimationID;
  #promise;
  #resolve;
  #laser;
  #speed = 10;
  #position;
  #asteroidsCollisionZones;
  #asteroidsCollisionPoints;

  constructor(laserRef, startingPosition, setPosition) {
    this.reset();
    this.#laser = laserRef.current;
    this.#position = startingPosition;
    this.step = this.step.bind(this);
    this.moveLaser = this.moveLaser.bind(this, setPosition);
  }

  reset() {
    this.#requestAnimationID = null;
  }

  step() {
    if (this.isLaserBeyondScreen()) return this.stop();
    const zoneID = this.checkAsteroidsCollisionZones();
    if (zoneID) {
      const point = this.checkAsteroidsCollisionPoints(zoneID);
      if (point) {
        console.log(point, this.#position);
        return this.stop();
      }
    }
    this.moveLaser();
    this.#requestAnimationID = requestAnimationFrame(this.step);
  }

  start() {
    if (this.#requestAnimationID) return;
    this.#promise = new Promise((resolve) => {
      this.#resolve = resolve;
    });
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
    this.#position = { x: this.#position.x - this.#speed, y: this.#position.y };
    setPosition(this.#position);
  }

  isLaserBeyondScreen() {
    if (this.#position.x + this.#laser.offsetWidth <= 100) return true;
    return false;
  }

  checkAsteroidsCollisionZones() {
    const detectedZone = Object.entries(this.#asteroidsCollisionZones).find(([id, zone]) => {
      if (this.#position.x < zone.leftTopCorner.x || this.#position.x > zone.rightBottomCorner.x) return false;
      if (this.#position.y < zone.leftTopCorner.y || this.#position.y > zone.rightBottomCorner.y) return false;
      return true;
    });
    if (!detectedZone) return null;
    const [zoneID] = detectedZone;
    return zoneID;
  }

  checkAsteroidsCollisionPoints(id) {
    const hitbox = 1;
    return this.#asteroidsCollisionPoints[id].find((point) => {
      if (Math.abs(this.#position.x - point.x) < this.#speed + hitbox && Math.abs(this.#position.y - point.y) < 1) return true;
      return false;
    });
  }

  setAsteroidsCollisionZones(asteroidsCollisionZones) {
    this.#asteroidsCollisionZones = asteroidsCollisionZones;
  }

  setAsteroidsCollisionPoints(asteroidsCollisionPoints) {
    this.#asteroidsCollisionPoints = asteroidsCollisionPoints;
  }
}

export default LaserAnimation;
