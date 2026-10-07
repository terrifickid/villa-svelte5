<script>
  export let data;
  import BlogCarousel from "$components/blog/BlogCarousel.svelte";
  import BlogCarouselItem from "$components/blog/BlogCarouselItem.svelte";
  import ContenfullRichText from "$components/ContenfullRichText.svelte";
  import ContentfulImage from "$components/ContentfulImage.svelte";

  const topPosts = data.results.slice(0, 6);
  const chunks = data.results.reduce((acc, _, i, arr) => {
    if (i % 2 === 0) acc.push(arr.slice(i, i + 2));
    return acc;
  }, []);
</script>

<!-- Hero: full-bleed media band -->
<section
  class="w-full bg-cover bg-center"
  style="background-image: url(/7flntut11.jpg)"
>
  <div class="v-band py-32">
    <div class="col-span-full w-fit border border-white p-6 text-white">
      <h3 class="font-satoshi text-display text-white">Villabound</h3>
    </div>
    <div class="col-span-full mt-12 text-white">
      <BlogCarousel>
        {#each topPosts as post (post.sys.id)}
          <BlogCarouselItem
            title={post.fields.title}
            publishedDate={post.sys.publishedAt}
            postId={post.fields.slug}
            asset={post.fields.imagePreview}
          />
        {/each}
      </BlogCarousel>
    </div>
  </div>
  <div
    class="mt-[-40px] h-[40px] w-full bg-cover bg-center"
    style="background-image: url(/papercut.png)"
  >
    &nbsp;
  </div>
</section>

{#each chunks as chunk}
  <section class="v-band">
    <ContentfulImage
      asset={chunk[0].fields.imagePreview}
      alt={chunk[0].fields.title}
      className="col-span-full h-64 w-full rounded-lg object-cover shadow-md lg:col-span-8"
    />
    <div
      class="col-span-full mt-12 flex flex-col justify-start lg:col-span-8 lg:col-start-9 lg:mt-0"
    >
      <div class="mb-4 flex flex-wrap gap-2">
        {#each chunk[0].fields.tags ?? [] as tag}
          <span
            class="inline-block bg-blue-500/80 text-label text-white px-3 py-1 rounded"
          >
            {tag}
          </span>
        {/each}
      </div>
      <h2 class="font-satoshi text-heading">{chunk[0].fields.title}</h2>
      <p class="mt-6 line-clamp-4 text-body text-gray-700">
        <ContenfullRichText data={chunk[0].fields.excerpt?.content ?? []} />
      </p>
      <a
        href={`/blog/${chunk[0].fields.slug}`}
        class="mt-6 text-caption font-medium text-blue-500 hover:underline"
      >
        Read More
      </a>
    </div>
  </section>

  {#if chunk.length > 1}
    <section>
      <ContentfulImage
        asset={chunk[1].fields.imagePreview}
        alt={chunk[1].fields.title}
        background
        className="v-band min-h-128 items-center"
      >
        <div class="col-span-full text-white lg:col-span-8">
          <div class="mb-4 flex flex-wrap gap-2">
            {#each chunk[1].fields.tags ?? [] as tag}
              <span
                class="inline-block bg-blue-500/80 text-label text-white px-3 py-1 rounded"
              >
                {tag}
              </span>
            {/each}
          </div>
          <h2 class="font-satoshi text-heading text-white">
            {chunk[1].fields.title}
          </h2>
          <p class="mt-6 line-clamp-4 text-body">
            <ContenfullRichText data={chunk[1].fields.excerpt?.content ?? []} />
          </p>
          <a
            href={`/blog/${chunk[1].fields.slug}`}
            class="mt-6 text-caption font-medium text-white hover:underline"
          >
            Read More
          </a>
        </div>
      </ContentfulImage>
      <div
        class="mt-[-40px] h-[40px] w-full bg-cover bg-center"
        style="background-image: url(/papercut.png)"
      >
        &nbsp;
      </div>
    </section>
  {/if}
{/each}
