const swapOrbitingUfoToUfoComponent = (ufoContainer) => {
	const fireSizeFactor = 1 + 0.6;
	const ufoComponent = document.getElementById('ufo');
	const ufoContainerBoundingClientRect  = ufoContainer.getBoundingClientRect();
	ufoComponent.style.top = ufoContainerBoundingClientRect.top + 'px';
	ufoComponent.style.left = ufoContainerBoundingClientRect.left + 'px';
	ufoComponent.style.height = parseFloat(ufoContainerBoundingClientRect.height) * fireSizeFactor + 'px';
	ufoComponent.style.width = ufoContainerBoundingClientRect.width + 'px';
	ufoContainer.style.visibility = 'hidden';
}

export default swapOrbitingUfoToUfoComponent;