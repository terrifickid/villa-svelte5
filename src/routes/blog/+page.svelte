<script>
  import ContentfulImage from "$components/ContentfulImage.svelte";

  let { data } = $props();

  const posts = data?.results ?? [];

  let active = $state("All");

  const tags = [
    ...posts
      .flatMap((post) => post.fields.tags ?? [])
      .reduce((counts, tag) => {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
        return counts;
      }, new Map())
      .entries(),
  ]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 8)
    .map(([tag]) => tag);

  const visible = $derived(
    active === "All"
      ? posts
      : posts.filter((post) => (post.fields.tags ?? []).includes(active))
  );

  const featured = $derived(visible[0]);
  const items = $derived(visible.slice(1));

  function postDate(post) {
    return post.sys.publishedAt ?? post.sys.createdAt ?? post.sys.updatedAt;
  }

  function formatDate(iso) {
    return new Date(iso)
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      .replace(",", "");
  }

  const titleClass =
    "font-satoshi font-medium leading-none tracking-[-0.03em] text-black";
</script>

<svelte:head>
  <title>Journal | Villabound</title>
  <meta
    name="description"
    content="Stories, guides and news from the Villabound team."
  />
</svelte:head>

<!-- Page title -->
<section class="v-band">
  <h1
    class="col-span-full text-[clamp(3.125rem,9.765625vw,6.25rem)] {titleClass} lg:col-span-12"
  >
    Journal
  </h1>
</section>

<!-- Listing -->
<section class="v-band">
  <!-- Category rail: parent grid columns 1-3, list takes 4-16 -->
  <nav
    class="hidden lg:col-start-1 lg:col-span-3 lg:block"
    aria-label="Categories"
  >
    <ul class="space-y-3">
      <li>
        <button
          type="button"
          class="text-left transition-opacity hover:opacity-70 {active === 'All'
            ? 'underline underline-offset-4'
            : 'text-black/60'}"
          aria-pressed={active === "All"}
          onclick={() => (active = "All")}
        >
          All
        </button>
      </li>
      {#each tags as tag}
        <li>
          <button
            type="button"
            class="text-left transition-opacity hover:opacity-70 {active === tag
              ? 'underline underline-offset-4'
              : 'text-black/60'}"
            aria-pressed={active === tag}
            onclick={() => (active = tag)}
          >
            {tag}
          </button>
        </li>
      {/each}
    </ul>
  </nav>

  <!-- List container: 13 of the parent tracks at lg -->
  <div class="col-span-full lg:col-start-4 lg:col-span-13">
    {#key active}
      <div class="animate-list-in motion-reduce:animate-none">
        {#if featured}
          <!-- Featured article: full list width -->
          <article class="pb-32">
            <a href={`/blog/${featured.fields.slug}`} class="block">
              <ContentfulImage
                asset={featured.fields.imagePreview}
                alt={featured.fields.title}
                className="aspect-[16/9] w-full object-cover animate-image-in motion-reduce:animate-none"
              />
            </a>
            <div
              class="grid grid-cols-1 gap-y-2 pt-6 pb-6 lg:grid-cols-13 lg:gap-x-4 lg:gap-y-0"
            >
              <time
                class="text-label lg:col-span-1"
                datetime={postDate(featured)}
              >
                {formatDate(postDate(featured))}
              </time>
              <h2
                class="text-[clamp(1.75rem,3.90625vw,2.5rem)] {titleClass} lg:col-start-6 lg:col-span-7"
              >
                <a
                  href={`/blog/${featured.fields.slug}`}
                  class="transition-opacity hover:opacity-70"
                >
                  {featured.fields.title}
                </a>
              </h2>
            </div>
          </article>
        {/if}

        <!-- List items: date / image / title / category on the 13 tracks -->
        {#each items as post (post.sys.id)}
          <article
            class="relative grid grid-cols-[5rem_1fr] gap-x-4 gap-y-1 pt-4 pb-8 after:absolute after:top-0 after:left-0 after:h-px after:w-full after:bg-black/20 lg:grid-cols-13 lg:gap-y-0"
          >
            <a
              href={`/blog/${post.fields.slug}`}
              class="col-start-1 row-start-1 row-span-3 lg:col-start-2 lg:col-span-3 lg:row-span-1"
            >
              <ContentfulImage
                asset={post.fields.imagePreview}
                alt={post.fields.title}
                className="aspect-square w-full rounded-md object-cover animate-image-in motion-reduce:animate-none lg:aspect-[3/2]"
              />
            </a>
            <time
              class="col-start-2 row-start-1 text-label lg:col-start-1 lg:row-start-1"
              datetime={postDate(post)}
            >
              {formatDate(postDate(post))}
            </time>
            <h3
              class="col-start-2 row-start-2 text-xl font-medium leading-tight text-black lg:col-start-6 lg:col-span-5 lg:row-start-1"
            >
              <a
                href={`/blog/${post.fields.slug}`}
                class="transition-opacity hover:opacity-70"
              >
                {post.fields.title}
              </a>
            </h3>
            {#if post.fields.tags?.[0]}
              <span
                class="col-start-2 row-start-3 text-label lg:col-start-13 lg:row-start-1"
              >
                {post.fields.tags[0]}
              </span>
            {/if}
          </article>
        {/each}

        {#if !featured}
          <p class="pb-8 text-body text-black">No posts yet.</p>
        {/if}
      </div>
    {/key}
  </div>
</section>

<!-- Closing band -->
<section class="v-band bg-black text-white">
  <h2
    class="col-span-full text-[clamp(2rem,4.6875vw,3rem)] {titleClass} text-white lg:col-span-7"
  >
    Get the Villabound Look Book
  </h2>
  <p
    class="col-span-full mt-6 text-body lg:col-start-13 lg:col-span-4 lg:mt-0"
  >
    A printed collection of our villas, destinations and services — sent on
    request.
  </p>
  <a
    href="/contact"
    class="col-span-full mt-8 inline-flex h-12 w-fit items-center rounded-md bg-white px-6 text-caption font-medium text-black lg:col-start-1 lg:col-span-4 lg:row-start-2 lg:mt-12"
  >
    Request the look book
  </a>
</section>
