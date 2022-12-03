import uuid from 'react-uuid';

const getExplosionCenterPosition = (position, size) => {
  const explosionCenterPosition = { x: position.x - size / 2, y: position.y - size / 2 };
  return explosionCenterPosition;
};

class Explosion {
  explosionID;
  imageName;
  position;
  size;
  framesAmount;

  constructor(imageName, position, size, framesAmount) {
    this.explosionID = uuid();
    this.imageName = imageName;
    this.position = position;
    this.size = size;
    this.framesAmount = framesAmount;
  }
}

class LaserExplosion extends Explosion {
  constructor(position) {
    const size = 50;
    const framesAmount = 7;
    const explosionCenterPosition = getExplosionCenterPosition(position, size);
    super('explosion-sequence', explosionCenterPosition, size, framesAmount);
  }
}

class AsteroidExplosion extends Explosion {
  constructor(position) {
    const size = 200;
    const framesAmount = 6;
    const explosionCenterPosition = getExplosionCenterPosition(position, size);
    super('asteroid_explosion', explosionCenterPosition, size, framesAmount);
  }
}

export { LaserExplosion, AsteroidExplosion };
