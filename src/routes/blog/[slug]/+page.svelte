<script>
  export let data;
  import ContenfullRichText from "$components/ContenfullRichText.svelte";
  import ContentfulImage from "$components/ContentfulImage.svelte";

  const { entry } = data;
</script>

<section class="flex flex-col mb-12">
  <ContentfulImage
    asset={entry.fields.imagePreview}
    alt={entry.fields.title}
    background
    className="w-full h-128 flex flex-col items-start justify-center p-32"
  >
    <div class="relative z-10 w-1/2 flex flex-col justify-start text-white">
      <div class="flex flex-wrap gap-2 mb-4">
        {#each entry.fields.tags ?? [] as tag}
          <span
            class="inline-block bg-blue-500/80 text-white text-xs px-3 py-1 rounded mb-2"
          >
            {tag}
          </span>
        {/each}
      </div>
      <h1 class="text-4xl font-semibold mb-4">{entry.fields.title}</h1>
    </div>
  </ContentfulImage>
  <div
    class="w-full h-[40px] bg-cover bg-center mt-[-40px]"
    style="background-image: url(/papercut.png)"
  >
    &nbsp;
  </div>
</section>

<section class="w-full flex flex-col gap-6 mb-12 px-32">
  <ContenfullRichText data={entry.fields.content?.content ?? []} />
</section>