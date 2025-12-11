/**
 * Progress Bar Block - View Script (Frontend Animation)
 */

document.addEventListener('DOMContentLoaded', function() {
	const progressBars = document.querySelectorAll('.mgb-progress-bar');

	if (!progressBars.length) {
		return;
	}

	// Animate progress bar
	const animateProgressBar = (progressBar) => {
		const fill = progressBar.querySelector('.mgb-progress-bar-fill');
		const percentageAbove = progressBar.querySelector('.mgb-progress-bar-percentage-above .mgb-progress-bar-percentage');
		
		if (!fill || fill.dataset.animated === 'true') {
			return;
		}

		const targetWidth = fill.dataset.width || progressBar.dataset.percentage || 0;
		const duration = parseInt(progressBar.dataset.duration, 10) || 1500;

		fill.dataset.animated = 'true';

		// Set initial state - force 0 width to start animation
		fill.style.width = '0%';
		fill.style.transition = 'none';
		
		// Position percentage above at 0 initially
		if (percentageAbove) {
			percentageAbove.style.left = '0%';
			percentageAbove.style.transition = 'none';
		}

		// Force reflow to apply initial state
		fill.offsetHeight;

		// Re-enable transition and set target width
		requestAnimationFrame(() => {
			fill.style.transition = `width ${duration}ms ease-out`;
			fill.style.width = `${targetWidth}%`;
			
			// Position the "above" percentage if present
			if (percentageAbove) {
				percentageAbove.style.transition = `left ${duration}ms ease-out`;
				percentageAbove.style.left = `${targetWidth}%`;
			}
		});
	};

	// Intersection Observer for triggering animation when visible
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					animateProgressBar(entry.target);
					observer.unobserve(entry.target);
				}
			});
		},
		{
			threshold: 0.3,
			rootMargin: '0px 0px -50px 0px',
		}
	);

	progressBars.forEach((progressBar) => {
		observer.observe(progressBar);
	});
});
