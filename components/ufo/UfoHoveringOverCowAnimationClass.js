class UfoHoveringOverCowAnimationClass {
  #requestAnimationID;
  #cow;
  #ufo;
  #speed = 10;

  startHovering = (ufo, cow) => {
    this.#ufo = ufo;
    this.#cow = cow;
    this.#requestAnimationID = requestAnimationFrame(this.step);
  };

  stopHovering = () => {
    cancelAnimationFrame(this.#requestAnimationID);
  };

  step = () => {
    let move = this.getMove();
    this.#ufo.style.left = `${this.#ufo.offsetLeft + move.x}px`;
    this.#ufo.style.top = `${this.#ufo.offsetTop + move.y}px`;
    this.#requestAnimationID = requestAnimationFrame(this.step);
  };

  getMove = () => {
    const x = (element) => parseFloat(element.getBoundingClientRect().left);
    const y = (element) => parseFloat(element.getBoundingClientRect().top);
    let deltaX = Math.round(x(this.#cow) - x(this.#ufo));
    let deltaY = Math.round(y(this.#cow) - y(this.#ufo));

    return {
      x: Math.abs(deltaX) <= this.#speed ? 0 : deltaX < 0 ? -this.#speed : this.#speed,
      y: Math.abs(deltaY) <= this.#speed ? 0 : deltaY < 0 ? -this.#speed : this.#speed,
    };
  };
}

export default UfoHoveringOverCowAnimationClass;
