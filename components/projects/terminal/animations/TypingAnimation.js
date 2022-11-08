class TypingAnimation {
  #requestAnimationID = null;
  #startTime = null;
  #duration = null;
  #textToType = '';
  #typed = '';
  #resolve = null;

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
    cancelAnimationFrame(this.#requestAnimationID);
    this.#resolve();
    this.reset();
  }

  reset() {
    this.#requestAnimationID = null;
    this.#startTime = null;
    this.#duration = null;
    this.#textToType = '';
    this.#typed = '';
    this.#resolve = null;
  }

  step(setTyped, timestamp) {
    this.setStartTime(timestamp);
    this.setDuration(timestamp);
    if (this.#typed === this.#textToType) {
      this.stop();
      return;
    }
    this.typeCharacter(setTyped);
    this.#requestAnimationID = requestAnimationFrame(this.step);
  }

  setStartTime(timestamp) {
    if (!!this.#startTime) return;
    this.#startTime = timestamp;
  }

  setDuration(timestamp) {
    this.#duration = timestamp - this.#startTime;
  }

  typeCharacter(setTyped) {
    const expectedTypedLength = parseInt((this.#duration / 1000) * 5) + 1;
    if (this.#typed.length >= expectedTypedLength) return;
    this.#typed += this.#textToType.charAt(expectedTypedLength - 1);
    setTyped(this.#typed);
  }

  setTextToType(textToType) {
    this.#textToType = textToType;
    return this;
  }
}

export default TypingAnimation;
