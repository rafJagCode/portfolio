class CrosshairAnimation {
  #r = 100;
  #x = -100;
  #y = 0;
  #angle = Math.PI;
  #angleVelocity = Math.PI / 180;
  #ufoCenter = { x: 0, y: 0 };
  #crosshairPosition = { x: 0, y: 0 };
  #crosshair;
  #ufo;
  #setPosition;
  #requestAnimationID;
  #isRightArrowPressed = false;
  #isLeftArrowPressed = false;

  constructor(crosshairRef, ufoRef, setPosition) {
    this.#crosshair = crosshairRef.current;
    this.#ufo = ufoRef.current;
    this.#setPosition = setPosition;
    this.step = this.step.bind(this);
  }

  start() {
    if (this.#requestAnimationID) return;
    requestAnimationFrame(this.step);
  }

  stop() {
    if (!this.#requestAnimationID) return;
    cancelAnimationFrame(this.#requestAnimationID);
  }

  step() {
    this.setUfoCenter();
    if (this.#isRightArrowPressed) this.handleRightArrow();
    if (this.#isLeftArrowPressed) this.handleLeftArrow();
    this.moveCrosshairCenterTo(this.#ufoCenter.x + this.#x, this.#ufoCenter.y - this.#y);
    this.#requestAnimationID = requestAnimationFrame(this.step);
  }

  handleRightArrow() {
    this.#angle -= this.#angleVelocity;
    if (this.#angle <= 0) this.#angle = 2 * Math.PI;
    this.#x = this.#r * Math.cos(this.#angle);
    this.#y = this.#r * Math.sin(this.#angle);
  }
  handleLeftArrow() {
    this.#angle += this.#angleVelocity;
    if (this.#angle >= 2 * Math.PI) this.#angle = 0;
    this.#x = this.#r * Math.cos(this.#angle);
    this.#y = this.#r * Math.sin(this.#angle);
  }

  moveCrosshairCenterTo(x, y) {
    const positionX = x - this.#crosshair.offsetWidth / 2;
    const positionY = y - this.#crosshair.offsetHeight / 2;
    if (this.#crosshairPosition.x !== positionX || this.#crosshairPosition.y !== positionY) {
      this.#crosshairPosition = { x: positionX, y: positionY };
      this.#setPosition(this.#crosshairPosition);
    }
  }

  setIsRightArrowPressed(pressed) {
    this.#isRightArrowPressed = pressed;
  }

  setIsLeftArrowPressed(pressed) {
    this.#isLeftArrowPressed = pressed;
  }

  setUfoCenter() {
    const ufoCenterX = this.#ufo.offsetLeft + this.#ufo.offsetWidth / 2;
    const ufoCenterY = this.#ufo.offsetTop + this.#ufo.offsetHeight / 2;
    this.#ufoCenter = { x: ufoCenterX, y: ufoCenterY };
  }

  getCurrentAngle() {
    return this.#angle;
  }
}

export default CrosshairAnimation;
