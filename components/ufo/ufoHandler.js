export const goToStart = (ufoElement, earthElement) => {
  let xMiddle = earthElement.offsetLeft + earthElement.offsetWidth / 2 - ufoElement.offsetWidth / 2;
  let yMiddle = earthElement.offsetTop + earthElement.offsetHeight / 2 - ufoElement.offsetHeight / 2;
  ufoElement.style.left = `${xMiddle}px`;
  ufoElement.style.top = `${yMiddle}px`;
  ufoElement.style.visibility = 'visible';
};
