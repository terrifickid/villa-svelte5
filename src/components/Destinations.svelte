<script>
  // All location data is now inside the component
  export let data;
</script>

<section class="grid grid-cols-16 gap-x-4 px-10 py-24 leading-snug tracking-[-0.02em]">
  <div
    class="col-span-full rounded-md bg-black p-12 text-standfirst text-white lg:col-span-8"
  >
    Embark on a journey of discovery as you delve into our curated selection of
    exclusive properties, all nestled within the most sought-after and popular
    destinations around the world.
  </div>
</section>

<section class="grid grid-cols-16 gap-x-4 px-10 py-24 leading-snug tracking-[-0.02em]">
  <!-- Locations Grid -->
  <div class="col-span-full space-y-6 lg:col-span-8">
    {#each data.countries as location}
      <div
        class="group flex min-h-[30vw] items-center justify-center rounded-md bg-gray-100"
      >
        <!-- Content -->
        <h3 class="font-satoshi text-standfirst font-medium">
          {location}
        </h3>
      </div>
    {/each}
  </div>
</section>
