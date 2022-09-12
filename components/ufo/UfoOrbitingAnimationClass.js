class UfoOrbitingAnimationClass {
  #requestAnimationID;
  #ufo;
  #earth;
  #stop;
  #speed;
  #baseSpeed;
  #destination;
  #direction;
  #depth;
  #resolve;

  constructor(ufo, earth) {
    this.#ufo = ufo;
    this.#earth = earth;
    this.reset();
  }

  step = () => {
    this.setDestination();
    this.setDepth();
    this.setSpeed();
    let deltaX = this.getDeltaX();
    let deltaY = this.getDeltaY();
    let move = this.getMove(deltaX, deltaY);

    if ((this.#direction === 'RIGHT' && deltaX <= this.#speed) || (this.#direction === 'LEFT' && deltaX >= -this.#speed)) this.changeDirection();
    this.changeStyles(move);
    this.#requestAnimationID = requestAnimationFrame(this.step);
    if (this.shouldStop(deltaX)) this.stop();
  };

  startOrbiting = () => {
    if (this.#requestAnimationID) return;
    this.#requestAnimationID = requestAnimationFrame(this.step);
  };

  stopOrbiting = () => {
    if (!this.#requestAnimationID) return new Promise(reject(new Error('There is nothing to stop')));
    this.#stop = true;
    this.#baseSpeed *= 4;
    return new Promise((resolve) => (this.#resolve = resolve));
  };

  reset = () => {
    this.#requestAnimationID = undefined;
    this.#stop = false;
    this.#baseSpeed = 3;
    this.#direction = 'RIGHT';
  };

  changeDirection = () => {
    this.#direction = this.#direction === 'RIGHT' ? 'LEFT' : 'RIGHT';
  };

  setDestination = () => {
    let x;
    let y;
    switch (this.#direction) {
      case 'RIGHT':
        x = this.#earth.offsetLeft + this.#earth.offsetWidth;
        y = this.#earth.offsetTop;
        break;
      case 'LEFT':
        x = this.#earth.offsetLeft;
        y = this.#earth.offsetTop + this.#earth.offsetHeight;
        break;
    }
    this.#destination = {
      x: x,
      y: y,
    };
  };

  getMove = (deltaX, deltaY) => {
    let derivative = deltaX === 0 ? 0 : deltaY / deltaX;
    let y = this.#direction === 'RIGHT' ? derivative * this.#speed : derivative * -this.#speed;
    return {
      x: deltaX >= 0 ? this.#speed : -this.#speed,
      y: y,
    };
  };

  changeStyles = (move) => {
    let zIndex = this.#direction === 'RIGHT' ? 2 : 0;
    let scale = this.getScale();
    this.#ufo.style.left = `${this.#ufo.offsetLeft + move.x}px`;
    this.#ufo.style.top = `${this.#ufo.offsetTop + move.y}px`;
    this.#ufo.style.zIndex = zIndex;
    this.#ufo.style.transform = `scale(${scale})`;
  };

  getDeltaX = () => {
    return this.#destination.x - this.#ufo.offsetLeft - this.#ufo.offsetWidth / 2;
  };

  getDeltaY = () => {
    return this.#destination.y - this.#ufo.offsetTop - this.#ufo.offsetHeight / 2;
  };

  setDepth = () => {
    let quarterOrbitLength = this.#earth.offsetWidth / 2;
    let distance = this.getDistanceFromEarthCenter();
    let currentQuarter = this.getCurrentOrbitQuarterIndex(distance);
    let depth;
    if (currentQuarter === 1) depth = distance;
    if (currentQuarter === 2) depth = 2 * quarterOrbitLength - distance;
    if (currentQuarter === 3) depth = 2 * quarterOrbitLength + distance;
    if (currentQuarter === 4) depth = -distance;
    this.#depth = depth / (2 * quarterOrbitLength);
  };

  getDistanceFromEarthCenter = () => {
    return this.#ufo.offsetLeft + this.#ufo.offsetWidth / 2 - (this.#earth.offsetLeft + this.#earth.offsetWidth / 2);
  };

  getCurrentOrbitQuarterIndex = (distance) => {
    if (distance >= 0 && this.#direction === 'RIGHT') return 1;
    if (distance >= 0 && this.#direction === 'LEFT') return 2;
    if (distance < 0 && this.#direction === 'LEFT') return 3;
    return 4;
  };

  getScale = () => {
    let sizeFactor = 0.4;
    return 1 - this.#depth * sizeFactor;
  };

  setSpeed = () => {
    let speedFactor = 0.8;
    this.#speed = this.#baseSpeed + this.#depth * speedFactor;
  };

  shouldStop = (deltaX) => {
    if (this.#stop && this.#direction === 'RIGHT' && deltaX > 0 && deltaX <= 2 * this.#speed) return true;
    return false;
  };

  stop = () => {
    cancelAnimationFrame(this.#requestAnimationID);
    this.reset();
    this.#resolve();
  };
}

export default UfoOrbitingAnimationClass;
