const getElementPosition = (element) => {
  let elementBoundingClientRect = element.getBoundingClientRect();
  let position = {
    top: parseFloat(elementBoundingClientRect.top),
    left: parseFloat(elementBoundingClientRect.left),
  };
  return position;
};

export default getElementPosition;
