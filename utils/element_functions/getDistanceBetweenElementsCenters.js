import getElementCenterCoordinates from './getElementCenterCoordinates';
import calculateDistanceBetweenTwoPoints from '@/utils/helper_functions/getDistanceBetweenTwoPoints';

const getDistanceBetweenElementsCenters = (element1, element2) => {
  const center1 = getElementCenterCoordinates(element1);
  const center2 = getElementCenterCoordinates(element2);
  return calculateDistanceBetweenTwoPoints(center1, center2);
};

export default getDistanceBetweenElementsCenters;
