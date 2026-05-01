<script>
	import { onMount } from 'svelte';
	
	let scrollContainer;
	let canScrollLeft = false;
	let canScrollRight = true;
	let isDragging = false;
	let startX = 0;
	let scrollLeft = 0;

	function checkScroll() {
		if (scrollContainer) {
			canScrollLeft = scrollContainer.scrollLeft > 0;
			canScrollRight =
				scrollContainer.scrollLeft < scrollContainer.scrollWidth - scrollContainer.clientWidth - 10;
		}
	}

	function scroll(direction) {
		if (scrollContainer) {
			const itemWidth = scrollContainer.firstChild?.offsetWidth || 0;
			const scrollAmount = itemWidth + 32; // item width + gap
			scrollContainer.scrollBy({
				left: direction === 'left' ? -scrollAmount : scrollAmount,
				behavior: 'smooth'
			});
			setTimeout(checkScroll, 300);
		}
	}

	function handleMouseDown(e) {
		isDragging = true;
		startX = e.pageX - scrollContainer.offsetLeft;
		scrollLeft = scrollContainer.scrollLeft;
		scrollContainer.style.cursor = 'grabbing';
	}

	function handleMouseMove(e) {
		if (!isDragging) return;
		e.preventDefault();
		
		const x = e.pageX - scrollContainer.offsetLeft;
		const walk = (x - startX) * 1.5; // Adjust multiplier for drag sensitivity
		scrollContainer.scrollLeft = scrollLeft - walk;
		checkScroll();
	}

	function handleMouseUp() {
		isDragging = false;
		scrollContainer.style.cursor = 'grab';
	}

	function handleMouseLeave() {
		isDragging = false;
		scrollContainer.style.cursor = 'grab';
	}

	onMount(() => {
		checkScroll();
		if (scrollContainer) {
			scrollContainer.addEventListener('mousedown', handleMouseDown);
			scrollContainer.addEventListener('mousemove', handleMouseMove);
			scrollContainer.addEventListener('mouseup', handleMouseUp);
			scrollContainer.addEventListener('mouseleave', handleMouseLeave);
			scrollContainer.style.cursor = 'grab';
		}
		return () => {
			if (scrollContainer) {
				scrollContainer.removeEventListener('mousedown', handleMouseDown);
				scrollContainer.removeEventListener('mousemove', handleMouseMove);
				scrollContainer.removeEventListener('mouseup', handleMouseUp);
				scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
			}
		};
	});
</script>

<div class="relative w-full">
	<!-- Carousel Container -->
	<div
		bind:this={scrollContainer}
		on:scroll={checkScroll}
		class="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide select-none"
		style="scroll-behavior: smooth; -webkit-overflow-scrolling: touch; user-select: none;"
	>
		<slot />
	</div>

	<!-- Left Arrow Button -->
	<button
		on:click={() => scroll('left')}
		disabled={!canScrollLeft}
		class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
		aria-label="Scroll left"
	>
		<svg
			class="w-6 h-6 text-gray-600"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
		</svg>
	</button>

	<!-- Right Arrow Button -->
	<button
		on:click={() => scroll('right')}
		disabled={!canScrollRight}
		class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
		aria-label="Scroll right"
	>
		<svg
			class="w-6 h-6 text-gray-600"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
		</svg>
	</button>
</div>

<style>
	:global(.scrollbar-hide::-webkit-scrollbar) {
		display: none;
	}
	:global(.scrollbar-hide) {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
