import Asteroid from '@/components/sections/technologies/asteroid/utils/AsteroidClass';

const asteroids = [
  new Asteroid('asteroid-whole-1', { x: '50%', y: '25%' }, ['html', 'javascript']),
  new Asteroid('asteroid-whole-2', { x: '5%', y: '50%' }, ['react', 'vue']),
  new Asteroid('asteroid-whole-3', { x: '40%', y: '70%' }, ['git', 'github']),
  new Asteroid('asteroid-whole-4', { x: '10%', y: '10%' }, ['npm', 'webpack']),
  new Asteroid('asteroid-whole-5', { x: '25%', y: '25%' }, ['css', 'sass']),
];

export default asteroids;
