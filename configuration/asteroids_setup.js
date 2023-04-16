import Asteroid from '@/components/technologies/asteroid/utils/AsteroidClass';

const asteroids = [
  new Asteroid('asteroid-whole-1', { x: 900, y: 200 }, 'git'),
  new Asteroid('asteroid-whole-2', { x: 100, y: 400 }, 'react'),
  //   new Asteroid('asteroid-whole-3', { x: 600, y: 100 }),
  //   new Asteroid('asteroid-fragment-1', { x: 100, y: 800 }),
  //   new Asteroid('asteroid-fragment-2', { x: 200, y: 800 }),
  //   new Asteroid('asteroid-bit-1', { x: 600, y: 700 }),
  //   new Asteroid('asteroid-bit-2', { x: 700, y: 700 }),
];

export default asteroids;
