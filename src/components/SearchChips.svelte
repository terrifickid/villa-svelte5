<script>
  import { goto } from "$app/navigation";

  // `query` is the exact string passed to Contentful's full-text `query` param.
  let { query = "" } = $props();

  // The whole query, converted into a chips UI.
  let chips = $derived(query.split(/\s+/).filter(Boolean));

  function remove(index) {
    const remaining = chips.filter((_, i) => i !== index);
    goto(
      remaining.length
        ? `/search/${encodeURIComponent(remaining.join(" "))}`
        : "/search",
    );
  }
</script>

{#if chips.length}
  <ul class="flex flex-wrap items-center gap-2" role="list">
    {#each chips as chip, i (i)}
      <li>
        <span
          class="inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/5 py-1 pr-1.5 pl-3 text-caption text-black"
        >
          {chip}
          <button
            type="button"
            class="grid size-5 place-items-center rounded-full text-black/50 transition-colors duration-200 hover:bg-black/10 hover:text-black"
            aria-label={`Remove ${chip}`}
            onclick={() => remove(i)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              class="size-3"
              aria-hidden="true"
            >
              <line x1="6" y1="6" x2="18" y2="18"></line>
              <line x1="18" y1="6" x2="6" y2="18"></line>
            </svg>
          </button>
        </span>
      </li>
    {/each}
  </ul>
{/if}
