import styles from "./Ufo.module.scss";
import { useEffect, useRef } from "react";

export default function Ufo({ isVisible }) {
  const ufoComponent = useRef();

  const getUfoContainerDimensions = (ufoContainer) => {
    const ufoContainerBoundingClientRect = ufoContainer.getBoundingClientRect();
    return {
      width: parseFloat(ufoContainerBoundingClientRect.width),
      top: parseFloat(ufoContainerBoundingClientRect.top),
      left: parseFloat(ufoContainerBoundingClientRect.left),
    };
  };

  const getUfoComponentResizedValues = (ufoContainerDimensions) => {
    const homeSection = document.getElementById("home");
    const homeSectionTop = -1 * parseFloat(homeSection.getBoundingClientRect().top);

    const width = ufoContainerDimensions.width;
    const top = ((homeSectionTop + ufoContainerDimensions.top) / window.innerHeight) * 100;
    const left = (ufoContainerDimensions.left / window.innerWidth) * 100;

    return {
      width: width,
      top: top,
      left: left,
    };
  };

  const assignResizedStyleValues = (ufoComponentResizedValues) => {
    ufoComponent.current.style.width = ufoComponentResizedValues.width + "px";
    ufoComponent.current.style.top = ufoComponentResizedValues.top + "%";
    ufoComponent.current.style.left = ufoComponentResizedValues.left + "%";
  };

  const ufoContainerObserver = new ResizeObserver((entries) => {
    const ufoContainer = entries[0].target;
    const ufoContainerDimensions = getUfoContainerDimensions(ufoContainer);
    const ufoComponentResizedValues = getUfoComponentResizedValues(ufoContainerDimensions);
    assignResizedStyleValues(ufoComponentResizedValues);
  });

  useEffect(() => {
    const ufoContainer = document.getElementById("home__ufo_container");
    if (isVisible) ufoContainerObserver.observe(ufoContainer);
    else ufoContainerObserver.unobserve(ufoContainer);
  }, [isVisible]);

  return (
    <div className={styles.ufo} id="ufo" ref={ufoComponent}>
      <div className={styles.ufo__image}></div>
      <div className={styles.ufo__fire} id="ufo__fire"></div>
    </div>
  );
}
