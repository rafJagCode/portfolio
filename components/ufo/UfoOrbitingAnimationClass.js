class UfoOrbitingAnimationClass {
  #start;
  #ufoElement;
  #earthElement;
  #ufoTop;
  #ufoLeft;
  #ufoCenterTop;
  #ufoCenterLeft;
  #firstEarthCornerX;
  #firstEarthCornerY;
  #secondEarthCornerX;
  #secondEarthCornerY;
  #earthCenterLeft;
  #orbitToRight;
  #speed;
  #animation;
  #isUfoLeavingHomeSection;
  #animationPromise;
  #animationPromiseResolve;

  constructor(ufoElement, earthElement) {
    this.#start = undefined;
    this.#ufoElement = ufoElement;
    this.#earthElement = earthElement;
    this.#ufoTop = undefined;
    this.#ufoLeft = undefined;
    this.#ufoCenterTop = undefined;
    this.#ufoCenterLeft = undefined;
    this.#firstEarthCornerX = undefined;
    this.#firstEarthCornerY = undefined;
    this.#secondEarthCornerX = undefined;
    this.#secondEarthCornerY = undefined;
    this.#earthCenterLeft = undefined;
    this.#orbitToRight = true;
    this.#speed = 2;
    this.#animation = undefined;
    this.#isUfoLeavingHomeSection = false;
    this.#animationPromise = undefined;
    this.#animationPromiseResolve = undefined;
  }

  step = (timestamp) => {
    this.setStartTime();
    this.setUfoPosition();
    this.setEarthCorners();
    this.changeUfoSize();
    if (this.stopAnimationIfConditionsFulliled()) return;
    if (this.#orbitToRight) this.goToFirstEarthCorner();
    if (!this.#orbitToRight) this.goToSecondEarthCorner();
    this.#animation = requestAnimationFrame(this.step);
  };

  setStartTime = (timestamp) => {
    if (this.#start) return;
    this.#start = timestamp;
  };

  setUfoPosition = () => {
    this.#ufoTop = this.#ufoElement.offsetTop;
    this.#ufoLeft = this.#ufoElement.offsetLeft;
    this.#ufoCenterTop = this.#ufoTop + this.#ufoElement.offsetHeight / 2;
    this.#ufoCenterLeft = this.#ufoLeft + this.#ufoElement.offsetWidth / 2;
  };

  setEarthCorners = () => {
    this.#firstEarthCornerX = this.#earthElement.offsetLeft + this.#earthElement.offsetWidth;
    this.#firstEarthCornerY = this.#earthElement.offsetTop;
    this.#secondEarthCornerX = this.#earthElement.offsetLeft;
    this.#secondEarthCornerY = this.#earthElement.offsetTop + this.#earthElement.offsetHeight;
    this.#earthCenterLeft = this.#earthElement.offsetLeft + this.#earthElement.offsetWidth / 2;
  };

  goToFirstEarthCorner = () => {
    let xDifference = this.#firstEarthCornerX - this.#ufoCenterLeft;
    let yDifference = this.#firstEarthCornerY - this.#ufoCenterTop;
    if (xDifference <= 0) {
      this.#orbitToRight = false;
      this.#ufoElement.style.zIndex = 0;
      return;
    }
    let derivative = yDifference / xDifference;
    this.moveUfo(derivative, this.#speed);
  };

  goToSecondEarthCorner = () => {
    let xDifference = this.#secondEarthCornerX - this.#ufoCenterLeft;
    let yDifference = this.#secondEarthCornerY - this.#ufoCenterTop;
    if (xDifference >= 0) {
      this.#orbitToRight = true;
      this.#ufoElement.style.zIndex = 2;
      return;
    }
    let derivative = yDifference / xDifference;
    this.moveUfo(derivative, -this.#speed);
  };

  moveUfo = (derivative, xMove) => {
    let newTopPos = this.#ufoLeft + xMove;
    let newLeftPos = this.#ufoTop + derivative * xMove;
    this.#ufoElement.style.left = `${newTopPos}px`;
    this.#ufoElement.style.top = `${newLeftPos}px`;
  };

  changeUfoSize = () => {
    let isUfoFlyingAway = this.#ufoCenterLeft >= this.#earthCenterLeft;
    if (isUfoFlyingAway) this.reduceUfoSize();
    if (!isUfoFlyingAway) this.increaseUfoSize();
  };

  reduceUfoSize = () => {
    let distance;
    if (this.#orbitToRight) distance = this.#ufoCenterLeft - this.#earthCenterLeft;
    if (!this.#orbitToRight) distance = this.#earthElement.offsetWidth - (this.#ufoCenterLeft - this.#earthCenterLeft);
    let sizeFactor = 0.2;
    let scale = 1 - (distance / (this.#earthElement.offsetWidth / 2)) * sizeFactor;
    this.#ufoElement.style.transform = `scale(${scale})`;
  };

  increaseUfoSize = () => {
    let distance;
    if (!this.#orbitToRight) distance = this.#earthElement.offsetWidth - (this.#earthCenterLeft - this.#ufoCenterLeft);
    if (this.#orbitToRight) distance = this.#earthCenterLeft - this.#ufoCenterLeft;
    let sizeFactor = 0.2;
    let scale = 1 - (distance / (this.#earthElement.offsetWidth / 2)) * sizeFactor;
    this.#ufoElement.style.transform = `scale(${scale})`;
  };

  animate = () => {
    this.#animationPromise = new Promise((resolve) => (this.#animationPromiseResolve = resolve));
    this.#animation = requestAnimationFrame(this.step);
  };

  goToLaunchingPosition = () => {
    this.#speed *= 2;
    this.#isUfoLeavingHomeSection = true;
    return this.#animationPromise;
  };

  stopAnimationIfConditionsFulliled = () => {
    if (!this.areStopConditionsFullfiled()) return;
    cancelAnimationFrame(this.#animation);
    this.#animationPromiseResolve();
    return true;
  };

  areStopConditionsFullfiled = () => {
    if (!this.#isUfoLeavingHomeSection) return false;
    let isUfoInFirstEarthCorner = this.#firstEarthCornerX - this.#ufoCenterLeft <= 0;
    if (!isUfoInFirstEarthCorner) return false;
    return true;
  };
}

export default UfoOrbitingAnimationClass;
