import types from 'redux/types';

class AsteroidAnimation {
  asteroidData;
  speed;
  position;
  setPosition;
  ufoCollisionData;
  ufoPosition;
  isUfoImmune;
  dispatch;
  asteroidID;
  angle;
  requestAnimationID;

  constructor(asteroidData, startingSpeed, position, setPosition, ufoCollisionData, ufoPosition, dispatch, asteroidID) {
    this.asteroidData = asteroidData;
    this.speed = startingSpeed;
    this.position = position;
    this.setPosition = setPosition;
    this.ufoCollisionData = ufoCollisionData;
    this.ufoPosition = ufoPosition;
    this.isUfoImmune = false;
    this.dispatch = dispatch;
    this.asteroidID = asteroidID;
    this.angle = Math.random() * (2 * Math.PI);
    this.step = this.step.bind(this);
  }

  start() {
    if (this.requestAnimationID) return;
    this.requestAnimationID = requestAnimationFrame(this.step);
  }

  stop() {
    if (!this.requestAnimationID) return;
    cancelAnimationFrame(this.requestAnimationID);
  }

  step() {
    const isAsteroidInUfoZone = this.isAsteroidInUfoZone();
    if (!this.isUfoImmune && isAsteroidInUfoZone) {
      const overlapingArea = this.getOverlapingArea();
      const collisionPoint = this.findUfoCollisionPoint(overlapingArea);
      if (collisionPoint) {
        this.dispatch({ type: types.ADD_UFO_HIT, hitpoint: collisionPoint });
        if (overlapingArea.width > overlapingArea.height) this.bounceVertical();
        else this.bounceHorizontal();
        this.isUfoImmune = true;
      }
    }
    if (this.isUfoImmune && !isAsteroidInUfoZone) this.isUfoImmune = false;
    if (this.isVerticalScreenLimit()) this.bounceVertical();
    if (this.isHoriziontalScreenLimit()) this.bounceHorizontal();
    this.moveAsteroid();
    this.requestAnimationID = requestAnimationFrame(this.step);
  }

  moveAsteroid() {
    const moveX = this.speed * Math.cos(this.angle);
    const moveY = this.speed * Math.sin(this.angle);
    const newPosition = { x: this.position.x + moveX, y: this.position.y + moveY };
    this.position = newPosition;
    this.setPosition(newPosition);
  }

  isVerticalScreenLimit() {
    if (this.position.y + this.asteroidData.minY <= 0) return true;
    if (this.position.y + this.asteroidData.maxY >= window.innerHeight) return true;
    return false;
  }

  isHoriziontalScreenLimit() {
    if (this.position.x + this.asteroidData.minX <= 0) return true;
    if (this.position.x + this.asteroidData.maxX >= window.innerWidth) return true;
    return false;
  }

  bounceVertical() {
    this.angle = 2 * Math.PI - this.angle;
  }

  bounceHorizontal() {
    this.angle = Math.PI - this.angle;
  }

  setUfoPosition(ufoPosition) {
    this.ufoPosition = ufoPosition;
  }

  isAsteroidInUfoZone() {
    if (!this.ufoPosition) return false;
    if (this.position.x + this.asteroidData.minX > this.ufoPosition.x + this.ufoCollisionData.maxX) return false;
    if (this.position.x + this.asteroidData.maxX < this.ufoPosition.x + this.ufoCollisionData.minX) return false;
    if (this.position.y + this.asteroidData.minY > this.ufoPosition.y + this.ufoCollisionData.maxY) return false;
    if (this.position.y + this.asteroidData.maxY < this.ufoPosition.y + this.ufoCollisionData.minY) return false;
    return true;
  }

  getOverlapingArea() {
    const xPoints = [this.position.x + this.asteroidData.minX, this.position.x + this.asteroidData.maxX, this.ufoPosition.x + this.ufoCollisionData.minX, this.ufoPosition.x + this.ufoCollisionData.maxX].sort((a, b) => a - b);
    const yPoints = [this.position.y + this.asteroidData.minY, this.position.y + this.asteroidData.maxY, this.ufoPosition.y + this.ufoCollisionData.minY, this.ufoPosition.y + this.ufoCollisionData.maxY].sort((a, b) => a - b);
    const overlapingArea = {
      minX: xPoints[1],
      maxX: xPoints[2],
      minY: yPoints[1],
      maxY: yPoints[2],
      width: xPoints[2] - xPoints[1],
      height: yPoints[2] - yPoints[1],
    };

    return overlapingArea;
  }

  getPossibleCollisionPoints(collisionPoints, position, overlapingArea) {
    const possibleCollisionPoints = collisionPoints.filter((point) => {
      if (point[0] + position.x < overlapingArea.minX) return false;
      if (point[0] + position.x > overlapingArea.maxX) return false;
      if (point[1] + position.y < overlapingArea.minY) return false;
      if (point[1] + position.y > overlapingArea.maxY) return false;
      return true;
    });
    return possibleCollisionPoints;
  }

  findUfoCollisionPoint(overlapingArea) {
    const hitbox = 10;
    const possibleUfoCollionPoints = this.getPossibleCollisionPoints(this.ufoCollisionData.collisionPoints, this.ufoPosition, overlapingArea);
    if (!possibleUfoCollionPoints.length) return null;
    const possibleAsteroidCollisionPoints = this.getPossibleCollisionPoints(this.asteroidData.collisionPoints, this.position, overlapingArea);
    if (!possibleAsteroidCollisionPoints.length) return null;

    const result = this.findClosestCollisionPoint(possibleAsteroidCollisionPoints, possibleUfoCollionPoints);
    if (!result) return null;
    if (result.distance > hitbox) return null;
    return result.collisionPoint;
  }

  findClosestCollisionPoint(possibleAsteroidCollisionPoints, possibleUfoCollionPoints) {
    const [minDistance, ufoPoint] = possibleAsteroidCollisionPoints.reduce(
      (acc, asteroidPoint) => {
        const [minDistance, ufoPoint] = possibleUfoCollionPoints.reduce(
          (acc, ufoPoint) => {
            const relativeAsteroidPoint = { x: asteroidPoint[0] + this.position.x, y: asteroidPoint[1] + this.position.y };
            const relativeUfoPoint = { x: ufoPoint[0] + this.ufoPosition.x, y: ufoPoint[1] + this.ufoPosition.y };
            const distance = this.getDistanceBetweenTwoPoints(relativeAsteroidPoint, relativeUfoPoint);
            if (distance < acc[0]) return [distance, relativeUfoPoint];
            return acc;
          },
          [Number.POSITIVE_INFINITY, null],
        );
        if (minDistance < acc[0]) return [minDistance, ufoPoint];
        return acc;
      },
      [Number.POSITIVE_INFINITY, null],
    );

    if (!ufoPoint) return null;
    return { distance: minDistance, collisionPoint: ufoPoint };
  }

  getDistanceBetweenTwoPoints(point1, point2) {
    const xDiff = point1.x - point2.x;
    const yDiff = point1.y - point2.y;
    const distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    return distance;
  }
}

export default AsteroidAnimation;
