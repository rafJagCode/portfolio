import Animation from 'Animation';
import { animationsTypes } from '@/configuration/types_conf';
import changeElementStyle from '@/utils/element_functions/changeElementStyle';
import getTranslateY from '@/utils/element_functions/getTranslateY';

class PutCowDownAnimation extends Animation {
  cow = null;

  constructor(cow, dispatch = null) {
    super(animationsTypes.PUT_COW_DOWN_ANIMATION, dispatch);
    this.cow = document.getElementById(`button_${cow}`);
    return this;
  }

  start() {
    return requestAnimationFrame(this.step);
  }

  stop() {
    this.resolve();
  }

  reset() {
    this.requestAnimationID = null;
    this.cow = null;
  }

  step() {
    if (this.isDown()) return this.stopAnimation();
    this.putCowDown();
    this.requestAnimationID = requestAnimationFrame(this.step);
  }

  isDown() {
    if (getTranslateY(this.cow) >= 0) return true;
    return false;
  }

  putCowDown() {
    changeElementStyle(this.cow, 'translateY', getTranslateY(this.cow) + 2);
  }
}

export default PutCowDownAnimation;
