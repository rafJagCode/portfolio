class FlyingHelper {
  #ufoHelper;

  constructor(ufoHelper) {
    this.#ufoHelper = ufoHelper;
  }

  makeUfoStep(destination, speed) {
    const move = this.getMove(destination, speed);
    this.moveUfo(move.x, move.y);
  }

  isDestinationReached(destination) {
    const [deltaX, deltaY] = this.getDeltas(destination);
    if (Math.abs(deltaX) < 1 && Math.abs(deltaY) < 1) return true;
    return false;
  }

  getDeltas(destination) {
    const [destinationX, destinationY] = destination;
    const [ufoMiddleX, ufoMiddleY] = this.#ufoHelper.getUfoMiddlePosition();
    const deltaX = destinationX - ufoMiddleX;
    const deltaY = destinationY - ufoMiddleY;
    return [deltaX, deltaY];
  }

  getMove(destination, speed) {
    const [deltaX, deltaY] = this.getDeltas(destination);
    const derivative = this.getDerivative(deltaX, deltaY);
    const moveX = this.calculateMoveX(deltaX, speed);
    return {
      x: moveX,
      y: moveX * derivative,
    };
  }

  getDerivative(deltaX, deltaY) {
    return deltaX === 0 ? 0 : deltaY / deltaX;
  }

  calculateMoveX(deltaX, speed) {
    const sign = deltaX < 0 ? -1 : 1;
    const moveX = Math.abs(deltaX) >= speed ? speed : Math.abs(deltaX);
    return sign * moveX;
  }

  moveUfo(moveX, moveY) {
    this.#ufoHelper.moveUfoHorizontally(moveX);
    this.#ufoHelper.moveUfoVertically(moveY);
  }

  teleportUfoToDestination(destination) {
    const [destinationX, destinationY] = destination;
    this.#ufoHelper.setUfoPosition(destinationX, destinationY);
  }
}

export default FlyingHelper;
