<script>
  export let data;
  import PropertyList from "$components/PropertyList.svelte";
  import PaginationBar from "$components/PaginationBar.svelte";
</script>

<section class="shell grid grid-cols-16 gap-x-4 px-10 py-24 leading-snug tracking-[-0.02em]">
  <h1 class="col-span-full mb-12 font-satoshi text-display text-black">
    Search Results for <i>"{data.keyword}"</i> ({data.total})
  </h1>
  <div class="col-span-full">
    <PaginationBar {data} />
  </div>
  <div class="col-span-full mt-12">
    <PropertyList {data} />
  </div>
  <div class="col-span-full">
    <PaginationBar {data} />
  </div>
</section>
