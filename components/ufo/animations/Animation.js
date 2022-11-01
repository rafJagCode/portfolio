class Animation {
  #name;
  #promise;
  reject;
  requestAnimationID;
  resolve;

  constructor(name = null, dispatch = null) {
    if (!name) throw new Error('Animation must have name');
    this.#name = name;
    this.step = this.step.bind(this);
    if (dispatch) dispatch({ type: 'ANIMATIONS', animationName: this.#name, animation: this });
  }

  startAnimation() {
    if (this.requestAnimationID) return;
    this.#promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
    this.requestAnimationID = this.start();
    return this.#promise;
  }

  async stopAnimation() {
    if (!this.requestAnimationID) return;
    this.stop();
    await this.#promise;
    cancelAnimationFrame(this.requestAnimationID);
    this.reset();
  }

  start() {
    throw new Error('You have to implement the method start!');
  }

  stop() {
    throw new Error('You have to implement the method stop!');
  }

  reset() {
    throw new Error('You have to implement the method reset!');
  }
}

export default Animation;
