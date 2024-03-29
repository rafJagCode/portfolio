import Animation from 'Animation';
import { animationsTypes } from '@/configuration/types_conf';
import changeElementStyle from '@/utils/element_functions/changeElementStyle';
import getElementCenterCoordinates from '@/utils/element_functions/getElementCenterCoordinates';
import getElementBottomLeftCornerCoordinates from '@/utils/element_functions/getElementBottomLeftCornerCoordinates';
import getElementTopRightCornerCoordinates from '@/utils/element_functions/getElementTopRightCornerCoordinates';
import calculateDistanceBetweenTwoPoints from '@/utils/helper_functions/getDistanceBetweenTwoPoints';
import moveElementTowardsCoordinates from '@/utils/element_functions/moveElementTowardsCoordinates';

class OrbitingAnimation extends Animation {
  finishAnimation = false;
  baseSpeed = 3;
  direction = 'RIGHT';
  destination = null;
  speed = null;
  distanceFactor = null;
  ufo = null;
  earth = null;

  constructor(dispatch = null, { ufoRef, earthRef }) {
    super(animationsTypes.ORBITING_ANIMATION, dispatch);
    this.ufo = ufoRef.current;
    this.earth = earthRef.current;
  }

  start() {
    return requestAnimationFrame(this.step);
  }

  stop() {
    this.finishAnimation = true;
    this.baseSpeed *= 4;
  }

  reset() {
    this.requestAnimationID = null;
    this.finishAnimation = false;
    this.baseSpeed = 3;
    this.direction = 'RIGHT';
    changeElementStyle(this.ufo, 'scale', 1);
  }

  step() {
    this.setDestination();
    if (this.isDestinationReached()) {
      this.changeDirection();
      this.setDestination();
    }
    this.calculateDistanceFactor();
    this.setSpeed();
    this.setScale();
    this.setZIndex();
    moveElementTowardsCoordinates(this.ufo, this.destination, this.speed, true);
    if (this.shouldStop()) return this.resolve();
    this.requestAnimationID = requestAnimationFrame(this.step);
  }

  setDestination() {
    if (this.direction === 'RIGHT') this.destination = getElementTopRightCornerCoordinates(this.earth);
    else this.destination = this.destination = getElementBottomLeftCornerCoordinates(this.earth);
  }

  isDestinationReached() {
    const precision = 1;
    const ufoCenter = getElementCenterCoordinates(this.ufo);
    if (calculateDistanceBetweenTwoPoints(this.destination, ufoCenter) < precision) return true;
    return false;
  }

  changeDirection() {
    if (this.direction === 'RIGHT') this.direction = 'LEFT';
    else this.direction = 'RIGHT';
  }

  calculateDistanceFactor() {
    const earthCenter = getElementCenterCoordinates(this.earth);
    const ufoCenter = getElementCenterCoordinates(this.ufo);
    const distance = ufoCenter.x - earthCenter.x;
    const orbitHalf = this.earth.offsetWidth / 2;
    let howFarAway;

    if (distance >= 0 && this.direction === 'RIGHT') howFarAway = distance;
    else if (distance >= 0 && this.direction === 'LEFT') howFarAway = 2 * orbitHalf - distance;
    else if (distance < 0 && this.direction === 'LEFT') howFarAway = 2 * orbitHalf + distance;
    else howFarAway = -distance;

    this.distanceFactor = howFarAway / orbitHalf;
  }

  setSpeed() {
    const speedFactor = 0.8;
    this.speed = this.baseSpeed + this.distanceFactor * speedFactor;
  }

  setScale() {
    const scaleFactor = 0.4;
    const scale = 1.4 - this.distanceFactor * scaleFactor;
    changeElementStyle(this.ufo, 'scale', scale);
  }

  setZIndex() {
    changeElementStyle(this.ufo, 'zIndex', this.direction === 'RIGHT' ? 2 : 0);
  }

  shouldStop() {
    if (this.finishAnimation && this.direction === 'RIGHT' && this.isDestinationReached()) return true;
    return false;
  }
}

export default OrbitingAnimation;
