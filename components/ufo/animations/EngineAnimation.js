import Animation from './Animation';

class EngineAnimation extends Animation {
  #engineHelper;
  #startTime;

  constructor(dispatch = null, engineHelper) {
    super('ENGINE_ANIMATION', dispatch);
    this.#engineHelper = engineHelper;
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
    this.#startTime = null;
    this.#engineHelper.changeOpacity(0);
    this.#engineHelper.changeScale(1);
  }

  step(timestamp) {
    if (!this.#startTime) this.#startTime = timestamp;
    const duration = timestamp - this.#startTime;
    const enginePower = this.timeFn(duration);
    this.handleEngineChanges(enginePower);
    this.requestAnimationID = requestAnimationFrame(this.step);
  }

  timeFn(t) {
    let v;
    if (t <= 200) v = Math.pow(t, 2) / 40000;
    v = 1 - Math.abs(Math.sin(t / 200 - 1)) / 3;
    return v;
  }

  handleEngineChanges(enginePower) {
    this.#engineHelper.changeOpacity(enginePower);
    this.#engineHelper.changeScale(enginePower);
  }
}

export default EngineAnimation;
