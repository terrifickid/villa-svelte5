<script>
  import BookATour from "./buttons/bookATour.svelte";

  let { data = {} } = $props();

  let title = $state(data.title ?? "Find your space, your way");
  let description = $state(
    data.description ??
      "From flexible desks to fully private offices, our workspaces are designed to adapt to your pace, your needs — and your flow.",
  );
  let ctaText = $state(data.ctaText ?? "Book a tour");
  let ctaHref = $state(data.ctaHref ?? "/contact");
  let cards = $state(data.cards ?? []);
</script>

<section class="v-band" id="spaces">
  <!-- Headline & CTA -->
  <div class="col-span-full lg:col-span-7">
    <div class="text-content">
      <h2 class="font-satoshi text-heading">{title}</h2>
      <p class="mt-6 text-body">{description}</p>
    </div>

    <div class="mt-12"><BookATour /></div>
  </div>

  <!-- Cards Grid -->
  <div
    class="col-span-full mt-12 space-y-6 lg:col-span-8 lg:col-start-9 lg:mt-0"
  >
    {#each cards as card}
      <article
        class="card flex rounded-md border border-gray-200 p-6"
      >
        <div class="card-text">
          <p class="mb-4 text-body font-medium">{card.subtitle}</p>
          <p class="text-body text-zinc-600">{card.description}</p>
        </div>
      </article>
    {/each}
  </div>
</section>
