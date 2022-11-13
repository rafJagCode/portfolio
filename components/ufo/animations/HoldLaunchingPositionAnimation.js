import Animation from './Animation';
import { animationsTypes } from '@/types';

class HoldLaunchingPositionAnimation extends Animation {
  #flyingHelper;
  #earthHelper;
  #destination;

  constructor(dispatch = null, flyingHelper, earthHelper) {
    super(animationsTypes.HOLD_LAUNCHING_POSITION_ANIMATION, dispatch);
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
    const [launchingPosX, launchingPosY] = this.#earthHelper.getEarthTopRightCornerPosition();
    this.#destination = [launchingPosX, launchingPosY];
  }

  isDestinationReached() {
    return this.#flyingHelper.isDestinationReached(this.#destination);
  }
}

export default HoldLaunchingPositionAnimation;
