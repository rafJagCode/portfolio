import { useSelector } from 'react-redux';

export const useGoToStart = () => {
  const earthRef = useSelector((state) => state.globalRefs.earth);
  const ufoRef = useSelector((state) => state.globalRefs.ufo);

  const goToStart = () => {
    let xMiddle = earthRef.current.offsetLeft + earthRef.current.offsetWidth / 2 - ufoRef.current.offsetWidth / 2;
    let yMiddle = earthRef.current.offsetTop + earthRef.current.offsetHeight / 2 - ufoRef.current.offsetHeight / 2;
    ufoRef.current.style.left = `${xMiddle}px`;
    ufoRef.current.style.top = `${yMiddle}px`;
    ufoRef.current.style.visibility = 'visible';
  };

  return goToStart;
};
