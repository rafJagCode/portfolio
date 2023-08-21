import Animation from 'Animation';
import { animationsTypes } from '@/configuration/types_conf';
import changeElementStyle from '@/utils/element_functions/changeElementStyle';

class BeamAnimation extends Animation {
  beam = null;

  constructor(dispatch = null, { beamRef }) {
    super(animationsTypes.BEAM_ANIMATION, dispatch);
    this.beam = beamRef.current;
  }

  start() {
    changeElementStyle(this.beam, 'visibility', true);
    return requestAnimationFrame(this.step);
  }

  stop() {
    this.resolve();
  }

  reset() {
    this.requestAnimationID = null;
    changeElementStyle(this.beam, 'visibility', false);
  }

  step() {
    this.requestAnimationID = requestAnimationFrame(this.step);
  }
}

export default BeamAnimation;
