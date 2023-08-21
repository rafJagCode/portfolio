import changeElementStyle from '@/utils/element_functions/changeElementStyle';
import getElementCenterCoordinates from '@/utils/element_functions/getElementCenterCoordinates';
import actions from 'redux/actions';

class CrosshairAnimation {
  r = 100;
  x = -100;
  y = 0;
  angle = Math.PI;
  angleSpeed = 0;
  angleSpeedChange = Math.PI / (10 * 60);
  maxAngleSpeed = Math.PI / 30;
  minAngleSpeed = -Math.PI / 30;
  isRightArrowPressed = false;
  isLeftArrowPressed = false;
  ufo;
  crosshair;
  dispatch;
  requestAnimationID;

  constructor(ufoRef, crosshairRef, dispatch) {
    this.ufo = ufoRef.current;
    this.crosshair = crosshairRef.current;
    this.dispatch = dispatch;
    this.step = this.step.bind(this);
  }

  start() {
    if (this.requestAnimationID) return;
    this.moveCrosshair();
    requestAnimationFrame(this.step);
  }

  stop() {
    if (!this.requestAnimationID) return;
    cancelAnimationFrame(this.requestAnimationID);
  }

  step() {
    if (!this.isLeftArrowPressed && !this.isRightArrowPressed) this.angleSpeed = 0;
    if (this.isLeftArrowPressed) this.handleLeftArrow();
    if (this.isRightArrowPressed) this.handleRightArrow();
    this.changeAngle();
    this.moveCrosshair();

    this.requestAnimationID = requestAnimationFrame(this.step);
  }

  handleRightArrow() {
    this.angleSpeed -= this.angleSpeedChange;
    if (this.angleSpeed < this.minAngleSpeed) this.angleSpeed = this.minAngleSpeed;
    if (this.angle <= 0) this.angle = 2 * Math.PI;
  }

  handleLeftArrow() {
    this.angleSpeed += this.angleSpeedChange;
    if (this.angleSpeed > this.maxAngleSpeed) this.angleSpeed = this.maxAngleSpeed;
    if (this.angle >= 2 * Math.PI) this.angle = 0;
  }

  changeAngle() {
    this.angle += this.angleSpeed;
    if (!this.angleSpeed) this.dispatch(actions.setCorsshairAngle(this.angle));
  }

  moveCrosshair() {
    this.x = this.r * Math.cos(this.angle);
    this.y = this.r * -Math.sin(this.angle);
    const ufoCenter = getElementCenterCoordinates(this.ufo);
    changeElementStyle(this.crosshair, 'centerPosition', { x: ufoCenter.x + this.x, y: ufoCenter.y + this.y });
  }

  setIsRightArrowPressed(pressed) {
    this.isRightArrowPressed = pressed;
  }

  setIsLeftArrowPressed(pressed) {
    this.isLeftArrowPressed = pressed;
  }
}

export default CrosshairAnimation;
