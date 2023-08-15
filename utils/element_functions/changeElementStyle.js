const changeElementStyle = (element, property, value) => {
  switch (property) {
    case 'centerPosition': {
      const windowWidth = window.innerWidth || document.documentElement.clientWidth;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const x = value.x - element.offsetWidth / 2;
      const y = value.y - element.offsetHeight / 2;
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
