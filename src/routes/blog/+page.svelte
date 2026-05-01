<script>
    export let data;
    import BlogCarousel from "$components/blog/BlogCarousel.svelte";
    import BlogCarouselItem from "$components/blog/BlogCarouselItem.svelte";
    import ContenfullRichText from "$components/ContenfullRichText.svelte";
    const topPosts = data.results.slice(0, 6);
    const chunks = data.results.reduce((acc, _, i, arr) => {
        if (i % 2 === 0) acc.push(arr.slice(i, i + 2));
        return acc;
    }, []);
    console.log(chunks);
</script>

<section class="flex flex-col mb-12">
    <div
        class="w-full h-256 bg-cover bg-center flex flex-col items-center justify-center p-32"
        style="background-image: url(/7flntut11.jpg)"
    >
        <div
            class="p-6 border border-white text-center text-white flex flex-col items-center mb-8"
        >
            <h3 class="text-4xl indent-[8px] uppercase tracking-[0.5em]">
                Villabound
            </h3>
        </div>
        <div
            class="w-full mt-4 flex text-center text-white mb-2 justify-center"
        >
            <BlogCarousel>
                {#each topPosts as post (post.slug)}
                    <BlogCarouselItem
                        title={post.title}
                        publishedDate={post.publishedDate}
                        postId={post.slug}
                        imagePreview={post.imagePreview}
                    />
                {/each}
            </BlogCarousel>
        </div>
    </div>
    <div
        class="w-full h-[40px] bg-cover bg-center mt-[-40px]"
        style="background-image: url(/papercut.png)"
    >
        &nbsp;
    </div>
</section>
{#each chunks as chunk}
    <section class="w-full flex flex-col gap-6 mb-12">
        <section class="w-full flex gap-6 px-32 my-32">
            <img src={chunk[0].imagePreview} alt={chunk[0].title} class="w-1/2 h-64 object-cover rounded-lg shadow-md" />
            <div class="w-1/2 flex flex-col justify-start">
                <div class="flex flex-wrap gap-2 mb-4">
                {#each chunk[0].tags as tags}
                    <span class="inline-block bg-blue-500/80 text-white text-xs px-3 py-1 rounded mb-2">
                        {tags}
                    </span>
                {/each}
                </div>
                <h2 class="text-3xl font-semibold mb-4">{chunk[0].title}</h2>
                <p class="text-gray-700 mb-6 line-clamp-4">
                     <ContenfullRichText data={chunk[0].excerpt.content ?? []}/>
                </p>
                <a href={`/blog/${chunk[0].slug}`} class="text-blue-500 hover:underline font-medium">
                    Read More
                </a>
            </div>
        </section>
        {#if chunk.length > 1}
        <section class="flex flex-col mb-12">
            <div class="w-full h-128 bg-cover bg-center flex flex-col items-start justify-center p-32" style="background-image: url({chunk[1].imagePreview})">
                <div class="w-1/2 flex flex-col justify-start text-white">
                    <div class="flex flex-wrap gap-2 mb-4">
                    {#each chunk[1].tags as tags}
                        <span class="inline-block bg-blue-500/80 text-white text-xs px-3 py-1 rounded mb-2">
                            {tags}
                        </span>
                    {/each}
                    </div>
                    <h2 class="text-3xl font-semibold mb-4">{chunk[1].title}</h2>
                    <p class="mb-6 line-clamp-4">
                        <ContenfullRichText data={chunk[1].excerpt.content ?? []}/>
                    </p>
                    <a href={`/blog/${chunk[1].slug}`} class="hover:underline font-medium">
                        Read More
                    </a>
                </div>
            </div>
            <div class="w-full h-[40px] bg-cover bg-center mt-[-40px]" style="background-image: url(/papercut.png)" >&nbsp;</div>
        </section>
        {/if}
    </section>
{/each}
