const resizeUfoComponent = (ufoContainer, ufoComponent) => {
  const ufoContainerDimensions = getUfoContainerDimensions(ufoContainer);
  const ufoComponentResizedValues = getUfoComponentResizedValues(ufoContainerDimensions);
  assignResizedStyleValues(ufoComponent, ufoComponentResizedValues);
};

const getUfoContainerDimensions = (ufoContainer) => {
  const ufoContainerBoundingClientRect = ufoContainer.getBoundingClientRect();
  return {
    width: parseFloat(ufoContainerBoundingClientRect.width),
    top: parseFloat(ufoContainerBoundingClientRect.top),
    left: parseFloat(ufoContainerBoundingClientRect.left),
  };
};

const getUfoComponentResizedValues = (ufoContainerDimensions) => {
  const homeSection = document.getElementById('home');
  const homeSectionTop = -1 * parseFloat(homeSection.getBoundingClientRect().top);

  const width = ufoContainerDimensions.width;
  const top = ((homeSectionTop + ufoContainerDimensions.top) / window.innerHeight) * 100;
  const left = (ufoContainerDimensions.left / window.innerWidth) * 100;

  return {
    width: width,
    top: top,
    left: left,
  };
};

const assignResizedStyleValues = (ufoComponent, ufoComponentResizedValues) => {
  ufoComponent.current.style.width = ufoComponentResizedValues.width + 'px';
  ufoComponent.current.style.top = ufoComponentResizedValues.top + '%';
  ufoComponent.current.style.left = ufoComponentResizedValues.left + '%';
};

export default resizeUfoComponent;
