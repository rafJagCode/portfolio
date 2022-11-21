import Animation from './Animation';
import { animationsTypes } from '@/types';
import availableKeys from '@/configuration/availableKeys';

class UfoSteeringAnimation extends Animation {
  #flyingHelper;
  #keys = availableKeys.reduce((a, v) => ({ ...a, [v]: { pressed: false } }), {});
  #speed = 1;

  constructor(dispatch = null, flyingHelper) {
    super(animationsTypes.UFO_STEERING_ANIMATION, dispatch);
    this.#flyingHelper = flyingHelper;
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
  }

  step() {
    if (this.#keys['w'].pressed) this.moveUfo(0, -this.#speed);
    if (this.#keys['a'].pressed) this.moveUfo(-this.#speed, 0);
    if (this.#keys['s'].pressed) this.moveUfo(0, this.#speed);
    if (this.#keys['d'].pressed) this.moveUfo(this.#speed, 0);
    this.requestAnimationID = requestAnimationFrame(this.step);
  }

  setKeys(keys) {
    this.#keys = keys;
  }

  moveUfo(x, y) {
    this.#flyingHelper.moveUfo(x, y);
  }
}

export default UfoSteeringAnimation;
