const setPointerEventsState = (state) => {
  if (state) {
    document.querySelector('html').style.cursor = 'auto';
    document.querySelector('html').style.pointerEvents = 'auto';
  } else {
    document.querySelector('html').style.cursor = 'wait';
    document.querySelector('html').style.pointerEvents = 'none';
  }
};

export default setPointerEventsState;
