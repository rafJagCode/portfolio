import { useSelector } from 'react-redux';

const useGetRefs = () => {
  const earthRef = useSelector((state) => state.globalRefs.earth);
  const ufoRef = useSelector((state) => state.globalRefs.ufo);

  return [earthRef, ufoRef];
};

export default useGetRefs;
