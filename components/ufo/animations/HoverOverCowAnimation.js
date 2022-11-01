import Animation from './Animation';
import { animationsTypes } from '@/types';

class HoverOverCow extends Animation {
  #flyingHelper;
  #cowHelper;
  #destination;

  constructor(dispatch = null, flyingHelper, cowHelper) {
    super(animationsTypes.HOVER_OVER_COW_ANIMATION, dispatch);
    this.#flyingHelper = flyingHelper;
    this.#cowHelper = cowHelper;
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
  }

  step() {
    this.setDestination();
    if (this.isDestinationReached()) {
      this.requestAnimationID = requestAnimationFrame(this.step);
      return;
    } else {
      this.#flyingHelper.teleportUfoToDestination(this.#destination);
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

export default HoverOverCow;
