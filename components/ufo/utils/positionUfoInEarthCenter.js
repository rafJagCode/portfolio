const positionUfoInEarthCenter = (ufoHelper, earthHelper) => {
  const [earthMiddleX, earthMiddleY] = earthHelper.getEarthMiddlePosition();
  const [ufoMiddleX, ufoMiddleY] = ufoHelper.getUfoMiddlePosition();
  const moveX = earthMiddleX - ufoMiddleX;
  const moveY = earthMiddleY - ufoMiddleY;
  ufoHelper.moveUfoHorizontally(moveX);
  ufoHelper.moveUfoVertically(moveY);
};

export default positionUfoInEarthCenter;
