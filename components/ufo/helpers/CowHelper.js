class CowHelper {
  #cow = null;

  constructor() {}

  setCow(cowRef) {
    if (!cowRef) this.#cow = null;
    else this.#cow = cowRef.current;
  }

  getCow() {
    return this.#cow;
  }

  getCowBottomMiddlePosition() {
    const xPos = this.#cow.offsetLeft + this.getCowWidth() / 2;
    const yPos = this.#cow.offsetTop + this.getCowHeight();
    return [xPos, yPos];
  }

  getCowTopMiddlePosition() {
    const xPos = this.#cow.offsetLeft + this.getCowWidth() / 2;
    const yPos = this.#cow.offsetTop;
    return [xPos, yPos];
  }

  getCowWidth() {
    return this.#cow.offsetWidth;
  }

  getCowHeight() {
    return this.#cow.offsetHeight;
  }

  getCowImage() {
    return this.#cow.querySelector('img');
  }

  getCowImageShiftY() {
    const shift = this.getCowImage().style.bottom;
    if (!shift) return 0;
    return parseInt(shift.replace('%', ''));
  }

  shiftCowImageVertically(moveY) {
    this.getCowImage().style.bottom = `${this.getCowImageShiftY() + moveY}%`;
  }
}

export default CowHelper;
