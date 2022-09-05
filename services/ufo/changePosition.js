const changePosition = (element, top, left) => {
  let newPosition = getCalculatedPosition(top, left);
  element.style.top = `${newPosition.top}%`;
  element.style.left = `${newPosition.left}%`;
};

const getCalculatedPosition = (top, left) => {
  let activeSectionIndex = fullpage_api.getActiveSection().index;
  const distanceToDocumentTop = activeSectionIndex * window.innerHeight;

  const newTop = ((distanceToDocumentTop + top) / window.innerHeight) * 100;
  const newLeft = (left / window.innerWidth) * 100;

  return {
    top: newTop,
    left: newLeft,
  };
};

export default changePosition;
