<script>
	export let title = '';
	export let publishedDate = '';
	export let postId = '';
	export let imagePreview = '';
    let humanPublishedDate = publishedDate ? new Date(publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : 'Last month';
</script>

<div class="flex-shrink-0 w-1/4 min-w-[calc(25%-24px)] snap-start">
	<div class="block h-full group">
		<div 
			class="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow h-96 bg-gray-200 bg-cover bg-center flex flex-col justify-between p-6 font-montserrat"
			style={imagePreview ? `background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('${imagePreview}')` : ''}
		>
			{#if !imagePreview}
				<div class="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
			{/if}
			
			<div class="relative z-10 text-left">
				<p class="text-sm text-blue-300 font-medium mb-2">{humanPublishedDate}</p>
			</div>

			<a href={`/blog/${postId}`} class="relative z-10 flex flex-col items-start">
				<h3 class="text-2xl md:text-3xl font-thin text-white mb-3 line-clamp-3 group-hover:underline transition-colors text-left">
					{title}
				</h3>
				
				<div class="flex flex-wrap gap-2 mb-4">
					<span class="inline-block bg-blue-500/80 text-white text-xs px-3 py-1 rounded">
						Luxury
					</span>
					<span class="inline-block bg-blue-500/80 text-white text-xs px-3 py-1 rounded">
						Vacations
					</span>
				</div>

				<span class="text-white font-medium text-sm hover:underline group-hover:underline transition-colors">
					read more
				</span>
			</a>
		</div>
	</div>
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
