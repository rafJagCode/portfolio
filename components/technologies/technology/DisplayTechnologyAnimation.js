import { animationsTypes } from '@/types';
import Animation from '@/components/ufo/animations/Animation';

class DisplayTechnologyAnimation extends Animation {
  #destination;
  #element;
  #speed;

  constructor(element, destination, dispatch = null) {
    super(animationsTypes.DISPLAY_TECHNOLOGY_ANIMATION, dispatch);
    this.#destination = destination;
    this.#element = element.current;
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
    this.#speed = 15;
  }

  step() {
    if (this.isDestinationReached()) this.stopAnimation();
    else {
      this.makeStep();
      this.requestAnimationID = requestAnimationFrame(this.step);
    }
  }

  isDestinationReached() {
    const currPos = this.getCurrentPosition();
    if (Math.abs(this.#destination.x - currPos.x) >= this.#speed) return false;
    if (Math.abs(this.#destination.y - currPos.y) >= this.#speed) return false;
    return true;
  }

  getCurrentPosition() {
    const [posX, posY] = [this.#element.offsetLeft, this.#element.offsetTop].map(Number);
    return { x: posX, y: posY };
  }

  makeStep() {
    const currPos = this.getCurrentPosition();
    const angle = 2 * Math.PI - Math.atan2(this.#destination.y - currPos.y, this.#destination.x - currPos.x);
    const moveX = this.#speed * Math.cos(angle);
    const moveY = this.#speed * -Math.sin(angle);
    this.#element.style.left = `${currPos.x + moveX}px`;
    this.#element.style.top = `${currPos.y + moveY}px`;
  }
}

export default DisplayTechnologyAnimation;
