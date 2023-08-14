import Animation from 'Animation';
import { animationsTypes } from '@/configuration/types_conf';
import getDistanceBetweenElementsCenters from '@/utils/element_functions/getDistanceBetweenElementsCenters';
import moveElementTowardsAnotherElement from '@/utils/element_functions/moveElementTowardsAnotherElement';

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
    moveElementTowardsAnotherElement(document.getElementById('ufo'), this.destination, this.speed);
    this.requestAnimationID = requestAnimationFrame(this.step);
  }

  setCow(cow) {
    this.cow = cow;
  }
  setDestination() {
    this.destination = document.getElementById(`ufo_placeholder_${this.cow}`);
  }

  isDestinationReached() {
    const precision = 1;
    const ufo = document.getElementById('ufo');
    if (getDistanceBetweenElementsCenters(ufo, this.destination) < precision) return true;
    return false;
  }
}

export default FlyToCowAnimation;
