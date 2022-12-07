const positionUfoInEarthCenter = (ufoHelper, earthHelper) => {
  const [earthMiddleX, earthMiddleY] = earthHelper.getEarthMiddlePosition();
  ufoHelper.setUfoPosition(earthMiddleX, earthMiddleY);
};

export default positionUfoInEarthCenter;
