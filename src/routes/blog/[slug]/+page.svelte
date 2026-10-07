<script>
  export let data;
  import ContenfullRichText from "$components/ContenfullRichText.svelte";
  import ContentfulImage from "$components/ContentfulImage.svelte";

  const { entry } = data;
</script>

<!-- Hero: full-bleed media band -->
<section>
  <ContentfulImage
    asset={entry.fields.imagePreview}
    alt={entry.fields.title}
    background
    className="v-band min-h-128 items-center"
  >
    <div class="col-span-full text-white lg:col-span-8">
      <div class="mb-4 flex flex-wrap gap-2">
        {#each entry.fields.tags ?? [] as tag}
          <span
            class="inline-block bg-blue-500/80 text-label text-white px-3 py-1 rounded"
          >
            {tag}
          </span>
        {/each}
      </div>
      <h1 class="font-satoshi text-display text-white">{entry.fields.title}</h1>
    </div>
  </ContentfulImage>
  <div
    class="mt-[-40px] h-[40px] w-full bg-cover bg-center"
    style="background-image: url(/papercut.png)"
  >
    &nbsp;
  </div>
</section>

<section class="v-band">
  <div class="col-span-full space-y-6 text-body lg:col-span-8">
    <ContenfullRichText data={entry.fields.content?.content ?? []} />
  </div>
</section>
