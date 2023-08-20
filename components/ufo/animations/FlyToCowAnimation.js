import Animation from 'Animation';
import { animationsTypes } from '@/configuration/types_conf';
import getDistanceBetweenTwoPoints from '@/utils/helper_functions/getDistanceBetweenTwoPoints';
import getElementCenterCoordinates from '@/utils/element_functions/getElementCenterCoordinates';
import moveElementTowardsCoordinates from '@/utils/element_functions/moveElementTowardsCoordinates';

class FlyToCowAnimation extends Animation {
  cow = null;
  speed = 15;
  destination = null;

  constructor(dispatch = null) {
    super(animationsTypes.FLY_TO_COW_ANIMATION, dispatch);
  }

  start() {
    return requestAnimationFrame(this.step);
  }

  stop() {
    if (this.isDestinationReached()) this.resolve('FLY_FINISHED');
    else this.resolve('FLY_ABORTED');
  }

  reset() {
    this.cow = null;
    this.requestAnimationID = null;
    this.speed = 15;
    this.destination = null;
  }

  step() {
    this.setDestination();
    if (this.isDestinationReached()) return this.stopAnimation();
    moveElementTowardsCoordinates(document.getElementById('ufo'), this.destination, this.speed);
    this.requestAnimationID = requestAnimationFrame(this.step);
  }

  setCow(cow) {
    this.cow = cow;
  }
  setDestination() {
    const ufoPlaceholder = document.getElementById(`ufo_placeholder_${this.cow}`);
    this.destination = getElementCenterCoordinates(ufoPlaceholder);
  }

  isDestinationReached() {
    const precision = 1;
    const ufo = document.getElementById('ufo');
    const ufoCenter = getElementCenterCoordinates(ufo);
    if (getDistanceBetweenTwoPoints(ufoCenter, this.destination) < precision) return true;
    return false;
  }
}

export default FlyToCowAnimation;
