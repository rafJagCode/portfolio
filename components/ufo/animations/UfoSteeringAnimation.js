import Animation from 'Animation';
import { animationsTypes } from '@/configuration/types_conf';
import availableKeys from '@/configuration/available_keys_conf';
import clamp from '@/utils/helper_functions/clamp';
import getElementCenterCoordinates from '@/utils/element_functions/getElementCenterCoordinates';
import changeElementStyle from '@/utils/element_functions/changeElementStyle';

class UfoSteeringAnimation extends Animation {
  keys = availableKeys.reduce((a, v) => ({ ...a, [v]: { pressed: false } }), {});
  speed = 5;
  move = null;

  constructor(dispatch = null, { ufoRef }) {
    super(animationsTypes.UFO_STEERING_ANIMATION, dispatch);
    this.ufo = ufoRef.current;
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
    this.checkMove();
    this.limitMoveToScreenBoundries();
    if (!this.move.x && !this.move.y) return (this.requestAnimationID = requestAnimationFrame(this.step));
    this.moveUfo();
    this.requestAnimationID = requestAnimationFrame(this.step);
  }

  checkMove() {
    const move = { x: 0, y: 0 };
    if (this.keys['w'].pressed) move.y += -this.speed;
    if (this.keys['a'].pressed) move.x += -this.speed;
    if (this.keys['s'].pressed) move.y += this.speed;
    if (this.keys['d'].pressed) move.x += this.speed;
    this.move = move;
  }

  limitMoveToScreenBoundries() {
    const { minX, maxX, minY, maxY } = this.getMoveLimits();
    this.move.x = Math.round(clamp(this.move.x, minX, maxX));
    this.move.y = Math.round(clamp(this.move.y, minY, maxY));
  }

  getMoveLimits() {
    const { left, right, top, bottom } = ufo.getBoundingClientRect();
    return {
      minX: -left,
      maxX: window.innerWidth - right,
      minY: -top,
      maxY: window.innerHeight - bottom,
    };
  }

  moveUfo() {
    const ufoCenter = getElementCenterCoordinates(this.ufo);
    changeElementStyle(this.ufo, 'centerPosition', { x: ufoCenter.x + this.move.x, y: ufoCenter.y + this.move.y });
  }

  setKeys(keys) {
    this.keys = keys;
  }
}

export default UfoSteeringAnimation;
