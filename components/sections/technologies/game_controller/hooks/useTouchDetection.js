import { useEffect, useState } from 'react';

const useTouchDetection = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    let result = false;

    if (window.matchMedia && window.matchMedia('(any-pointer:coarse)').matches) {
      result = true;
    } else if (window.TouchEvent || 'ontouchstart' in window) {
      result = true;
    }

    setIsTouchDevice(result);
  }, []);
  return isTouchDevice;
};

export default useTouchDetection;
