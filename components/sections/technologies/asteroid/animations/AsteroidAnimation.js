import imagesCollisionData from '@/configuration/images_collision_data_conf';
import changeElementStyle from '@/utils/element_functions/changeElementStyle';
import getElementCenterCoordinates from '@/utils/element_functions/getElementCenterCoordinates';
import getAngleBetweenTwoPoints from '@/utils/helper_functions/getAngleBetweenTwoPoints';
import getClockwiseRotatedVector from '@/utils/helper_functions/getClockwiseRotatedVector';
import getCounterclockwiseRotatedVector from '@/utils/helper_functions/getCounterclockwiseRotatedVector';
import getDistanceBetweenTwoPoints from '@/utils/helper_functions/getDistanceBetweenTwoPoints';
import actions from 'redux/actions';

class AsteroidAnimation {
  asteroid;
  ufo;
  speed;
  requestAnimationID;

  constructor(startingSpeed, asteroidRef, ufoRef, dispatch) {
    this.setStartingSpeed(startingSpeed);
    this.asteroid = asteroidRef.current;
    this.ufo = ufoRef.current;
    this.dispatch = dispatch;
    this.step = this.step.bind(this);
  }

  setStartingSpeed(startingSpeed) {
    const angle = Math.random() * 2 * Math.PI;
    this.speed = { x: startingSpeed * Math.cos(angle), y: startingSpeed * -Math.sin(angle) };
  }

  start() {
    if (this.requestAnimationID) return;
    if (this.immunityTimer) this.immunityTimer.resume();
    this.requestAnimationID = requestAnimationFrame(this.step);
    return this;
  }

  stop() {
    if (!this.requestAnimationID) return;
    if (this.immunityTimer) this.immunityTimer.pause();
    cancelAnimationFrame(this.requestAnimationID);
    this.requestAnimationID = null;
  }

  step() {
    if (!this.isUfoImmune() && this.isAsteroidInUfoZone()) {
      const hitpoints = this.checkCollisionPoints();
      if (hitpoints) {
        this.makeUfoImmune();
        this.bounceFromUfo(hitpoints);
        this.dispatch(actions.addUfoHit(hitpoints.first));
      }
    }

    if (this.isVerticalScreenLimit()) this.bounceVertical();
    if (this.isHorizontalScreenLimit()) this.bounceHorizontal();
    this.moveAsteroid();
    this.requestAnimationID = requestAnimationFrame(this.step);
  }

  isUfoImmune() {
    return this.ufo.dataset.isImmune === 'false' ? false : true;
  }

  makeUfoImmune() {
    this.ufo.dataset.isImmune = true;
  }

  isAsteroidInUfoZone() {
    const asteroidRect = this.asteroid.getBoundingClientRect();
    const ufoRect = this.ufo.getBoundingClientRect();
    return asteroidRect.left <= ufoRect.right && asteroidRect.right >= ufoRect.left && asteroidRect.top <= ufoRect.bottom && asteroidRect.bottom >= ufoRect.top;
  }

  checkCollisionPoints() {
    const hitbox = 10;
    const imageName = this.asteroid.dataset.image;
    const asteroidCollisionPoints = imagesCollisionData[imageName];
    const ufoCollisionPoints = imagesCollisionData.ufo;
    const asteroidRect = this.asteroid.getBoundingClientRect();
    const ufoRect = this.ufo.getBoundingClientRect();

    const hitpointIndex = ufoCollisionPoints.findIndex((ufoPoint) => {
      const ufoPointPos = { x: ufoPoint.x * ufoRect.width + ufoRect.left, y: ufoPoint.y * ufoRect.height + ufoRect.top };
      if (ufoPointPos.x < asteroidRect.left) return false;
      if (ufoPointPos.x > asteroidRect.right) return false;
      if (ufoPointPos.y < asteroidRect.top) return false;
      if (ufoPointPos.y > asteroidRect.bottom) return false;
      return asteroidCollisionPoints.find((asteroidPoint) => {
        const asteroidPointPos = { x: asteroidPoint.x * asteroidRect.width + asteroidRect.left, y: asteroidPoint.y * asteroidRect.height + asteroidRect.top };
        if (Math.abs(asteroidPointPos.x - ufoPointPos.x) > hitbox) return false;
        if (Math.abs(asteroidPointPos.y - ufoPointPos.y) > hitbox) return false;
        return true;
      });
    });

    if (hitpointIndex === -1) return null;

    const hitpoint1 = {
      //force prettier break
      x: ufoCollisionPoints[hitpointIndex].x * ufoRect.width + ufoRect.left,
      y: ufoCollisionPoints[hitpointIndex].y * ufoRect.height + ufoRect.top,
    };

    //GET CLOSEST NEXT CLOSEST HITPOINT
    const hitpointIndex2 = hitpointIndex < ufoCollisionPoints.length - 1 ? hitpointIndex + 1 : hitpointIndex - 1;
    const hitpoint2 = {
      //force prettier break
      x: ufoCollisionPoints[hitpointIndex2].x * ufoRect.width + ufoRect.left,
      y: ufoCollisionPoints[hitpointIndex2].y * ufoRect.height + ufoRect.top,
    };

    return { first: hitpoint1, second: hitpoint2 };
  }

  isVerticalScreenLimit() {
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const { top, bottom } = this.asteroid.getBoundingClientRect();
    if (this.speed.y < -top) return true;
    if (this.speed.y > windowHeight - bottom) return true;
  }

  isHorizontalScreenLimit() {
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    const { left, right } = this.asteroid.getBoundingClientRect();
    if (this.speed.x < -left) return true;
    if (this.speed.x > windowWidth - right) return true;
  }

  bounceVertical() {
    this.speed.y = -this.speed.y;
  }

  bounceHorizontal() {
    this.speed.x = -this.speed.x;
  }

  bounceFromUfo(hitpoints) {
    this.speed = this.getBounceSpeed(hitpoints);
    if (!this.isMovingAway()) this.speed = { x: -this.speed.x, y: -this.speed.y };
  }

  getBounceSpeed(hitpoints) {
    const ufoAngle = getAngleBetweenTwoPoints(hitpoints.first, hitpoints.second);
    const clockwiseRotatedSpeed = getClockwiseRotatedVector(this.speed, ufoAngle);
    const veticallyBouncedSpeed = { x: clockwiseRotatedSpeed.x, y: -clockwiseRotatedSpeed.y };
    return getCounterclockwiseRotatedVector(veticallyBouncedSpeed, ufoAngle);
  }

  isMovingAway() {
    const asteroidCenter = getElementCenterCoordinates(this.asteroid);
    const ufoCenter = getElementCenterCoordinates(this.ufo);
    const movedAsteroidCenter = { x: asteroidCenter.x + this.speed.x, y: asteroidCenter.y + this.speed.y };
    const reversedMovedAsteroidCenter = { x: asteroidCenter.x - this.speed.x, y: asteroidCenter.y - this.speed.y };
    return getDistanceBetweenTwoPoints(ufoCenter, movedAsteroidCenter) > getDistanceBetweenTwoPoints(ufoCenter, reversedMovedAsteroidCenter);
  }

  moveAsteroid() {
    const asteroidCenter = getElementCenterCoordinates(this.asteroid);
    changeElementStyle(this.asteroid, 'centerPosition', { x: asteroidCenter.x + this.speed.x, y: asteroidCenter.y + this.speed.y });
  }
}

export default AsteroidAnimation;
