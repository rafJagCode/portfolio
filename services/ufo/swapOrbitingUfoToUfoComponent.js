const swapOrbitingUfoToUfoComponent = (ufoContainer) => {
  const ufoComponent = document.getElementById("ufo");
  const ufoContainerBoundingClientRect = ufoContainer.getBoundingClientRect();
  const topInPercents = (parseFloat(ufoContainerBoundingClientRect.top) / window.innerHeight) * 100;
  const leftInPercents = (parseFloat(ufoContainerBoundingClientRect.left) / window.innerWidth) * 100;

  ufoComponent.style.width = ufoContainerBoundingClientRect.width + "px";
  ufoComponent.style.top = topInPercents + "%";
  ufoComponent.style.left = leftInPercents + "%";
  ufoContainer.style.visibility = "hidden";
};

export default swapOrbitingUfoToUfoComponent;
