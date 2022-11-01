import Animation from './Animation';

class FlyToLaunchingPosition extends Animation {
  #flyingHelper;
  #earthHelper;
  #destination;
  #speed;

  constructor(dispatch = null, flyingHelper, earthHelper) {
    super('FLY_TO_LAUNCHING_POSITION_ANIMATION', dispatch);
    this.#flyingHelper = flyingHelper;
    this.#earthHelper = earthHelper;
    this.reset();
  }

  start() {
    return requestAnimationFrame(this.step);
  }

  stop() {
    this.resolve();
  }

  reset() {
    this.requestAnimationID = null;
    this.#destination = null;
    this.#speed = 10;
  }

  step() {
    this.setDestination();
    if (this.isDestinationReached()) this.stopAnimation();
    else {
      this.#flyingHelper.makeUfoStep(this.#destination, this.#speed);
      this.requestAnimationID = requestAnimationFrame(this.step);
    }
  }

  setDestination() {
    const [launchingPosX, launchingPosY] = this.#earthHelper.getEarthTopRightCornerPosition();
    this.#destination = [launchingPosX, launchingPosY];
  }

  isDestinationReached() {
    return this.#flyingHelper.isDestinationReached(this.#destination);
  }
}

export default FlyToLaunchingPosition;
