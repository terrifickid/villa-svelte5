<script>
  export let data;
  import PropertyList from "$components/PropertyList.svelte";
</script>

<section class="grid grid-cols-16 gap-x-4 px-10 py-24 leading-snug tracking-[-0.02em]">
  <h1 class="col-span-full mb-12 font-satoshi text-display text-black">
    Found ({data.results.length})
  </h1>
  <div class="col-span-full">
    <PropertyList {data} />
  </div>
</section>
