import Animation from './Animation';

class OrbitingAnimation extends Animation {
  #baseSpeed;
  #destination = null;
  #direction;
  #howFarAwayUfoIs;
  #scale;
  #speed;
  #stop;
  #ufoHelper;
  #flyingHelper;
  #earthHelper;

  constructor(dispatch = null, ufoHelper, flyingHelper, earthHelper) {
    super('ORBITING_ANIMATION', dispatch);
    this.#ufoHelper = ufoHelper;
    this.#flyingHelper = flyingHelper;
    this.#earthHelper = earthHelper;
    this.reset();
  }

  start() {
    return requestAnimationFrame(this.step);
  }

  stop() {
    this.#stop = true;
    this.#baseSpeed *= 4;
  }

  reset() {
    this.requestAnimationID = null;
    this.#baseSpeed = 3;
    this.#direction = 'RIGHT';
    this.#scale = 1;
    this.#stop = false;
    this.#ufoHelper.changeUfoZIndex(2);
  }

  step() {
    this.setDestination();
    this.setHowFarAwayUfoIs();
    this.setScale();
    this.setSpeed();
    this.handleUfoChanges();
    this.#flyingHelper.makeUfoStep(this.#destination, this.#speed);
    if (this.isDestinationReached()) this.changeDirection();
    this.requestAnimationID = requestAnimationFrame(this.step);
    if (this.shouldStop()) this.goToLaunchingPosition();
  }

  setHowFarAwayUfoIs() {
    const [xEarthMiddlePos] = this.#earthHelper.getEarthMiddlePosition();
    const [xUfoMiddlePos] = this.#ufoHelper.getUfoMiddlePosition();
    const distance = xUfoMiddlePos - xEarthMiddlePos;
    const orbitHalf = this.#earthHelper.getHalfOrbitLength();
    let howFarAway;

    if (distance >= 0 && this.#direction === 'RIGHT') howFarAway = distance;
    else if (distance >= 0 && this.#direction === 'LEFT') howFarAway = orbitHalf - distance;
    else if (distance < 0 && this.#direction === 'LEFT') howFarAway = orbitHalf + distance;
    else howFarAway = -distance;

    this.#howFarAwayUfoIs = howFarAway / orbitHalf;
  }

  setDestination() {
    if (this.#direction === 'RIGHT') this.#destination = this.#earthHelper.getEarthTopRightCornerPosition();
    else this.#destination = this.#earthHelper.getEarthBottomLeftCornerPosition();
  }

  setSpeed() {
    const speedFactor = 0.8;
    this.#speed = this.#baseSpeed + this.#howFarAwayUfoIs * speedFactor;
  }

  setScale() {
    const scaleFactor = 0.4;
    this.#scale = 1.2 - this.#howFarAwayUfoIs * scaleFactor;
  }

  changeDirection() {
    this.#direction = this.#direction === 'RIGHT' ? 'LEFT' : 'RIGHT';
  }

  getUfoZIndex() {
    return this.#direction === 'RIGHT' ? 2 : 0;
  }

  isDestinationReached() {
    return this.#flyingHelper.isDestinationReached(this.#destination);
  }

  handleUfoChanges() {
    this.#ufoHelper.changeUfoZIndex(this.getUfoZIndex());
    this.#ufoHelper.changeUfoScale(this.#scale);
  }

  shouldStop() {
    if (this.#stop && this.#direction === 'LEFT' && this.isDestinationReached()) return true;
    return false;
  }

  goToLaunchingPosition() {
    this.#ufoHelper.changeUfoScale(1);
    this.resolve();
  }
}

export default OrbitingAnimation;
