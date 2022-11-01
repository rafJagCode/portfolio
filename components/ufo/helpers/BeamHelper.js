class BeamHelper {
  #beam;

  constructor(beamRef) {
    this.#beam = beamRef.current;
  }

  changeBeamWidth(width) {
    this.#beam.style.width = `${width}px`;
  }

  changeBeamHeight(height) {
    this.#beam.style.height = `${height}px`;
  }

  changeBeamOpacity(opacity) {
    this.#beam.style.opacity = `${opacity}`;
  }
}

export default BeamHelper;
