import Particles from "react-tsparticles";
import particlesConfig from './particles_config';

export default function ParticlesBackground({className}) {
	const particlesLoaded = (container) => {
	};
	return (
		<Particles params={particlesConfig} className={className} loaded={particlesLoaded}/>
	)
}
