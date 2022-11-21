class LaserAnimation {
  #requestAnimationID;
  #dispatch;
  #promise;
  #resolve;
  #laser;
  #speed = 10;
  #position;
  #laserTipPosition;
  #asteroidsCollisionZones;
  #asteroidsCollisionPoints;
  #angle;

  constructor(laserRef, startingPosition, setPosition, crosshairAngle, dispatch) {
    this.reset();
    this.#laser = laserRef.current;
    this.#position = startingPosition;
    this.setLaserTipPosition();
    this.#angle = -(Math.PI + crosshairAngle);
    this.#dispatch = dispatch;
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
        this.#dispatch({ type: 'ADD_ASTEROID_HIT', asteroidID: zoneID, hitpoint: point });
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
    this.#laser.style.transform = `rotate(${this.#angle}rad)`;
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
    this.#position = { x: this.#position.x - this.#speed * Math.cos(-this.#angle), y: this.#position.y + this.#speed * Math.sin(-this.#angle) };
    setPosition(this.#position);
  }

  setLaserTipPosition() {
    const posX = this.#laser.offsetWidth * Math.cos(Math.PI + this.#angle) + this.#laser.offsetWidth + this.#position.x;
    const posY = this.#laser.offsetWidth * Math.sin(Math.PI + this.#angle) + this.#position.y;
    this.#laserTipPosition = {
      x: posX,
      y: posY,
    };
  }

  isLaserBeyondScreen() {
    if (this.#laserTipPosition.x + this.#laser.offsetWidth <= 100) return true;
    return false;
  }

  checkAsteroidsCollisionZones() {
    const detectedZone = Object.entries(this.#asteroidsCollisionZones).find(([id, zone]) => {
      if (this.#laserTipPosition.x < zone.leftTopCorner.x || this.#laserTipPosition.x > zone.rightBottomCorner.x) return false;
      if (this.#laserTipPosition.y < zone.leftTopCorner.y || this.#laserTipPosition.y > zone.rightBottomCorner.y) return false;
      return true;
    });
    if (!detectedZone) return null;
    const [zoneID] = detectedZone;
    return zoneID;
  }

  checkAsteroidsCollisionPoints(id) {
    const hitbox = 1;
    return this.#asteroidsCollisionPoints[id].find((point) => {
      if (Math.abs(this.#laserTipPosition.x - point.x) < this.#speed + hitbox && Math.abs(this.#laserTipPosition.y - point.y) < 1) return true;
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
