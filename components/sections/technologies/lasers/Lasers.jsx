import Laser from './laser/Laser';
import uuid from 'react-uuid';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function Lasers() {
  const spaceKeyPressed = useSelector((state) => state.keys[' '].pressed);
  const [lasers, setLasers] = useState([]);

  useEffect(() => {
    if (!spaceKeyPressed) return;
    addLaser();
  }, [spaceKeyPressed]);

  const addLaser = () => {
    setLasers((lasers) => [...lasers, { id: uuid() }]);
  };

  const removeLaser = (id) => {
    setLasers((lasers) => lasers.filter((laser) => laser.id !== id));
  };

  return (
    <>
      {/* <div id='laser_test' style={{ position: 'absolute', width: '2px', height: '2px', background: 'green' }}></div> */}
      {lasers.map((laser) => (
        <Laser key={laser.id} id={laser.id} removeLaser={removeLaser} />
      ))}
    </>
  );
}
