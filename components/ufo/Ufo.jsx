import styles from "./Ufo.module.scss";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function Ufo({ isVisible }) {
  const fullpageApi = useSelector((state) => state.fullpageApi);
  const ufoComponent = useRef();

  const ufoContainerObserver = new ResizeObserver((entries) => {
    const ufoContainer = entries[0];
    const ufoContainerBoundingClientRect = ufoContainer.target.getBoundingClientRect();
    const ufoWidth = ufoContainerBoundingClientRect.width + "px";
    const leftInPercents = (parseFloat(ufoContainerBoundingClientRect.left) / window.innerWidth) * 100;
    const activeSectionIndex = fullpageApi.getActiveSection().index;
    let topInPercents;
    if (!activeSectionIndex) {
      topInPercents = (parseFloat(ufoContainerBoundingClientRect.top) / window.innerHeight) * 100;
    } else {
      topInPercents = ((activeSectionIndex * window.innerHeight + parseFloat(ufoContainerBoundingClientRect.top)) / window.innerHeight) * 100;
    }

    ufoComponent.current.style.width = ufoWidth;
    ufoComponent.current.style.top = topInPercents + "%";
    ufoComponent.current.style.left = leftInPercents + "%";
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
