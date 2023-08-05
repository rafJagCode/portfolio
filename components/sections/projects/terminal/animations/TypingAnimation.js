class TypingAnimation {
  #requestAnimationID;
  #startTime;
  #duration;
  #textToType;
  #typed;
  #resolve;
  #typingSpeed = 0.02;

  constructor() {
    this.reset();
    return this;
  }

  type(setTyped) {
    if (!!this.#requestAnimationID) return;
    this.step = this.step.bind(this, setTyped);
    return new Promise((resolve) => {
      this.#resolve = resolve;
      requestAnimationFrame(this.step);
    });
  }

  stop() {
    if (!this.#requestAnimationID) return;
    cancelAnimationFrame(this.#requestAnimationID);
    setTimeout(() => {
      if (!this.#resolve) return;
      this.#resolve();
      this.reset();
    }, 300);
  }

  reset() {
    this.#requestAnimationID = null;
    this.#startTime = null;
    this.#duration = null;
    this.#textToType = '';
    this.#typed = '';
    this.#resolve = null;
  }

  step(setTyped) {
    this.setStartTime();
    this.setDuration();
    if (this.#typed === this.#textToType) {
      this.stop();
      return;
    }
    this.typeCharacter(setTyped);
    this.#requestAnimationID = requestAnimationFrame(this.step);
  }

  setStartTime() {
    if (!!this.#startTime) return;
    this.#startTime = performance.now();
  }

  setDuration() {
    this.#duration = performance.now() - this.#startTime;
  }

  typeCharacter(setTyped) {
    const expectedTypedLength = parseInt(this.#duration * this.#typingSpeed);
    if (this.#typed.length >= expectedTypedLength) return;
    this.#typed = this.#textToType.slice(0, expectedTypedLength);
    setTyped(this.#typed);
  }

  setTextToType(textToType) {
    this.#textToType = textToType;
    return this;
  }
}

export default TypingAnimation;
