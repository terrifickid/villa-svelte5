<script>
  import ContenfullRichText from "./ContenfullRichText.svelte";
  export let data;

  const linkClass =
    "relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-[cubic-bezier(.165,.84,.44,1)] hover:after:scale-x-100";
</script>

{#each data as node}
  {#if node.nodeType === "paragraph"}
    <p>
      <ContenfullRichText data={node.content} />
    </p>
  {:else if node.nodeType === "blockquote"}
    <blockquote class="border-l-2 border-black pl-6">
      <div class="font-satoshi text-standfirst font-medium leading-snug">
        <ContenfullRichText data={node.content} />
      </div>
    </blockquote>
  {:else if node.nodeType === "heading-1"}
    <h2 class="font-satoshi text-heading">
      <ContenfullRichText data={node.content} />
    </h2>
  {:else if node.nodeType === "heading-2"}
    <h3 class="font-satoshi text-standfirst font-medium">
      <ContenfullRichText data={node.content} />
    </h3>
  {:else if node.nodeType === "heading-3"}
    <h4 class="font-satoshi text-body font-medium">
      <ContenfullRichText data={node.content} />
    </h4>
  {:else if node.nodeType === "hyperlink"}
    <a href={node.data.uri} class={linkClass}>
      <ContenfullRichText data={node.content} />
    </a>
  {:else if node.nodeType === "text"}
    {#if node.marks?.some((mark) => mark.type === "bold")}
      <strong class="font-medium">{node.value}</strong>
    {:else if node.marks?.some((mark) => mark.type === "italic")}
      <em>{node.value}</em>
    {:else}
      <span>{node.value}</span>
    {/if}
  {:else if node.nodeType === "unordered-list"}
    <ul class="list-disc space-y-2 pl-6">
      <ContenfullRichText data={node.content} />
    </ul>
  {:else if node.nodeType === "ordered-list"}
    <ol class="list-decimal space-y-2 pl-6">
      <ContenfullRichText data={node.content} />
    </ol>
  {:else if node.nodeType === "list-item"}
    <li>
      <ContenfullRichText data={node.content} />
    </li>
  {:else if node.nodeType === "hr"}
    <hr class="border-black/20" />
  {:else if node.nodeType === "embedded-asset-block"}
    <div class="my-6">
      <img
        src={node.data.target.fields.file.url}
        alt={node.data.target.fields.title}
        class="h-auto w-full"
      />
    </div>
  {:else}
    <p>Unsupported content type: {node.nodeType}</p>
  {/if}
{/each}
