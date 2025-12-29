<script>
  export let data;
</script>

<section class="bg-white">
  <!-- Hero/intro section -->
  <div class="frame py-20 md:py-24">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-end">
      <div>
        <span class="text-base uppercase tracking-wider font-medium text-bound inline-flex items-center">
          Destinations
        </span>
        <h2 class="mt-6 text-3xl md:text-4xl lg:text-5xl font-normal text-regent-900 leading-tight">
          Explore exclusive properties in popular destinations.
        </h2>
      </div>
      <div>
        <p class="text-slate-600 text-lg md:text-xl leading-relaxed tracking-wide">
          Embark on a journey of discovery as you delve into our curated selection of exclusive properties, 
          all nestled within the most sought-after and popular destinations around the world.
        </p>
      </div>
    </div>
  </div>

  <!-- Countries grid -->
  <div class="frame pb-20 md:pb-24">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
      {#each data.countries as country}
        {@const encoded = country.replace(/ /g, '+')}
        <div class="group">
          <h3 class="text-lg font-medium font-mono text-regent-900 transition-colors">
            <a 
              href={`/search?country=${encoded}`}
              class=" inline-flex items-center gap-2"
            >
              <span>{country}</span>
            
            </a>
          </h3>
        </div>
      {/each}
    </div>
  </div>
</section>