<script>
    export let data;
    import ContenfullRichText from "$components/ContenfullRichText.svelte";
</script>

<section class="flex flex-col mb-12">
    <div
        class="w-full h-128 bg-cover bg-center flex flex-col items-start justify-center p-32"
        style="background-image: url({data.fields.imagePreview.fields.file.url})"
    >
        <div class="w-1/2 flex flex-col justify-start text-white">
            <div class="flex flex-wrap gap-2 mb-4">
                {#each data.fields.tags as tags}
                    <span
                        class="inline-block bg-blue-500/80 text-white text-xs px-3 py-1 rounded mb-2"
                    >
                        {tags}
                    </span>
                {/each}
            </div>
            <h1 class="text-4xl font-semibold mb-4">{data.fields.title}</h1>
            
        </div>
    </div>
    <div
        class="w-full h-[40px] bg-cover bg-center mt-[-40px]"
        style="background-image: url(/papercut.png)"
    >
        &nbsp;
    </div>
</section>
<section class="w-full flex flex-col gap-6 mb-12 px-32">
    <ContenfullRichText data={data.fields.content.content} />
</section>