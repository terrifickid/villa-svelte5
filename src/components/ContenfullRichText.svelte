<script>
    import ContenfullRichText from "./ContenfullRichText.svelte";
    export let data;
</script>

{#each data as paragraph}
    {#if paragraph.nodeType === "paragraph"}
        <p>
            <ContenfullRichText data={paragraph.content} />
        </p>
    {:else if paragraph.nodeType === "hyperlink"}
        <a href={paragraph.data.uri} class="text-blue-500 hover:underline">
            {#each paragraph.content as linkText}
                {linkText.value}
            {/each}
        </a>
    {:else if paragraph.nodeType === "text"}
        <span>{paragraph.value}</span>
    {:else if paragraph.nodeType === "embedded-asset-block"}
        <div class="my-6">
            <img
                src={paragraph.data.target.fields.file.url}
                alt={paragraph.data.target.fields.title}
                class="w-full h-auto rounded-lg shadow-md"
            />
        </div>
    {:else}
        <!-- Handle other node types as needed -->
        <p>Unsupported content type: {paragraph.nodeType}</p>
    {/if}
{/each}
