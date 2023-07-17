import getElementCenterCoordinates from '@/utils/getElementCenterCoordinates';
import getAngleBetweenTwoPoints from '@/utils/getAngleBetweenTwoPoints';
import changeElementStyle from '@/utils/changeElementStyle';

const moveElementTowardsCoordinates = (element1, coordinates, distance) => {
  const center1 = getElementCenterCoordinates(element1);
  const deltaX = Math.abs(center1.x - coordinates.x);
  const deltaY = Math.abs(center1.y - coordinates.y);
  const angle = getAngleBetweenTwoPoints(center1, coordinates);
  const moveX = distance * Math.cos(angle);
  const moveY = distance * Math.sin(angle);
  const shiftX = moveX > deltaX ? deltaX : moveX;
  const shiftY = moveY > deltaY ? deltaY : moveY;
  const newPos = { x: center1.x + shiftX, y: center1.y + shiftY };
  changeElementStyle(element1, 'centerPosition', newPos);
};

export default moveElementTowardsCoordinates;
