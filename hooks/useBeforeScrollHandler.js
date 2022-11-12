import useCowAnimations from '@/hooks/useCowAnimations';
import { useDispatch } from 'react-redux';

const useBeforeScrollHandler = (engineAnimation, orbitingAnimation, updateState) => {
  const stopCowAbduction = useCowAnimations();
  const dispatch = useDispatch();

  const handleAnimationsBeforeScroll = (origin) => {
    if (origin.anchor === '#home') handleLeavingHomeSection();
    if (origin.anchor === '#projects') handleLeavingProjectsSection();
    if (origin.anchor === '#technologies') handleLeavingTechnologiesSection();
    if (origin.anchor === '#contact') handleLeavingContactSection();
  };

  const handleLeavingHomeSection = async () => {
    engineAnimation.startAnimation();
    await orbitingAnimation.stopAnimation();
    updateState('ALLOW_SCROLL');
  };

  const handleLeavingProjectsSection = async () => {
    await stopCowAbduction();
    engineAnimation.startAnimation();
    updateState('ALLOW_SCROLL');
    dispatch({ type: 'CLEAR_TERMINAL' });
  };

  const handleLeavingTechnologiesSection = async () => {
    engineAnimation.startAnimation();
    updateState('ALLOW_SCROLL');
  };

  const handleLeavingContactSection = async () => {
    engineAnimation.startAnimation();
    updateState('ALLOW_SCROLL');
  };

  return handleAnimationsBeforeScroll;
};

export default useBeforeScrollHandler;
