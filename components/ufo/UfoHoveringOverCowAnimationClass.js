class UfoHoveringOverCowAnimationClass {
  #requestAnimationID;
  #cow;
  #ufo;
  #beam;
  #speed = 10;

  startHovering = (ufo, cow, beam) => {
    this.#ufo = ufo;
    this.#cow = cow;
    this.#beam = beam;
    this.#requestAnimationID = requestAnimationFrame(this.step);
  };

  stopHovering = () => {
    cancelAnimationFrame(this.#requestAnimationID);
  };

  step = () => {
    let deltaX = this.getDeltaX();
    let deltaY = this.getDeltaY();
    let move = this.getMove(deltaX, deltaY);
    if (this.isUfoOverCow(deltaX)) this.turnBeamOn();
    else this.turnBeamOf();
    this.#ufo.style.left = `${this.#ufo.offsetLeft + move.x}px`;
    this.#ufo.style.top = `${this.#ufo.offsetTop + move.y}px`;
    this.#requestAnimationID = requestAnimationFrame(this.step);
  };

  getMove = (deltaX, deltaY) => {
    return {
      x: Math.abs(deltaX) <= this.#speed ? 0 : deltaX < 0 ? -this.#speed : this.#speed,
      y: Math.abs(deltaY) <= this.#speed ? 0 : deltaY < 0 ? -this.#speed : this.#speed,
    };
  };

  getDeltaX = () => {
    const x = (element) => parseFloat(element.getBoundingClientRect().left);
    return Math.round(x(this.#cow) + this.#cow.offsetWidth / 2 - this.#ufo.offsetWidth / 2 - x(this.#ufo));
  };

  getDeltaY = () => {
    const y = (element) => parseFloat(element.getBoundingClientRect().top);
    return Math.round(y(this.#cow) / 2 - this.#ufo.offsetWidth / 2 - y(this.#ufo));
  };

  isUfoOverCow = (deltaX) => {
    if (Math.abs(deltaX) <= this.#speed) return true;
    return false;
  };

  turnBeamOn = () => {
    this.#beam.style.width = `${this.#cow.offsetWidth}px`;
    this.#beam.style.height = `${parseFloat(this.#cow.getBoundingClientRect().bottom) - parseFloat(this.#ufo.getBoundingClientRect().bottom) + 0.4 * this.#ufo.offsetHeight}px`;
    if (this.#beam.style.opacity >= 1) return;
    this.#beam.style.opacity = `${parseFloat(this.#beam.style.opacity) + 0.1}`;
  };

  turnBeamOf = () => {
    if (this.#beam.opacity <= 0) return;
    this.#beam.style.opacity = `${parseFloat(this.#beam.style.opacity) - 0.1}`;
  };
}

export default UfoHoveringOverCowAnimationClass;
