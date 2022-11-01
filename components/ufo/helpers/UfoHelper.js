class UfoHelper {
  #ufo;

  constructor(ufoRef) {
    this.#ufo = ufoRef.current;
  }

  getUfoMiddlePosition() {
    const xPos = this.#ufo.offsetLeft + this.#ufo.offsetWidth / 2;
    const yPos = this.#ufo.offsetTop + this.#ufo.offsetHeight / 2;
    return [xPos, yPos];
  }

  getUfoMiddleBottomPosition() {
    const xPos = this.#ufo.offsetLeft + this.#ufo.offsetWidth / 2;
    const yPos = this.#ufo.offsetTop + this.#ufo.offsetHeight;
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
    this.#ufo.style.left = this.getPercentageHorizontalPos(this.#ufo.offsetLeft + xMove);
  }

  moveUfoVertically(yMove) {
    this.#ufo.style.top = this.getPercentageVerticalPos(this.#ufo.offsetTop + yMove);
  }

  getPercentageHorizontalPos(posX) {
    return `${(posX / window.innerWidth) * 100}%`;
  }

  getPercentageVerticalPos(posY) {
    return `${(posY / window.innerHeight) * 100}%`;
  }

  setUfoPosition(posX, posY) {
    const ufoCenterPosX = posX - this.getUfoWidth() / 2;
    const ufoCenterPosY = posY - this.getUfoHeight() / 2;
    this.#ufo.style.left = this.getPercentageHorizontalPos(ufoCenterPosX);
    this.#ufo.style.top = this.getPercentageVerticalPos(ufoCenterPosY);
  }
}

export default UfoHelper;
