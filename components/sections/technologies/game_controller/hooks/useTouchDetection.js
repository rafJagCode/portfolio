import { useEffect, useState } from 'react';

const useTouchDetection = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    let isMobile = false;
    if ('msMaxTouchPoints' in navigator) {
      if (navigator !== null) {
        isMobile = navigator.msMaxTouchPoints > 0;
      }
    } else {
      const mQ = window.matchMedia && matchMedia('(pointer:coarse)');
      if (mQ && mQ.media === '(pointer:coarse)') {
        isMobile = !!mQ.matches;
      } else if ('orientation' in window) {
        isMobile = true;
      } else {
        const UA = navigator?.userAgent;
        isMobile = /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) || /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
      }
    }

    setIsTouchDevice(isMobile);
  }, []);
  return isTouchDevice;
};

export default useTouchDetection;
