import Animation from 'Animation';
import { animationsTypes } from '@/configuration/types_conf';
import availableKeys from '@/configuration/available_keys_conf';
import clamp from '@/utils/helper_functions/clamp';
import changeElementStyle from '@/utils/element_functions/changeElementStyle';
import getElementCenterCoordinates from '@/utils/element_functions/getElementCenterCoordinates';

class UfoSteeringAnimation extends Animation {
  keys = availableKeys.reduce((a, v) => ({ ...a, [v]: { pressed: false } }), {});
  speed = {
    x: 0,
    y: 0,
  };
  slowdown = 3 / 60;
  acceleration = 10 / 60;
  maxSpeed = 10;

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
    this.speed.x = 0;
    this.speed.y = 0;
    this.requestAnimationID = null;
  }

  step() {
    this.setSpeed();
    this.handleSlowdown();
    this.limitMoveToScreenBoundries();
    this.moveUfo();
    this.requestAnimationID = requestAnimationFrame(this.step);
  }

  setSpeed() {
    if (this.keys['w'].pressed) this.speed.y -= this.acceleration;
    if (this.keys['a'].pressed) this.speed.x -= this.acceleration;
    if (this.keys['s'].pressed) this.speed.y += this.acceleration;
    if (this.keys['d'].pressed) this.speed.x += this.acceleration;
    this.speed.x = clamp(this.speed.x, -this.maxSpeed, this.maxSpeed);
    this.speed.y = clamp(this.speed.y, -this.maxSpeed, this.maxSpeed);
  }

  handleSlowdown() {
    if (!this.keys['w'].pressed && this.speed.y < 0) this.speed.y += Math.min(this.slowdown, -this.speed.y);
    if (!this.keys['a'].pressed && this.speed.x < 0) this.speed.x += Math.min(this.slowdown, -this.speed.x);
    if (!this.keys['s'].pressed && this.speed.y > 0) this.speed.y += Math.max(-this.slowdown, -this.speed.y);
    if (!this.keys['d'].pressed && this.speed.x > 0) this.speed.x += Math.max(-this.slowdown, -this.speed.x);
  }

  limitMoveToScreenBoundries() {
    const { minX, maxX, minY, maxY } = this.getMoveLimits();
    this.speed.x = clamp(this.speed.x, minX, maxX) === this.speed.x ? this.speed.x : -this.speed.x;
    this.speed.y = clamp(this.speed.y, minY, maxY) === this.speed.y ? this.speed.y : -this.speed.y;
  }

  getMoveLimits() {
    const { left, right, top, bottom } = ufo.getBoundingClientRect();
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return {
      minX: -left,
      maxX: windowWidth - right,
      minY: -top,
      maxY: windowHeight - bottom,
    };
  }

  moveUfo() {
    const ufoCenter = getElementCenterCoordinates(this.ufo);
    changeElementStyle(this.ufo, 'centerPosition', { x: ufoCenter.x + this.speed.x, y: ufoCenter.y + this.speed.y });
  }

  setKeys(keys) {
    this.keys = keys;
  }
}

export default UfoSteeringAnimation;
