import { animationsTypes } from '@/configuration/types';
import getElementCenterCoordinates from '@/utils/element_functions/getElementCenterCoordinates';
import moveElementTowardsAnotherElement from '@/utils/element_functions/moveElementTowardsAnotherElement';
import calculateDistanceBetweenTwoPoints from '@/utils/helper_functions/getDistanceBetweenTwoPoints';
import Animation from 'Animation';

class DisplayTechnologyAnimation extends Animation {
  destination;
  technology;
  speed;

  constructor(technologyRef, destination, dispatch = null) {
    super(animationsTypes.DISPLAY_TECHNOLOGY_ANIMATION, dispatch);
    this.technology = technologyRef.current;
    this.destination = destination;
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
    this.speed = 15;
  }

  step() {
    if (this.isDestinationReached()) return this.stopAnimation();
    moveElementTowardsAnotherElement(this.technology, this.destination, this.speed);
    this.requestAnimationID = requestAnimationFrame(this.step);
  }

  isDestinationReached() {
    const precision = 1;
    const technologyCenter = getElementCenterCoordinates(this.technology);
    const destinationCenter = getElementCenterCoordinates(this.destination);
    if (calculateDistanceBetweenTwoPoints(technologyCenter, destinationCenter) < precision) return true;
    return false;
  }
}

export default DisplayTechnologyAnimation;
