/**
 * Counter Block - View Script (Frontend Animation)
 */

document.addEventListener('DOMContentLoaded', function() {
	const counters = document.querySelectorAll('.mgb-counter');

	if (!counters.length) {
		return;
	}

	// Format number with separator
	const formatNumber = (num, separator, decimals) => {
		const fixed = num.toFixed(decimals);
		if (separator) {
			const parts = fixed.split('.');
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
			return parts.join('.');
		}
		return fixed;
	};

	// Animate counter
	const animateCounter = (counter) => {
		const numberEl = counter.querySelector('.mgb-counter-number');
		if (!numberEl || numberEl.dataset.animated === 'true') {
			return;
		}

		const start = parseFloat(counter.dataset.start) || 0;
		const end = parseFloat(counter.dataset.end) || 0;
		const duration = parseInt(counter.dataset.duration, 10) || 2000;
		const separator = counter.dataset.separator || ',';
		const decimals = parseInt(counter.dataset.decimals, 10) || 0;

		numberEl.dataset.animated = 'true';

		const startTime = performance.now();
		const diff = end - start;

		const step = (currentTime) => {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);

			// Easing function (ease-out-quad)
			const easeProgress = 1 - Math.pow(1 - progress, 2);

			const currentValue = start + (diff * easeProgress);
			numberEl.textContent = formatNumber(currentValue, separator, decimals);

			if (progress < 1) {
				requestAnimationFrame(step);
			} else {
				numberEl.textContent = formatNumber(end, separator, decimals);
			}
		};

		requestAnimationFrame(step);
	};

	// Intersection Observer for triggering animation when visible
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					animateCounter(entry.target);
					observer.unobserve(entry.target);
				}
			});
		},
		{
			threshold: 0.3,
			rootMargin: '0px 0px -50px 0px',
		}
	);

	counters.forEach((counter) => {
		observer.observe(counter);
	});
});
