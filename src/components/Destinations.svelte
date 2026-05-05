<script>
  // All location data is now inside the component
  export let data;
</script>

<section class="bg-white py-20 md:py-24">
  <!-- Header -->
  <div class=" mx-auto">
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-end gap-12"
    >
      <div>
        <h2 class="text-3xl hidden">
          Explore exclusive properties in popular destinations.
        </h2>
        <p class="mt-4 text-4xl">
          Embark on a journey of discovery as you delve into our curated
          selection of exclusive properties, all nestled within the most
          sought-after and popular destinations around the world.
        </p>
      </div>
    </div>
  </div>

  <!-- Locations Grid -->
  <div class="mx-auto mt-16">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
    >
      {#each data.countries as location}
        <div
          class="group bg-gray-100 p-12 h-60 rounded-2xl flex items-center justify-center align-center"
        >
          <!-- Content -->

          <h3 class="text-2xl">
            {location}
          </h3>
        </div>
      {/each}
    </div>
  </div>
</section>
