import Asteroid from '@/components/sections/technologies/asteroid/utils/AsteroidClass';

const asteroids = [
  new Asteroid('asteroid-whole-1', { x: '10%', y: '10%' }, ['html', 'javascript']),
  new Asteroid('asteroid-whole-2', { x: '27%', y: '58%' }, ['react', 'vue']),
  new Asteroid('asteroid-whole-3', { x: '22%', y: '22%' }, ['git', 'github']),
  new Asteroid('asteroid-whole-4', { x: '15%', y: '45%' }, ['npm', 'webpack']),
  new Asteroid('asteroid-whole-5', { x: '5%', y: '70%' }, ['css', 'sass']),
];

export default asteroids;
