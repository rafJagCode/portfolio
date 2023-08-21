const changeElementStyle = (element, property, value, useOffset = false) => {
  switch (property) {
    case 'centerPosition': {
      const windowWidth = window.innerWidth || document.documentElement.clientWidth;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const elementWidth = useOffset ? element.offsetWidth : element.getBoundingClientRect().width;
      const elementHeight = useOffset ? element.offsetHeight : element.getBoundingClientRect().height;
      const x = value.x - elementWidth / 2;
      const y = value.y - elementHeight / 2;
      const xInProcents = (x / windowWidth) * 100;
      const yInProcents = (y / windowHeight) * 100;
      element.style.left = `${xInProcents}%`;
      element.style.top = `${yInProcents}%`;
      return;
    }
    case 'scale': {
      element.style.transform = `scale(${value})`;
      return;
    }
    case 'zIndex': {
      element.style.zIndex = value;
      return;
    }
    case 'visibility': {
      element.style.visibility = value ? 'visible' : 'hidden';
      return;
    }
    case 'opacity': {
      element.style.opacity = value;
      return;
    }
    case 'translateY': {
      element.style.transform = `translateY(${value}%)`;
      return;
    }
    case 'rotate': {
      element.style.transform = `rotate(${value}rad)`;
      return;
    }
    default: {
      return;
    }
  }
};

export default changeElementStyle;
