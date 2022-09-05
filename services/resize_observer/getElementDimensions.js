const getElementDimensions = (element) => {
  let elementBoundingClientRect = element.getBoundingClientRect();
  let dimensions = {
    width: parseFloat(elementBoundingClientRect.width),
    height: parseFloat(elementBoundingClientRect.height),
  };
  return dimensions;
};

export default getElementDimensions;
