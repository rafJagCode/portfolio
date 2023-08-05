const getTranslateY = (element) => {
  const matchArray = element.style.transform.match(/translateY\((-?[0-9]+).{1,2}\)/);
  if (!matchArray) return 0;
  return parseInt(matchArray[1]);
};

export default getTranslateY;
