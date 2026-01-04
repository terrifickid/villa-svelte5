<script>
  import BookATour from "./buttons/bookATour.svelte";

  let { data = {} } = $props();

  let title = $state(data.title ?? "Find your space, your way");
  let description = $state(
    data.description ??
      "From flexible desks to fully private offices, our workspaces are designed to adapt to your pace, your needs — and your flow."
  );
  let ctaText = $state(data.ctaText ?? "Book a tour");
  let ctaHref = $state(data.ctaHref ?? "/contact");
  let cards = $state(data.cards ?? []);
</script>

<section
  class="spaces-section grid grid-cols-2 container mx-auto max-w-6xl p-6"
  id="spaces"
>
  <!-- Headline & CTA -->
  <div class="header">
    <div class="text-content">
      <h2 class="text-3xl">{title}</h2>
      <p>{description}</p>
    </div>

    <BookATour />
  </div>

  <!-- Cards Grid -->
  <div class="cards-grid">
    {#each cards as card}
      <article class="card flex border rounded-4xl p-6 mb-6 border-gray-300">
        <div class="icon-wrapper w-10">
          {@html card.iconSvg}
        </div>

        <div class="card-text">
          <h3>{card.title}</h3>
          <p class="subtitle">{card.subtitle}</p>
          <p class="description">{card.description}</p>
        </div>
      </article>
    {/each}
  </div>
</section>
