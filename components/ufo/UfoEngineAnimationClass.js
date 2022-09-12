class UfoEngineAnimationClass {
  #enginesOn;
  #fireElement;
  #animationRequestID;
  #startTime;

  constructor(fireElement) {
    this.#enginesOn = false;
    this.#fireElement = fireElement;
  }

  turnOnEngines = () => {
    if (this.#enginesOn) return;
    this.#enginesOn = true;
    this.#animationRequestID = requestAnimationFrame(this.step);
  };

  turnOffEngines = () => {
    if (!this.#enginesOn) return;
    cancelAnimationFrame(this.#animationRequestID);
    this.resetAnimation();
  };

  step = (timestamp) => {
    if (!this.#startTime) this.#startTime = timestamp;
    let duration = timestamp - this.#startTime;
    let enginePower = this.timeFn(duration);
    this.applyStyleChanges(enginePower);
    this.#animationRequestID = requestAnimationFrame(this.step);
  };

  timeFn = (t) => {
    let v;
    if (t <= 200) v = Math.pow(t, 2) / 40000;
    v = 1 - Math.abs(Math.sin(t / 200 - 1)) / 3;
    return v;
  };

  resetAnimation = () => {
    this.#enginesOn = false;
    this.#startTime = undefined;
    this.#fireElement.style.opacity = 0;
    this.#fireElement.style.transform = 'scale(1)';
  };

  applyStyleChanges = (enginePower) => {
    this.#fireElement.style.opacity = enginePower;
    this.#fireElement.style.transform = `scale(${enginePower})`;
  };
}

export default UfoEngineAnimationClass;
