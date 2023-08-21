import Animation from 'Animation';
import changeElementStyle from '@/utils/element_functions/changeElementStyle';
import { animationsTypes } from '@/configuration/types_conf';

class EngineAnimation extends Animation {
  startTime = null;
  engine = null;

  constructor(dispatch = null, { engineRef }) {
    super(animationsTypes.ENGINE_ANIMATION, dispatch);
    this.engine = engineRef.current;
  }

  start() {
    return requestAnimationFrame(this.step);
  }

  stop() {
    this.resolve();
  }

  reset() {
    this.requestAnimationID = null;
    changeElementStyle(this.engine, 'opacity', 0);
    changeElementStyle(this.engine, 'scale', 1);
  }

  step(timestamp) {
    if (!this.startTime) this.startTime = timestamp;
    const duration = timestamp - this.startTime;
    const enginePower = this.timeFn(duration);
    this.handleEngineChanges(enginePower);
    this.requestAnimationID = requestAnimationFrame(this.step);
  }

  timeFn(t) {
    let v;
    if (t <= 200) v = Math.pow(t, 2) / 40000;
    v = 1 - Math.abs(Math.sin(t / 200 - 1)) / 3;
    return v;
  }

  handleEngineChanges(enginePower) {
    changeElementStyle(this.engine, 'opacity', enginePower);
    changeElementStyle(this.engine, 'scale', enginePower);
  }
}

export default EngineAnimation;
