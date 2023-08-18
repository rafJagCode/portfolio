const getElementCenterCoordinates = (element) => {
  return { x: element.offsetLeft + element.offsetWidth / 2, y: element.offsetTop + element.offsetHeight / 2 };
};

export default getElementCenterCoordinates;
