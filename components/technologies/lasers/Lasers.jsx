import Laser from './Laser';
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
    setLasers((lasers) => [...lasers, { id: performance.now() * Math.floor(Math.random() * 1000) }]);
  };

  const removeLaser = (id) => {
    setLasers((lasers) => lasers.filter((laser) => laser.id !== id));
  };

  return (
    <div>
      {lasers.map((laser) => (
        <Laser
          key={laser.id}
          id={laser.id}
          removeLaser={removeLaser}
        />
      ))}
    </div>
  );
}
