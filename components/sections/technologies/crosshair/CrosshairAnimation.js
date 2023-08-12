import changeElementStyle from '@/utils/element_functions/changeElementStyle';
import getElementCenterCoordinates from '@/utils/element_functions/getElementCenterCoordinates';
import actions from 'redux/actions';

class CrosshairAnimation {
  r = 100;
  x = -100;
  y = 0;
  angle = Math.PI;
  angleVelocity = Math.PI / 60;
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
    if (this.isLeftArrowPressed) this.handleLeftArrow();
    if (this.isRightArrowPressed) this.handleRightArrow();
    this.moveCrosshair();
    this.dispatch(actions.setCorsshairAngle(this.angle));
    this.requestAnimationID = requestAnimationFrame(this.step);
  }

  handleRightArrow() {
    this.angle -= this.angleVelocity;
    if (this.angle <= 0) this.angle = 2 * Math.PI;
    this.x = this.r * Math.cos(this.angle);
    this.y = this.r * -Math.sin(this.angle);
  }

  handleLeftArrow() {
    this.angle += this.angleVelocity;
    if (this.angle >= 2 * Math.PI) this.angle = 0;
    this.x = this.r * Math.cos(this.angle);
    this.y = this.r * -Math.sin(this.angle);
  }

  moveCrosshair() {
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
