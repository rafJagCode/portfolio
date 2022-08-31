import styles from "./App.module.scss";
import Sidebar from "@/components/sidebar/Sidebar";
import Topbar from "@/components/topbar/Topbar";
import ReactFullpage from "@fullpage/react-fullpage";
import Sections from "@/components/sections/Sections";
import Ufo from "@/components/ufo/Ufo";
import handleLeavingHomeUfoAnimation from "@/services/ufo/handleLeavingHomeUfoAnimation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { defaultTranslation } from "@/translations/translations";

export default function App() {
  const sidebarOpen = useSelector((state) => state.sidebarOpen);
  const dispatch = useDispatch();
  const [isUfoComponentVisible, setIsUfoComponentVisible] = useState(false);

  useEffect(() => {
    const language = localStorage.getItem("language") ? localStorage.getItem("language") : defaultTranslation;
    dispatch({ type: "CHANGE_LANGUAGE", language: language });
  }, []);

  const onLeave = (origin, destination, direction) => {
    if (!isUfoComponentVisible) {
      handleLeavingHomeUfoAnimation().then(() => {
        setIsUfoComponentVisible(true);
        fullpage_api.moveTo(destination.anchor);
      });
      return false;
    }

    dispatch({
      type: "SET_SCROLLING_STATE",
      scrollState: { origin, destination, direction },
    });
  };

  return (
    <div className={styles.app__container}>
      <Sidebar />
      <Topbar />
      <main className={styles.app__content} data-is-blured={sidebarOpen}>
        <ReactFullpage
          licenseKey={`Ca(6HeW5q[zX%k*>A#'V%I@@k|5*QKt)s]k3HmOaAPWk}sQdFK('[p0:wkl3f=|Fo0%ijhruscuZC\SYLWQI`}
          scrollingSpeed={1000}
          dragAndMove={true}
          touchSensitivity={3}
          anchors={["#home", "#projects", "#technologies", "#contact"]}
          onLeave={onLeave}
          render={(state) => {
            return <Sections state={state} />;
          }}
        />
        <Ufo isVisible={isUfoComponentVisible} />
      </main>
    </div>
  );
}
