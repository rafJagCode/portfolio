class ExplosionAnimation {
  #framesAmount = 7;
  #currentFrame = 0;
  #frameSize;
  #explosion;
  #requestAnimationID = null;
  #resolve = null;
  #fps = 10;
  #prevFrameTimestamp = 0;

  constructor(explosionRef, size) {
    this.#explosion = explosionRef.current;
    this.#frameSize = size;
    this.step = this.step.bind(this);
  }

  start() {
    if (this.#requestAnimationID) return;
    this.#requestAnimationID = requestAnimationFrame(this.step);
    return new Promise((resolve) => {
      this.#resolve = resolve;
    });
  }

  stop() {
    if (!this.#requestAnimationID) return;
    cancelAnimationFrame(this.#requestAnimationID);
    this.#resolve();
  }

  step() {
    if (this.#currentFrame === this.#framesAmount) return this.stop();
    if (this.isItTimeForNextFrame()) {
      this.showNextFrame();
      this.#currentFrame += 1;
    }
    this.#requestAnimationID = requestAnimationFrame(this.step);
  }

  isItTimeForNextFrame() {
    const now = performance.now();
    if (now - this.#prevFrameTimestamp >= 1000 / this.#fps) {
      this.#prevFrameTimestamp = now;
      return true;
    }
    return false;
  }

  showNextFrame() {
    this.#explosion.style.backgroundPositionX = `-${this.#currentFrame * this.#frameSize}px`;
  }
}

export default ExplosionAnimation;
