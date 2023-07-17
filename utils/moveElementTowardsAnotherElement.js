import getElementCenterCoordinates from '@/utils/getElementCenterCoordinates';
import getAngleBetweenTwoPoints from '@/utils/getAngleBetweenTwoPoints';
import changeElementStyle from '@/utils/changeElementStyle';

const moveElementTowardsAnotherElement = (element1, element2, distance) => {
  const center1 = getElementCenterCoordinates(element1);
  const center2 = getElementCenterCoordinates(element2);
  const deltaX = Math.abs(center1.x - center2.x);
  const deltaY = Math.abs(center1.y - center2.y);
  const angle = getAngleBetweenTwoPoints(center1, center2);
  const moveX = distance * Math.cos(angle);
  const moveY = distance * Math.sin(angle);
  const shiftX = moveX > deltaX ? deltaX : moveX;
  const shiftY = moveY > deltaY ? deltaY : moveY;
  const newPos = { x: center1.x + shiftX, y: center1.y + shiftY };
  changeElementStyle(element1, 'centerPosition', newPos);
};

export default moveElementTowardsAnotherElement;
