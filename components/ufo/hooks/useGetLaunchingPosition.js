import useGetRefs from './useGetRefs';

const useGetLaunchingPosition = () => {
  const [earthRef, ufoRef] = useGetRefs();
  if (!earthRef || !ufoRef) return [null, null];

  const earth = earthRef.current;
  const ufo = ufoRef.current;

  return calculatedLaunchingPosition(earth, ufo);
};

const calculatedLaunchingPosition = (earth, ufo) => {
  const xPos = earth.offsetLeft + earth.offsetWidth - ufo.offsetWidth / 2;
  const yPos = earth.offsetTop + ufo.offsetHeight / 2;

  return [xPos, yPos];
};

export default useGetLaunchingPosition;
