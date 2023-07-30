import Animation from '@/animations/Animation';
import { animationsTypes } from '@/types';
import changeElementStyle from '@/utils/changeElementStyle';
import getElementCenterCoordinates from '@/utils/getElementCenterCoordinates';

class HoverOverCow extends Animation {
  cow = null;
  constructor(dispatch = null) {
    super(animationsTypes.HOVER_OVER_COW_ANIMATION, dispatch);
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
    const ufo = document.getElementById('ufo');
    const ufoPlaceholder = document.getElementById(`ufo_placeholder_${this.cow}`);
    const ufoPlaceholderCenterCoordinates = getElementCenterCoordinates(ufoPlaceholder);
    changeElementStyle(ufo, 'centerPosition', ufoPlaceholderCenterCoordinates);
    this.requestAnimationID = requestAnimationFrame(this.step);
  }

  setCow(cow) {
    this.cow = cow;
  }
}

export default HoverOverCow;
