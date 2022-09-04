const startUfoEngine = () => {
	const ufoFire = document.getElementById('ufo__fire');
	ufoFire.animate({
		opacity: [0, 0.7]
	},
	{
		duration: 500,
		iterations: 1,
		fill: 'forwards'
	}).onfinish = () =>{
		ufoFire.animate({
			opacity: [0.7, 0.8, 0.9, 0.7, 0.8, 1, 0.8, 0.7]
		},
		{
			duration: 1000,
			iterations: Infinity,
		})
	}
}

export default startUfoEngine;