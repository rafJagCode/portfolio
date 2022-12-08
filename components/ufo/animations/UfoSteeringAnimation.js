import Animation from './Animation';
import { animationsTypes } from '@/types';
import availableKeys from '@/configuration/available_keys';
import imagesCollisionData from '@/configuration/images_collision_data';

class UfoSteeringAnimation extends Animation {
  #flyingHelper;
  #keys = availableKeys.reduce((a, v) => ({ ...a, [v]: { pressed: false } }), {});
  #speed = 5;

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
    let move = { x: 0, y: 0 };
    if (this.#keys['w'].pressed) move.y += -this.#speed;
    if (this.#keys['a'].pressed) move.x += -this.#speed;
    if (this.#keys['s'].pressed) move.y += this.#speed;
    if (this.#keys['d'].pressed) move.x += this.#speed;
    if (move.x || move.y) {
      move = this.limitMoveToScreenBoundries(move);
      this.moveUfo(move.x, move.y);
    }
    this.requestAnimationID = requestAnimationFrame(this.step);
  }

  setKeys(keys) {
    this.#keys = keys;
  }

  moveUfo(x, y) {
    this.#flyingHelper.moveUfo(x, y);
  }

  limitMoveToScreenBoundries(move) {
    const { minXLimit, maxXLimit, minYLimit, maxYLimit } = this.getMoveLimits();
    move.x = move.x >= minXLimit ? move.x : minXLimit;
    move.x = move.x <= maxXLimit ? move.x : maxXLimit;
    move.y = move.y >= minYLimit ? move.y : minYLimit;
    move.y = move.y <= maxYLimit ? move.y : maxYLimit;
    return move;
  }

  getMoveLimits() {
    const ufoPosition = this.#flyingHelper.getUfoHelper().getUfoPosition();
    const { minX, maxX, minY, maxY } = imagesCollisionData.ufo;
    const minXLimit = -(ufoPosition.x + minX);
    const maxXLimit = window.innerWidth - (ufoPosition.x + maxX);
    const minYLimit = -(ufoPosition.y + minY);
    const maxYLimit = window.innerHeight - (ufoPosition.y + maxY);
    return { minXLimit, maxXLimit, minYLimit, maxYLimit };
  }
}

export default UfoSteeringAnimation;
