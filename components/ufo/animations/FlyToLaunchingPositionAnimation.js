import getElementCenterCoordinates from '@/utils/element_functions/getElementCenterCoordinates';
import calculateDistanceBetweenTwoPoints from '@/utils/helper_functions/getDistanceBetweenTwoPoints';
import moveElementTowardsCoordinates from '@/utils/element_functions/moveElementTowardsCoordinates';
import getElementTopRightCornerCoordinatesRelativeToPage from '@/utils/element_functions/getElementTopRightCornerCoordinatesRelativeToPage';
import Animation from 'Animation';
import { animationsTypes } from '@/configuration/types_conf';

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
