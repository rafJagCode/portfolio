const getAngleBetweenTwoPoints = (point1, point2) => {
  return Math.atan2(point2.y - point1.y, point2.x - point1.x);
};

export default getAngleBetweenTwoPoints;
