import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const useUfoLives = () => {
  const startingLives = 5;
  const [currentLives, setCurrentLives] = useState();
  const ufoHits = useSelector((state) => state.ufoHits);
  const life = (index, lifeState) => {
    return {
      index: index,
      state: lifeState,
    };
  };

  const resetLives = () => {
    let lifes = [];
    for (let i = 0; i < startingLives; i++) {
      lifes = [...lifes, life(i, 'FULL')];
    }
    setCurrentLives(lifes);
  };

  const changeLifeToEmpty = () => {
    let lifesChanged = 0;
    const lifes = currentLives.map((life) => {
      if (life.state === 'FULL' && !lifesChanged) {
        life.state = 'EMPTY';
        lifesChanged++;
      }
      return life;
    });
    setCurrentLives(lifes);
  };

  useEffect(() => {
    if (!ufoHits) return;
    if (!ufoHits.length) return resetLives();
    if (startingLives - ufoHits.length === currentLives.length) return;
    changeLifeToEmpty();
  }, [ufoHits]);

  return currentLives;
};

export default useUfoLives;
