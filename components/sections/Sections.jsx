import ParticlesBackground from '@/components/particles_background/ParticlesBackground';
import ReactFullpage from '@fullpage/react-fullpage';
import styles from './Sections.module.scss';
import Home from './home/Home';
import Projects from './projects/Projects';
import Technologies from './technologies/Technologies';
import Contact from './contact/Contact';
import Footer from '@/components/footer/Footer';
import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

export default function Sections() {
  const isSidebarOpen = useSelector((state) => state.isSidebarOpen);

  const handleHashChange = useCallback((e) => {
    fullpage_api.moveTo(`#${e.newURL.split('#')[1]}`);
  }, []);

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
    if (isSidebarOpen) {
      document.querySelector('#fullpage').style.filter = 'blur(5px)';
      document.querySelector('#fullpage').style.pointerEvents = 'none';
    } else {
      document.querySelector('#fullpage').style.filter = 'none';
      document.querySelector('#fullpage').style.pointerEvents = 'auto';
    }
  }, [isSidebarOpen]);

  return [
    <ParticlesBackground key='particles' />,
    <ReactFullpage.Wrapper key='fullpage__wrapper'>
      <section className='section'>
        <div className={styles.section__container}>
          <Home />
        </div>
      </section>
      <section className='section'>
        <div className={styles.section__container}>
          <Projects />
        </div>
      </section>
      <section className='section'>
        <div className={styles.section__container}>
          <Technologies />
        </div>
      </section>
      <section className='section'>
        <div className={styles.section__container} data-is-last='true'>
          <Contact />
        </div>
        <Footer />
      </section>
    </ReactFullpage.Wrapper>,
  ];
}
