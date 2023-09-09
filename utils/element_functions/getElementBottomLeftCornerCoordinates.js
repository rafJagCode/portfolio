const getElementBottomLeftCornerCoordinates = (element) => {
  const { x, y, height } = element.getBoundingClientRect();
  return { x: x, y: y + height };
};

export default getElementBottomLeftCornerCoordinates;
