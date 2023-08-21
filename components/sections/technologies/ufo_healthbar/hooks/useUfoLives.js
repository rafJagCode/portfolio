import actions from 'redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const useUfoLives = () => {
  const dispatch = useDispatch();
  const ufoHits = useSelector((state) => state.ufoHits);
  const ufoLives = useSelector((state) => state.ufoLives);

  const getEmptyLives = () => {
    return ufoLives.reduce((acc, curr) => (curr === 'empty' ? acc + 1 : acc), 0);
  };

  useEffect(() => {
    if (ufoHits.length > getEmptyLives()) dispatch(actions.loseLife());
  }, [ufoHits]);

  return ufoLives;
};

export default useUfoLives;
