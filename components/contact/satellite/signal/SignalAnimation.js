import Animation from '@/animations/Animation';
import { animationsTypes } from '@/types';

class SignalAnimation extends Animation {
  scale = 1;
  scaleIncrement = 0.1;
  move = 0;
  moveIncrement = 4;
  id = null;
  prevTimestamp = null;
  animationDuration = 1000;

  constructor(id, dispatch = null) {
    super(animationsTypes.SIGNAL_ANIMATION, dispatch);
    this.id = id;
  }
  start() {
    this.prevTimestamp = performance.now();
    return requestAnimationFrame(this.step);
  }
  stopAnimation() {
    this.resolve();
  }
  reset() {}
  getCurrentDuration() {
    const now = performance.now();
    return now - this.prevTimestamp;
  }
  getSatteliteAntenaTipPosition() {
    const satellite = document.getElementById('satellite');
    const antenaTipX = satellite.offsetLeft + 0.08 * satellite.offsetWidth;
    const antenaTipY = satellite.offsetTop + 0.3 * satellite.offsetHeight;
    return { antenaTipX, antenaTipY };
  }
  step() {
    const satellite = document.getElementById('satellite');
    const signal = document.getElementById(`signal_${this.id}`);
    const { antenaTipX, antenaTipY } = this.getSatteliteAntenaTipPosition();
    signal.style.left = `${antenaTipX - 0.5 * signal.offsetWidth + this.move}px`;
    signal.style.top = `${antenaTipY - 0.5 * signal.offsetHeight + this.move}px`;
    signal.style.width = `${0.1 * satellite.offsetWidth}px`;
    signal.style.transform = `scale(${this.scale})`;
    if (this.getCurrentDuration() >= 100) signal.style.visibility = 'visible';
    this.move -= this.moveIncrement;
    this.scale += this.scaleIncrement;
    if (this.getCurrentDuration() >= this.animationDuration) return this.stopAnimation();
    this.requestAnimationID = requestAnimationFrame(this.step);
  }
}

export default SignalAnimation;
