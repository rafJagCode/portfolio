import Animation from './Animation';
import { animationsTypes } from '@/types';

class BeamAnimation extends Animation {
  #beamHelper;
  #ufoHelper;
  #cowHelper;

  constructor(dispatch = null, beamHelper, ufoHelper, cowHelper) {
    super(animationsTypes.BEAM_ANIMATION, dispatch);
    this.#beamHelper = beamHelper;
    this.#ufoHelper = ufoHelper;
    this.#cowHelper = cowHelper;
    this.reset();
  }

  start() {
    this.changeBeamOpacity(1);
    return requestAnimationFrame(this.step);
  }

  stop() {
    this.resolve();
  }

  reset() {
    this.requestAnimationID = null;
    this.changeBeamOpacity(0);
    this.#beamHelper.changeBeamWidth(0);
    this.#beamHelper.changeBeamHeight(0);
  }

  step() {
    this.resizeBeam();
    this.requestAnimationID = requestAnimationFrame(this.step);
  }

  resizeBeam() {
    const width = this.#cowHelper.getCowWidth();
    const height = this.calculateBeamHeight();
    this.#beamHelper.changeBeamWidth(width);
    this.#beamHelper.changeBeamHeight(height);
  }

  calculateBeamHeight() {
    const [, cowBottomY] = this.#cowHelper.getCowBottomMiddlePosition();
    const [, ufoBottomY] = this.#ufoHelper.getUfoMiddleBottomPosition();
    const beamHeight = cowBottomY - ufoBottomY;
    return beamHeight;
  }

  changeBeamOpacity(beamPower) {
    this.#beamHelper.changeBeamOpacity(beamPower);
  }
}

export default BeamAnimation;
