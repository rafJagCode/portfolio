import getElementCenterCoordinates from '@/utils/getElementCenterCoordinates';
import calculateDistanceBetweenTwoPoints from '@/utils/calculateDistanceBetweenTwoPoints';
import moveElementTowardsCoordinates from '@/utils/moveElementTowardsCoordinates';
import getElementTopRightCornerCoordinatesRelativeToPage from '@/utils/getElementTopRightCornerCoordinatesRelativeToPage';
import Animation from '@/animations/Animation';
import { animationsTypes } from '@/types';

class FlyToLaunchingPosition extends Animation {
  earth = null;
  ufo = null;
  destination = null;
  speed = 15;

  constructor(dispatch = null, { earthRef, ufoRef }) {
    super(animationsTypes.FLY_TO_LAUNCHING_POSITION_ANIMATION, dispatch);
    this.earth = earthRef.current;
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
    this.destination = null;
  }

  step() {
    this.setDestination();
    if (this.isDestinationReached()) return this.stopAnimation();
    moveElementTowardsCoordinates(this.ufo, this.destination, this.speed);
    this.requestAnimationID = requestAnimationFrame(this.step);
  }

  setDestination() {
    this.destination = getElementTopRightCornerCoordinatesRelativeToPage(this.earth);
  }

  isDestinationReached() {
    const precision = 1;
    const ufoCenter = getElementCenterCoordinates(this.ufo);
    if (calculateDistanceBetweenTwoPoints(this.destination, ufoCenter) < precision) return true;
    return false;
  }
}

export default FlyToLaunchingPosition;
