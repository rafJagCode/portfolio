import { useState, useEffect } from 'react';

const images = [
  'bullet-empty.svg',
  'bullet-full.svg',
  'cow1.svg',
  'cow2.svg',
  'cow3.svg',
  'crosshair.svg',
  'empty-ufo-life.svg',
  'engine.svg',
  'floating-island.svg',
  'full-ufo-life.svg',
  'laser.svg',
  'planet-earth.svg',
  'satellite.svg',
  'signal.svg',
  'terminal.svg',
  'ufo-beam.svg',
  'ufo.svg',
  'asteroids/asteroid-bit-1.svg',
  'asteroids/asteroid-bit-2.svg',
  'asteroids/asteroid-bit-3.svg',
  'asteroids/asteroid-bit-4.svg',
  'asteroids/asteroid-bit-5.svg',
  'asteroids/asteroid-bit-6.svg',
  'asteroids/asteroid-bit-7.svg',
  'asteroids/asteroid-bit-8.svg',
  'asteroids/asteroid-bit-9.svg',
  'asteroids/asteroid-fragment-1.svg',
  'asteroids/asteroid-fragment-2.svg',
  'asteroids/asteroid-fragment-3.svg',
  'asteroids/asteroid-fragment-4.svg',
  'asteroids/asteroid-fragment-5.svg',
  'asteroids/asteroid-fragment-6.svg',
  'asteroids/asteroid-fragment-7.svg',
  'asteroids/asteroid-fragment-8.svg',
  'asteroids/asteroid-fragment-9.svg',
  'asteroids/asteroid-whole-1.svg',
  'asteroids/asteroid-whole-2.svg',
  'asteroids/asteroid-whole-3.svg',
  'asteroids/asteroid-whole-4.svg',
  'asteroids/asteroid-whole-5.svg',
  'asteroids/asteroid-whole-6.svg',
  'asteroids/asteroid-whole-7.svg',
  'asteroids/asteroid-whole-8.svg',
  'asteroids/asteroid-whole-9.svg',
  'explosions/asteroid-explosion-sequence.png',
  'explosions/laser-explosion-sequence.png',
  'explosions/ufo-damage-sequence.png',
  'game_results/GAME_LOST-en.svg',
  'game_results/GAME_LOST-pl.svg',
  'game_results/GAME_WON-en.svg',
  'game_results/GAME_WON-pl.svg',
  'keys/aim-key.svg',
  'keys/move-key.svg',
  'keys/spacebar-key.svg',
  'technologies/css-icon.svg',
  'technologies/git-icon.svg',
  'technologies/html-icon.svg',
  'technologies/javascript-icon.svg',
  'technologies/laravel-icon.svg',
  'technologies/mysql-icon.svg',
  'technologies/nodejs-icon.svg',
  'technologies/react-icon.svg',
  'technologies/symfony-icon.svg',
  'technologies/vue-icon.svg',
  'touch_keys/touch-down.svg',
  'touch_keys/touch-fire.svg',
  'touch_keys/touch-left.svg',
  'touch_keys/touch-right.svg',
  'touch_keys/touch-rotate-left.svg',
  'touch_keys/touch-rotate-right.svg',
  'touch_keys/touch-up.svg',
];

const useImagePreloading = () => {
  const [imagesReady, setImagesReady] = useState(false);
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [progress, setProgress] = useState(0);

  const loadImage = (path) => {
    const [dir, name] = path.split('/');
    setCurrentImage((name ?? path).toUpperCase());
    let resolve;
    const promise = new Promise((res) => (resolve = res));
    const image = new Image();
    image.src = `/static/images/${path}`;
    image.onload = resolve;
    return promise;
  };

  const loadImages = async () => {
    for (let i = 0; i < images.length; i++) {
      await loadImage(images[i]);
      setProgress((i + 1) / images.length);
    }
    setImagesReady(true);
  };

  useEffect(() => {
    loadImages();
  }, []);

  return { imagesReady, progress, currentImage };
};

export default useImagePreloading;
