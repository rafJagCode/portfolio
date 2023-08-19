import Laser from './laser/Laser';
import uuid from 'react-uuid';
import actions from 'redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

export default function Lasers() {
  const dispatch = useDispatch();
  const spaceKeyPressed = useSelector((state) => state.keys[' '].pressed);
  const ammunition = useSelector((state) => state.ammunition);
  const [lasers, setLasers] = useState([]);

  const getFullBullets = () => {
    return ammunition.reduce((acc, curr) => (curr === 'full' ? acc + 1 : acc), 0);
  };

  useEffect(() => {
    if (!spaceKeyPressed) return;
    if (!getFullBullets()) return;
    addLaser();
    dispatch(actions.decreaseAmmunition());
  }, [spaceKeyPressed]);

  const addLaser = () => {
    setLasers((lasers) => [...lasers, { id: uuid() }]);
  };

  const removeLaser = (id) => {
    setLasers((lasers) => lasers.filter((laser) => laser.id !== id));
  };

  return (
    <>
      {lasers.map((laser) => (
        <Laser key={laser.id} id={laser.id} removeLaser={removeLaser} />
      ))}
    </>
  );
}
