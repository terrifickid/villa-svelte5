<script>
  import PropertyList from "$components/PropertyList.svelte";
  import SearchChips from "$components/SearchChips.svelte";
  import { searchProperties } from "$lib/search";

  let { data } = $props();

  let items = $state([...(data.results ?? [])]);
  let total = $state(data.total ?? 0);
  let loading = $state(false);
  let exhausted = $state(
    (data.results?.length ?? 0) >= (data.total ?? 0),
  );

  // Reset the accumulated list whenever a new search navigates in.
  let activeKeyword = data.keyword;
  $effect(() => {
    if (data.keyword === activeKeyword) return;
    activeKeyword = data.keyword;
    items = [...(data.results ?? [])];
    total = data.total ?? 0;
    exhausted = (data.results?.length ?? 0) >= (data.total ?? 0);
  });

  async function loadMore() {
    if (loading || exhausted) return;
    loading = true;
    try {
      const page = await searchProperties(data.keyword, {
        skip: items.length,
      });
      items = [...items, ...page.results];
      total = page.total;
      if (page.results.length === 0 || items.length >= page.total) {
        exhausted = true;
      }
    } catch (error) {
      console.error("Failed to load more results:", error);
      exhausted = true;
    } finally {
      loading = false;
    }
  }

  // Lazily fetch the next batch as the sentinel scrolls into view.
  function infiniteScroll(node, callback) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) callback();
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(node);
    return {
      update: (next) => (callback = next),
      destroy: () => observer.disconnect(),
    };
  }
</script>

<section class="shell grid grid-cols-16 gap-x-4 px-10 py-24 leading-snug tracking-[-0.02em]">
  <h1 class="col-span-full font-satoshi text-display text-black">
    Search Results ({total})
  </h1>
  <div class="col-span-full mt-6">
    <SearchChips query={data.keyword} />
  </div>
  <div class="col-span-full mt-12">
    <PropertyList results={items} />
  </div>
  <div
    use:infiniteScroll={loadMore}
    class="col-span-full py-16 text-center text-caption text-black/50"
    aria-live="polite"
  >
    {#if loading}
      Loading more…
    {:else if exhausted && items.length === 0}
      No villas matched this search.
    {:else if exhausted}
      That’s every result.
    {/if}
  </div>
</section>
