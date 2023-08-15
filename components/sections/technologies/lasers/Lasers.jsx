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

  useEffect(() => {
    if (!spaceKeyPressed) return;
    if (!ammunition) return;
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
