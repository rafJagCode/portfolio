const getElementTopRightCornerCoordinates = (element) => {
  const { x, y, width } = element.getBoundingClientRect();
  return { x: x + width, y: y };
};

export default getElementTopRightCornerCoordinates;
