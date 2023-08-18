import Animation from 'Animation';
import { animationsTypes } from '@/configuration/types_conf';
import changeElementStyle from '@/utils/element_functions/changeElementStyle';
import getElementCenterCoordinates from '@/utils/element_functions/getElementCenterCoordinates';

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
    changeElementStyle(ufo, 'centerPosition', this.getPosition());
    this.requestAnimationID = requestAnimationFrame(this.step);
  }

  getPosition() {
    const ufoPlaceholder = document.getElementById(`ufo_placeholder_${this.cow}`);
    const { x, y, width, height } = ufoPlaceholder.getBoundingClientRect();
    return { x: x + width / 2, y: y + height / 2 };
  }

  setCow(cow) {
    this.cow = cow;
  }
}

export default HoverOverCow;
