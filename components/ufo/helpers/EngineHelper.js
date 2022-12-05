class EngineHelper {
  engine;

  constructor(engineRef) {
    this.engine = engineRef.current;
  }

  changeOpacity(opacity) {
    this.engine.style.opacity = opacity;
  }

  changeScale(scale) {
    this.engine.style.transform = `translateY(70%) scale(${scale})`;
  }
}

export default EngineHelper;
