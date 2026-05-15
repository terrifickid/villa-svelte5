<script>
  // All location data is now inside the component
  export let data;
</script>

<section class="frame min-h-screen flex items-center">
  <div>
    <div class="mt-4 text-2xl bg-black p-12 text-white rounded-2xl text-center">
      Embark on a journey of discovery as you delve into our curated selection
      of exclusive properties, all nestled within the most sought-after and
      popular destinations around the world.
    </div>
  </div>
</section>

<section class="frame min-h-screen">
  <!-- Locations Grid -->

  <div class="max-w-lg mx-auto">
    {#each data.countries as location}
      <div
        class="group m-6 bg-gray-100 rounded-2xl flex items-center justify-center align-center min-h-[30vw]"
      >
        <!-- Content -->

        <h3 class="text-2xl">
          {location}
        </h3>
      </div>
    {/each}
  </div>
</section>
