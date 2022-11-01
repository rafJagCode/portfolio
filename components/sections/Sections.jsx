import ParticlesBackground from '@/components/particles_background/ParticlesBackground';
import ReactFullpage from '@fullpage/react-fullpage';
import styles from './Sections.module.scss';
import Home from '@/components/home/Home';
import Projects from '@/components/projects/Projects';
import Footer from '@/components/footer/Footer';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Sections() {
  const sidebarOpen = useSelector((state) => state.sidebarOpen);

  const handleHashChange = (e) => {
    fullpage_api.moveTo(`#${e.newURL.split('#')[1]}`);
  };

  useEffect(() => {
    addEventListener('hashchange', handleHashChange);
    return () => {
      removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    const anchor = `#${window.location.hash.substr(1)}`;
    if (anchor === '#home') return;
    fullpage_api.moveTo(anchor);
  }, []);

  useEffect(() => {
    if (sidebarOpen) {
      document.querySelector('#fullpage').style.filter = 'blur(5px)';
      document.querySelector('#fullpage').style.pointerEvents = 'none';
    } else {
      document.querySelector('#fullpage').style.filter = 'none';
      document.querySelector('#fullpage').style.pointerEvents = 'auto';
    }
  }, [sidebarOpen]);

  return [
    <ParticlesBackground key="particles" />,
    <ReactFullpage.Wrapper key="fullpage__wrapper">
      <section className="section">
        <div className={styles.section__container}>
          <Home />
        </div>
      </section>
      <section className="section">
        <div className={styles.section__container}>
          <Projects />
        </div>
      </section>
      <section className="section">
        <div className={styles.section__container}></div>
      </section>
      <section className="section">
        <div
          className={styles.section__container}
          data-is-last="true"
        ></div>
        <Footer />
      </section>
    </ReactFullpage.Wrapper>,
  ];
}
