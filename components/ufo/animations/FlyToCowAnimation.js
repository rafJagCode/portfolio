import Animation from './Animation';

class FlyToCowAnimation extends Animation {
  #flyingHelper;
  #cowHelper;
  #destination;
  #speed;

  constructor(dispatch = null, flyingHelper, cowHelper) {
    super('FLY_TO_COW_ANIMATION', dispatch);
    this.#flyingHelper = flyingHelper;
    this.#cowHelper = cowHelper;
    this.reset();
  }

  start() {
    return requestAnimationFrame(this.step);
  }

  stop() {
    if (this.isDestinationReached()) this.resolve('FLY_FINISHED');
    else this.resolve('FLY_ABORTED');
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
    const [cowTopMiddleX, cowTopMiddleY] = this.#cowHelper.getCowTopMiddlePosition();
    this.#destination = [cowTopMiddleX, cowTopMiddleY / 2];
  }

  isDestinationReached() {
    return this.#flyingHelper.isDestinationReached(this.#destination);
  }
}

export default FlyToCowAnimation;
