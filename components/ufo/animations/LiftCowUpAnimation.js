import Animation from './Animation';
import { animationsTypes } from '@/types';

class LiftCowUpAnimation extends Animation {
  #cowHelper;

  constructor(dispatch = null, cowHelper) {
    super(animationsTypes.LIFT_COW_UP_ANIMATION, dispatch);
    this.#cowHelper = cowHelper;
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
  }

  step() {
    if (this.isLifted()) {
      this.stopAnimation();
      return;
    }
    this.lift();
    this.requestAnimationID = requestAnimationFrame(this.step);
  }

  isLifted() {
    if (this.#cowHelper.getCowImageShiftY() === 40) return true;
    return false;
  }

  lift() {
    this.#cowHelper.shiftCowImageVertically(1);
  }
}

export default LiftCowUpAnimation;
