const changeElementStyle = (element, property, value) => {
  switch (property) {
    case 'centerPosition': {
      element.style.left = `${value.x - element.offsetWidth / 2}px`;
      element.style.top = `${value.y - element.offsetHeight / 2}px`;
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
    default: {
      return;
    }
  }
};

export default changeElementStyle;
