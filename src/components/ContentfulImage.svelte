<script>
  export let asset = null;
  export let alt = "";
  export let className = "";
  export let background = false;

  let imageUrl = null;
  let loading = false;
  let failed = false;
  let lastRefId = null;

  $: refId = asset?.sys?.id;

  $: if (refId !== lastRefId) {
    lastRefId = refId;
    if (refId) {
      loadAsset(refId);
    } else {
      imageUrl = null;
      loading = false;
      failed = false;
    }
  }

  async function loadAsset(id) {
    loading = true;
    failed = false;
    imageUrl = null;

    try {
      const response = await fetch(`/api/asset/${id}`);
      if (!response.ok) throw new Error("Asset not found");

      const data = await response.json();
      const url = data?.fields?.file?.url;
      imageUrl = url
        ? url.startsWith("//")
          ? `https:${url}`
          : url
        : null;
      failed = !imageUrl;
    } catch {
      failed = true;
      imageUrl = null;
    } finally {
      loading = false;
    }
  }
</script>

{#if background}
  <div
    class={`relative overflow-hidden bg-cover bg-center bg-gray-200 ${className}`}
    style={imageUrl
      ? `background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('${imageUrl}')`
      : undefined}
    role="img"
    aria-label={alt || "Image"}
  >
    {#if loading || (!imageUrl && !failed)}
      <div class="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
    {/if}
    <slot />
  </div>
{:else if imageUrl}
  <img src={imageUrl} {alt} class={className} />
{:else if loading}
  <div class={`bg-gray-200 animate-pulse ${className}`} aria-hidden="true"></div>
{:else if failed}
  <div class={`bg-gray-100 ${className}`} aria-hidden="true"></div>
{/if}