class EarthHelper {
  #earth;
  constructor(earthRef) {
    this.#earth = earthRef.current;
  }

  getEarthMiddlePosition() {
    const xPos = this.#earth.offsetLeft + this.#earth.offsetWidth / 2;
    const yPos = this.#earth.offsetTop + this.#earth.offsetHeight / 2;
    return [xPos, yPos];
  }

  getEarthTopRightCornerPosition() {
    const xPos = this.#earth.offsetLeft + this.#earth.offsetWidth;
    const yPos = this.#earth.offsetTop;
    return [xPos, yPos];
  }

  getEarthBottomLeftCornerPosition() {
    const xPos = this.#earth.offsetLeft;
    const yPos = this.#earth.offsetTop + this.#earth.offsetHeight;
    return [xPos, yPos];
  }

  getHalfOrbitLength() {
    return this.#earth.offsetWidth;
  }
}

export default EarthHelper;
