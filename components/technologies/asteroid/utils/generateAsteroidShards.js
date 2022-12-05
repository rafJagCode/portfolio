import images_collision_data from '@/configuration/images_collision_data';
import Asteroid from '@/components/technologies/asteroid/utils/AsteroidClass';
import getRandomFromArray from '@/utils/getRandomFromArray';

const getAsteroidBits = () => {
  const bits = Object.keys(images_collision_data).filter((imageName) => {
    const [prefix, asteroidKind, number] = imageName.split('-');
    return asteroidKind === 'bit';
  });
  return bits;
};

const getAsteroidFragments = () => {
  const fragments = Object.keys(images_collision_data).filter((imageName) => {
    const [prefix, asteroidKind, number] = imageName.split('-');
    return asteroidKind === 'fragment';
  });
  return fragments;
};

const getRandomShards = () => {
  const bits = getAsteroidBits();
  const fragments = getAsteroidFragments();
  const randomBits = getRandomFromArray(bits, 4);
  const randomFragments = getRandomFromArray(fragments, 2);
  const randomShards = [...randomBits, ...randomFragments];
  return randomShards;
};

const generateAsteroidShards = (position) => {
  const randomShards = getRandomShards();
  const asteroidShards = randomShards.map((shard) => new Asteroid(shard, position));
  return asteroidShards;
};

export default generateAsteroidShards;
