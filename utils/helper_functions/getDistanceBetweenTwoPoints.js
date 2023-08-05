const calculateDistanceBetweenTwoPoints = (point1, point2) => {
  const deltaX = point1.x - point2.x;
  const deltaY = point1.y - point2.y;
  return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
};

export default calculateDistanceBetweenTwoPoints;
