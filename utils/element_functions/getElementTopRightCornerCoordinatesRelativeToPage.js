const getElementTopRightCornerCoordinatesRelativeToPage = (element) => {
  const { y: rootY } = document.getElementById('fullpage').getBoundingClientRect();
  const { x: elementX, y: elementY, width: elementWidth } = element.getBoundingClientRect();
  const x = elementX + elementWidth;
  const y = Math.abs(rootY - elementY);
  return { x, y };
};

export default getElementTopRightCornerCoordinatesRelativeToPage;
