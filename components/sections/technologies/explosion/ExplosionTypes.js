import uuid from 'react-uuid';

const getExplosionCenterPosition = (position, size) => {
  const explosionCenterPosition = { x: position.x - size / 2, y: position.y - size / 2 };
  return explosionCenterPosition;
};

class Explosion {
  explosionID;
  constructor() {
    this.explosionID = uuid();
  }
}

class LaserExplosion extends Explosion {
  explosionKind = 'LASER_EXPLOSION';
  imageName = 'laser-explosion-sequence';
  size = 50;
  framesAmount = 7;
  position;

  constructor(position) {
    super();
    this.position = getExplosionCenterPosition(position, this.size);
  }
}

class AsteroidExplosion extends Explosion {
  explosionKind = 'ASTEROID_EXPLOSION';
  imageName = 'asteroid-explosion-sequence';
  size = 200;
  framesAmount = 6;
  postition;

  constructor(position) {
    super();
    this.position = getExplosionCenterPosition(position, this.size);
  }
}

class UfoDamage extends Explosion {
  explosionKind = 'UFO_DAMAGE';
  imageName = 'ufo-damage-sequence';
  size = 50;
  framesAmount = 7;
  position;

  constructor(position) {
    super();
    this.position = getExplosionCenterPosition(position, this.size);
  }
}

export { LaserExplosion, AsteroidExplosion, UfoDamage };
