class UfoHelper {
  #ufo;
  #position;
  #setPosition;

  constructor(ufoRef, position, setPosition) {
    this.#ufo = ufoRef.current;
    this.#position = position;
    this.#setPosition = setPosition;
  }

  getUfoPosition() {
    return this.#position;
  }

  getUfoMiddlePosition() {
    const xPos = this.#position.x + this.#ufo.offsetWidth / 2;
    const yPos = this.#position.y + this.#ufo.offsetHeight / 2;
    return [xPos, yPos];
  }

  getUfoMiddleBottomPosition() {
    const xPos = this.#position.x + this.#ufo.offsetWidth / 2;
    const yPos = this.#position.y + this.#ufo.offsetHeight;
    return [xPos, yPos];
  }

  getUfoHeight() {
    return this.#ufo.offsetHeight;
  }

  getUfoWidth() {
    return this.#ufo.offsetWidth;
  }

  changeUfoZIndex(zIndex) {
    this.#ufo.style.zIndex = zIndex;
  }

  changeUfoScale(scale) {
    this.#ufo.style.transform = `scale(${scale})`;
  }

  moveUfoHorizontally(xMove) {
    const newPosition = { ...this.#position, x: this.#position.x + xMove };
    this.#position = newPosition;
    this.#setPosition(newPosition);
  }

  moveUfoVertically(yMove) {
    const newPosition = { ...this.#position, y: this.#position.y + yMove };
    this.#position = newPosition;
    this.#setPosition(newPosition);
  }

  setUfoPosition(posX, posY) {
    const ufoCenterPosX = posX - this.getUfoWidth() / 2;
    const ufoCenterPosY = posY - this.getUfoHeight() / 2;
    const newPosition = { x: ufoCenterPosX, y: ufoCenterPosY };
    this.#position = newPosition;
    this.#setPosition(newPosition);
  }
}

export default UfoHelper;
