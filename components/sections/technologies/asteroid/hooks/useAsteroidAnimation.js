import imagesCollisionData from '@/configuration/images_collision_data';
import AsteroidAnimation from '../animations/AsteroidAnimation';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';

const useAsteroidAnimation = (asteroidData, startingSpeed, position, setPosition, asteroidID) => {
  const dispatch = useDispatch();
  const asteroidAnimationRef = useRef(null);
  const ufoPosition = useSelector((state) => state.ufoPosition);

  useEffect(() => {
    asteroidAnimationRef.current = new AsteroidAnimation(asteroidData, startingSpeed, position, setPosition, imagesCollisionData.ufo, ufoPosition, dispatch, asteroidID);
    asteroidAnimationRef.current.start();
    return () => {
      asteroidAnimationRef.current.stop();
    };
  }, []);

  useEffect(() => {
    asteroidAnimationRef.current.setUfoPosition(ufoPosition);
  }, [ufoPosition]);
};

export default useAsteroidAnimation;
