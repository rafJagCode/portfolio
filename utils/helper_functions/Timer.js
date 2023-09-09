class Timer {
  constructor(callback, delay) {
    this.callback = callback;
    this.remainingTime = delay;
    this.startTime;
    this.timerId;
  }

  pause() {
    clearTimeout(this.timerId);
    this.remainingTime -= Date.now() - this.startTime;
  }

  resume() {
    this.startTime = Date.now();
    clearTimeout(this.timerId);
    this.timerId = setTimeout(this.callback, this.remainingTime);
  }

  clear() {
    clearTimeout(this.timerId);
  }

  start() {
    this.timerId = setTimeout(this.callback, this.remainingTime);
    this.startTime = Date.now();
  }
}

export default Timer;
