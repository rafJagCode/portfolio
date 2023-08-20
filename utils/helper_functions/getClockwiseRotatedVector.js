const clockwiseRotatedVector = (vector, angle) => {
  const x = vector.x * Math.cos(angle) + vector.y * Math.sin(angle);
  const y = vector.x * -Math.sin(angle) + vector.y * Math.cos(angle);
  return { x, y };
};

export default clockwiseRotatedVector;
