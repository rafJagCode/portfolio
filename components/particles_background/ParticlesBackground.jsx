import styles from './ParticlesBackground.module.scss';
import particlesConfig from './particles_config';
import Particles from 'react-tsparticles';
import { memo } from 'react';

const ParticlesBackground = memo(() => {
  const particlesInit = (main) => {};

  return <Particles params={particlesConfig} className={styles.particles} init={particlesInit} />;
});

export default ParticlesBackground;
