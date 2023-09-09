import { useEffect, useState } from 'react';

const useTouchDetection = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    let result = false;
    if ('ontouchstart' in window || navigator.msMaxTouchPoints || navigator.maxTouchPoints) {
      result = true;
    }

    setIsTouchDevice(result);
  }, []);
  return isTouchDevice;
};

export default useTouchDetection;
