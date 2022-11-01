import Animation from './Animation';
import { animationsTypes } from '@/types';

class PutCowDownAnimation extends Animation {
  #cowHelper;

  constructor(dispatch = null, cowHelper) {
    super(animationsTypes.PUT_COW_DOWN_ANIMATION, dispatch);
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
    if (this.isDown()) {
      this.stopAnimation();
      return;
    }
    this.putCowDown();
    this.requestAnimationID = requestAnimationFrame(this.step);
  }

  isDown() {
    if (this.#cowHelper.getCowImageShiftY() === 0) return true;
    return false;
  }

  putCowDown() {
    this.#cowHelper.shiftCowImageVertically(-1);
  }
}

export default PutCowDownAnimation;
