const getAngleBetweenTwoPoints = (point1, point2) => {
  let angle = Math.atan2(point2.y - point1.y, point2.x - point1.x);
  if (angle < 0) angle += 2 * Math.PI;
  return angle;
};

export default getAngleBetweenTwoPoints;
