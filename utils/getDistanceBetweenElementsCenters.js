import getElementCenterCoordinates from '@/utils/getElementCenterCoordinates';
import calculateDistanceBetweenTwoPoints from '@/utils/calculateDistanceBetweenTwoPoints';

const getDistanceBetweenElementsCenters = (element1, element2) => {
  const center1 = getElementCenterCoordinates(element1);
  const center2 = getElementCenterCoordinates(element2);
  return calculateDistanceBetweenTwoPoints(center1, center2);
};

export default getDistanceBetweenElementsCenters;
