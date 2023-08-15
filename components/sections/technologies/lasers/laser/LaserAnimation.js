import imagesCollisionData from '@/configuration/images_collision_data_conf';
import changeElementStyle from '@/utils/element_functions/changeElementStyle';
import getElementCenterCoordinates from '@/utils/element_functions/getElementCenterCoordinates';
import getAngleBetweenTwoPoints from '@/utils/helper_functions/getAngleBetweenTwoPoints';
import actions from 'redux/actions';

class LaserAnimation {
  requestAnimationID;
  dispatch;
  promise;
  resolve;
  laser;
  ufo;
  speed = 5;
  speedX;
  speedY;
  angle;
  laserTip;
  asteroidsData;

  constructor(laserRef, ufoRef, crosshairAngle, dispatch) {
    this.laser = laserRef.current;
    this.ufo = ufoRef.current;
    this.angle = crosshairAngle;
    this.dispatch = dispatch;
    this.step = this.step.bind(this);
  }

  reset() {
    this.requestAnimationID = null;
  }

  step() {
    if (!this.isInViewport()) return this.stop();
    this.moveLaser();
    this.setLaserTip();

    const asteroid = this.checkAsteroidsCollisionZones();

    if (asteroid) {
      const hitpoint = this.checkCollisionPoints(asteroid);
      if (hitpoint) {
        this.dispatch(actions.addAsteroidHit(asteroid.id, hitpoint));
        return this.stop();
      }
    }

    this.requestAnimationID = requestAnimationFrame(this.step);
  }

  start() {
    if (this.requestAnimationID) return;
    this.setStartingStyles();
    this.setDirectionalSpeedComponents();
    this.promise = new Promise((resolve) => {
      this.resolve = resolve;
    });
    this.requestAnimationID = requestAnimationFrame(this.step);
    return this.promise;
  }

  stop() {
    if (!this.requestAnimationID) return;
    cancelAnimationFrame(this.requestAnimationID);
    this.resolve();
    this.reset();
  }

  setStartingStyles() {
    const ufoCenter = getElementCenterCoordinates(this.ufo);
    changeElementStyle(this.laser, 'centerPosition', ufoCenter);
    changeElementStyle(this.laser, 'rotate', Math.PI - this.angle);
    changeElementStyle(this.laser, 'visibility', true);
  }

  setDirectionalSpeedComponents() {
    this.speedX = this.speed * Math.cos(this.angle);
    this.speedY = this.speed * -Math.sin(this.angle);
  }

  isInViewport() {
    const { left, right, top, bottom } = this.laser.getBoundingClientRect();
    return top >= 0 && left >= 0 && bottom <= (window.innerHeight || document.documentElement.clientHeight) && right <= (window.innerWidth || document.documentElement.clientWidth);
  }

  moveLaser() {
    const laserCenter = getElementCenterCoordinates(this.laser);
    changeElementStyle(this.laser, 'centerPosition', { x: laserCenter.x + this.speedX, y: laserCenter.y + this.speedY });
  }

  setLaserTip() {
    const laserCenter = getElementCenterCoordinates(this.laser);
    const x = laserCenter.x + Math.cos(this.angle) * (this.laser.offsetWidth / 2);
    const y = laserCenter.y - Math.sin(this.angle) * (this.laser.offsetWidth / 2);
    this.laserTip = { x, y };
  }

  checkAsteroidsCollisionZones() {
    const asteroids = Array.from(document.querySelectorAll('.asteroid'));
    return asteroids.find((asteroid) => {
      const { left, right, top, bottom } = asteroid.getBoundingClientRect();
      if (this.laserTip.x < left) return false;
      if (this.laserTip.x > right) return false;
      if (this.laserTip.y < top) return false;
      if (this.laserTip.y > bottom) return false;
      return true;
    });
  }

  checkCollisionPoints(asteroid) {
    const hitbox = 10;
    const anglePrecision = Math.PI / 9;
    const imageName = asteroid.dataset.image;
    const { left, top, width, height } = asteroid.getBoundingClientRect();
    const points = imagesCollisionData[imageName];

    const hitpoint = points.find((point) => {
      const pointPos = { x: point.x * width + left, y: point.y * height + top };
      if (Math.abs(pointPos.x - this.laserTip.x) > hitbox) return false;
      if (Math.abs(pointPos.y - this.laserTip.y) > hitbox) return false;
      if (Math.abs(getAngleBetweenTwoPoints(pointPos, this.laserTip) - this.angle) > anglePrecision) return false;
      return true;
    });

    return hitpoint ? { x: hitpoint.x * width + left, y: hitpoint.y * height + top } : false;
  }
}

export default LaserAnimation;
