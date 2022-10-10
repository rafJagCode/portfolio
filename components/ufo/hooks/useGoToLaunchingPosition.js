import useGetLaunchingPosition from './useGetLaunchingPosition';

const useGoToLaunchingPosition = () => {
  const [xPos, yPos] = useGetLaunchingPosition();

  const goToLaunchingPosition = () => {
    console.log(xPos, yPos);
  };

  return [goToLaunchingPosition];
};

export default useGoToLaunchingPosition;
