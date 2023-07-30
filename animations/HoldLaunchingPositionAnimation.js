import Animation from '@/animations/Animation';
import { animationsTypes } from '@/types';
import changeElementStyle from '@/utils/changeElementStyle';
import getElementTopRightCornerCoordinatesRelativeToPage from '@/utils/getElementTopRightCornerCoordinatesRelativeToPage';

class HoldLaunchingPositionAnimation extends Animation {
  ufo = null;
  earth = null;

  constructor(dispatch = null, { ufoRef, earthRef }) {
    super(animationsTypes.HOLD_LAUNCHING_POSITION_ANIMATION, dispatch);
    this.ufo = ufoRef.current;
    this.earth = earthRef.current;
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
    const launchingPositionCenterCoordinates = getElementTopRightCornerCoordinatesRelativeToPage(this.earth);
    changeElementStyle(ufo, 'centerPosition', launchingPositionCenterCoordinates);
    this.requestAnimationID = requestAnimationFrame(this.step);
  }
}

export default HoldLaunchingPositionAnimation;
