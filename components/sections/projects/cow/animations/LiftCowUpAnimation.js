import Animation from 'Animation';
import { animationsTypes } from '@/configuration/types_conf';
import changeElementStyle from '@/utils/element_functions/changeElementStyle';
import getTranslateY from '@/utils/element_functions/getTranslateY';

class LiftCowUpAnimation extends Animation {
  cow = null;

  constructor(dispatch = null) {
    super(animationsTypes.LIFT_COW_UP_ANIMATION, dispatch);
  }

  start() {
    return requestAnimationFrame(this.step);
  }

  stop() {
    if (this.isLifted()) this.resolve('LIFTING_FINISHED');
    else this.resolve('LIFTING_ABORTED');
  }

  reset() {
    this.requestAnimationID = null;
    this.cow = null;
  }

  step() {
    if (this.isLifted()) return this.stopAnimation();
    this.lift();
    this.requestAnimationID = requestAnimationFrame(this.step);
  }

  setCow(cow) {
    this.cow = document.getElementById(`button_${cow}`);
  }

  isLifted() {
    if (getTranslateY(this.cow) <= -40) return true;
    return false;
  }

  lift() {
    changeElementStyle(this.cow, 'translateY', getTranslateY(this.cow) - 2);
  }
}

export default LiftCowUpAnimation;
