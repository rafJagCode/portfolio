const swapOrbitingUfoToUfoComponent = (ufoContainer) => {
  const fireSizeFactor = 1 + 0.6;
  const ufoComponent = document.getElementById("ufo");
  const ufoContainerBoundingClientRect = ufoContainer.getBoundingClientRect();
  const topInPercents = (parseFloat(ufoContainerBoundingClientRect.top) / window.innerHeight) * 100;
  const leftInPercents = (parseFloat(ufoContainerBoundingClientRect.left) / window.innerWidth) * 100;
  ufoComponent.style.top = topInPercents + "%";
  ufoComponent.style.left = leftInPercents + "%";
  ufoComponent.style.height = parseFloat(ufoContainerBoundingClientRect.height) * fireSizeFactor + "px";
  ufoComponent.style.width = ufoContainerBoundingClientRect.width + "px";
  ufoContainer.style.visibility = "hidden";
};

export default swapOrbitingUfoToUfoComponent;
