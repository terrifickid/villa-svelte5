<script>
  export let data;
</script>

<svelte:head>
  <title>Locations | Villabound</title>
  <meta
    name="description"
    content="Browse exclusive villa rentals across the Caribbean and beyond."
  />
</svelte:head>

<section class="frame py-12 pt-32 md:pt-40">
  <h1 class="v_heading mb-6">Locations</h1>
  <p class="text-slate-600 mb-12 max-w-2xl">
    Embark on a journey of discovery as you explore our curated selection of
    exclusive properties in the world's most sought-after destinations.
  </p>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each data.countries as country}
      <a
        href="/{encodeURIComponent(country)}"
        class="group bg-gray-100 rounded-2xl flex items-center justify-center min-h-40 p-8 transition-opacity duration-300 hover:opacity-70"
      >
        <h2 class="text-2xl font-medium">{country}</h2>
      </a>
    {/each}
  </div>
</section>