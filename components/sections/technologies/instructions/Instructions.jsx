import Key from './key/Key';

export default function Instructions() {
  const keys = [
    { name: 'spacebar', description: 'CLICK SPACEBAR TO SHOOT' },
    { name: 'move', description: 'STEER USING WASD KEYS' },
    { name: 'aim', description: 'USE ARROWS TO AIM' },
  ];
  return (
    <div>
      {keys.map((key) => (
        <Key key={key.name} keyName={key.name} keyDescription={key.description} />
      ))}
    </div>
  );
}
