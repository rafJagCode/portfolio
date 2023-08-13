import getRandomInRange from '@/utils/helper_functions/getRandomInRange';
import styles from './ParticlesBackground.module.scss';
import { useEffect, useState, useRef } from 'react';
import clamp from '@/utils/helper_functions/clamp';

export default function ParticlesBackground() {
  const particlesDensity = 0.0005;
  const blinkInterval = 1000;
  const minOpacity = 0.2;
  const maxOpacity = 1;
  const radiusChange = 0.5;
  const opacityChange = 0.2;
  const [particles, setParticles] = useState([]);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  const init = () => {
    const particles = [];
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth || document.documentElement.clientWidth;
    canvas.height = window.innerHeight || document.documentElement.clientHeight;
    const particlesAmount = Math.round(canvas.width * canvas.height * particlesDensity);
    for (let i = 0; i < particlesAmount; i++) {
      particles.push({ x: Math.random(), y: Math.random(), radius: getRandomInRange(1, 3), opacity: getRandomInRange(minOpacity, maxOpacity) });
    }
    setParticles(particles);
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      const particlePos = { x: particle.x * canvas.width, y: particle.y * canvas.height };
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${particle.opacity})`;
      ctx.moveTo(particlePos.x, particlePos.y);
      ctx.arc(particlePos.x, particlePos.y, particle.radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    });
  };

  const blink = () => {
    setParticles((particles) => {
      return particles.map((particle) => {
        const newRadius = clamp(particle.radius + getRandomInRange(-radiusChange, radiusChange), 1, 3);
        const newOpacity = clamp(particle.opacity + getRandomInRange(-opacityChange, opacityChange), minOpacity, maxOpacity);
        return { ...particle, radius: newRadius, opacity: newOpacity };
      });
    });
  };

  useEffect(() => {
    init();
    window.addEventListener('resize', draw);
    if (intervalRef.current) return;
    intervalRef.current = setInterval(blink, blinkInterval);
    () => {
      window.removeEventListener('resize', draw);
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    draw();
  }, [particles]);

  return <canvas className={styles.container} ref={canvasRef}></canvas>;
}
