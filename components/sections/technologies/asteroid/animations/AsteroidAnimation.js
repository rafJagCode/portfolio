import imagesCollisionData from '@/configuration/images_collision_data';
import changeElementStyle from '@/utils/element_functions/changeElementStyle';
import getElementCenterCoordinates from '@/utils/element_functions/getElementCenterCoordinates';
import getAngleBetweenTwoPoints from '@/utils/helper_functions/getAngleBetweenTwoPoints';
import getDistanceBetweenTwoPoints from '@/utils/helper_functions/getDistanceBetweenTwoPoints';
import actions from 'redux/actions';

class AsteroidAnimation {
  speed;
  asteroid;
  ufo;
  angle;
  requestAnimationID;

  constructor(startingSpeed, asteroidRef, ufoRef, dispatch) {
    this.speed = startingSpeed;
    this.asteroid = asteroidRef.current;
    this.ufo = ufoRef.current;
    this.dispatch = dispatch;
    this.angle = Math.random() * 2 * Math.PI;
    this.step = this.step.bind(this);
  }

  start() {
    if (this.requestAnimationID) return;
    this.requestAnimationID = requestAnimationFrame(this.step);
    return this;
  }

  stop() {
    if (!this.requestAnimationID) return;
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
    if (this.isHoriziontalScreenLimit()) this.bounceHorizontal();
    this.moveAsteroid();
    this.requestAnimationID = requestAnimationFrame(this.step);
  }

  isUfoImmune() {
    return this.ufo.dataset.isImmune === 'false' ? false : true;
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
    const hitpointIndex2 = hitpointIndex < ufoCollisionPoints.length ? hitpointIndex + 1 : hitpointIndex - 1;
    const hitpoint2 = {
      //force prettier break
      x: ufoCollisionPoints[hitpointIndex2].x * ufoRect.width + ufoRect.left,
      y: ufoCollisionPoints[hitpointIndex2].y * ufoRect.height + ufoRect.top,
    };

    return { first: hitpoint1, second: hitpoint2 };
  }

  makeUfoImmune() {
    this.ufo.dataset.isImmune = true;
    setTimeout(() => (this.ufo.dataset.isImmune = false), 5000);
  }

  bounceFromUfo(hitpoints) {
    const collisionAngle = getAngleBetweenTwoPoints(hitpoints.first, hitpoints.second);
    const normal = collisionAngle + Math.PI / 2;
    const diffFromNormal = Math.abs(this.angle - normal);
    let bounceAngle = this.angle - 2 * diffFromNormal;
    if (bounceAngle < 0) bounceAngle += 2 * Math.PI;
    if (!this.isEscapeAngle(bounceAngle)) bounceAngle += Math.PI;
    this.angle = bounceAngle;
  }

  isEscapeAngle(bounceAngle) {
    const asteroidCenter = getElementCenterCoordinates(this.asteroid);
    const ufoCenter = getElementCenterCoordinates(this.ufo);
    const moveX = this.speed * Math.cos(bounceAngle);
    const moveY = this.speed * -Math.sin(bounceAngle);
    const movedAsteroidCenter = { x: asteroidCenter.x + moveX, y: asteroidCenter.y + moveY };
    const reversedMovedAsteroidCenter = { x: asteroidCenter.x - moveX, y: asteroidCenter.y - moveY };
    return getDistanceBetweenTwoPoints(ufoCenter, movedAsteroidCenter) > getDistanceBetweenTwoPoints(ufoCenter, reversedMovedAsteroidCenter);
  }

  isVerticalScreenLimit() {
    const { top, bottom } = this.asteroid.getBoundingClientRect();
    return top <= 0 || bottom >= (window.innerHeight || document.documentElement.clientHeight);
  }

  isHoriziontalScreenLimit() {
    const { left, right } = this.asteroid.getBoundingClientRect();
    return left <= 0 || right >= (window.innerWidth || document.documentElement.clientWidth);
  }

  bounceVertical() {
    this.angle = 2 * Math.PI - this.angle;
  }

  bounceHorizontal() {
    this.angle = Math.PI - this.angle;
  }

  moveAsteroid() {
    const asteroidCenter = getElementCenterCoordinates(this.asteroid);
    const moveX = this.speed * Math.cos(this.angle);
    const moveY = this.speed * -Math.sin(this.angle);
    changeElementStyle(this.asteroid, 'centerPosition', { x: asteroidCenter.x + moveX, y: asteroidCenter.y + moveY });
  }
}

export default AsteroidAnimation;
