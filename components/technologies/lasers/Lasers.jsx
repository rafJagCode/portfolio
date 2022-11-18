import Laser from './Laser';
import { useState } from 'react';

export default function Lasers() {
  const [lasers, setLasers] = useState([]);
  const addLaser = () => {
    setLasers((lasers) => [...lasers, { id: performance.now() * Math.floor(Math.random() * 1000) }]);
  };

  const removeLaser = (id) => {
    setLasers((lasers) => lasers.filter((laser) => laser.id !== id));
  };

  return (
    <div>
      <button onClick={addLaser}>SHOOT</button>
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
