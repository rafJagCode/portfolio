import actions from 'redux/actions';
import { useSelector, useDispatch } from 'react-redux';

const useExplosions = () => {
  const dispatch = useDispatch();
  const explosions = useSelector((state) => state.explosions);

  const removeExplosion = (explosionID) => {
    dispatch(actions.removeExplosion(explosionID));
  };

  return [explosions, removeExplosion];
};

export default useExplosions;
