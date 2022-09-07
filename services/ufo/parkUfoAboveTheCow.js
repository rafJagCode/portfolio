const parkUfoAboveTheCow = (ufoComponent, cow) => {
  let parkingCoordinates = getParkingCoordinates(ufoComponent, cow);
  animateUfoToParkingSpot(ufoComponent, parkingCoordinates);
};

const getParkingCoordinates = (ufoComponent, cow) => {
  let ufoWidth = parseFloat(ufoComponent.current.getBoundingClientRect().width);
  let cowLeft = parseFloat(cow.getBoundingClientRect().left);
  let cowWidth = parseFloat(cow.getBoundingClientRect().width);
  let leftInPercents = ((cowLeft + 0.5 * cowWidth - 0.5 * ufoWidth) / window.innerWidth) * 100;
  return `${leftInPercents}%`;
};

const animateUfoToParkingSpot = (ufoComponent, parkingCoordinates) => {
  ufoComponent.current.animate({ top: 0, left: parkingCoordinates }, { duration: 300, fill: 'forwards' });
};

export default parkUfoAboveTheCow;
