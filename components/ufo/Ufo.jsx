import styles from "./Ufo.module.scss";
import { useEffect, useRef } from "react";

export default function Ufo({ isVisible }) {
  const ufoComponent = useRef();

  const ufoContainerObserver = new ResizeObserver((entries) => {
    const fireSizeFactor = 1 + 0.6;
    const ufoContainer = entries[0];
    const ufoContainerBoundingClientRect = ufoContainer.target.getBoundingClientRect();
    const ufoWidth = ufoContainerBoundingClientRect.width + "px";
    const ufoHeight = ufoContainerBoundingClientRect.height * fireSizeFactor + "px";
    const topInPercents = (parseFloat(ufoContainerBoundingClientRect.top) / window.innerHeight) * 100;
    const leftInPercents = (parseFloat(ufoContainerBoundingClientRect.left) / window.innerWidth) * 100;
    ufoComponent.current.style.top = topInPercents + "%";
    ufoComponent.current.style.left = leftInPercents + "%";

    ufoComponent.current.style.width = ufoWidth;
    ufoComponent.current.style.height = ufoHeight;
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
