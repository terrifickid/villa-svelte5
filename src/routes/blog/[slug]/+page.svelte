<script>
  import { page } from "$app/state";
  import ContenfullRichText from "$components/ContenfullRichText.svelte";
  import ContentfulImage from "$components/ContentfulImage.svelte";

  let { data } = $props();

  const { entry, otherPosts = [] } = data;
  const tags = entry.fields.tags ?? [];

  let copied = $state(false);

  function plainText(nodes = []) {
    return nodes
      .map((node) => {
        if (node.nodeType === "text") return node.value ?? "";
        return plainText(node.content ?? []);
      })
      .join(" ");
  }

  function firstSentence() {
    const excerpt = plainText(entry.fields.excerpt?.content ?? []).trim();
    const source = excerpt || plainText(entry.fields.content?.content ?? []).trim();
    return source ? source.split(/(?<=\.)\s+/)[0].trim() : "";
  }

  const summary = firstSentence();

  function postDate(post) {
    return post.sys.publishedAt ?? post.sys.createdAt ?? post.sys.updatedAt;
  }

  function formatDate(iso) {
    return new Date(iso)
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      .replace(",", "");
  }

  const shareTargets = $derived([
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(page.url.href)}`,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(page.url.href)}`,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(page.url.href)}`,
    },
  ]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(page.url.href);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  const mainLinkClass =
    "relative inline-block after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-[cubic-bezier(.165,.84,.44,1)] hover:after:scale-x-100";
  const subLinkClass =
    "relative inline-block after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-[cubic-bezier(.165,.84,.44,1)] hover:after:scale-x-100";

  const cardStarts = ["lg:col-start-1", "lg:col-start-5", "lg:col-start-9"];
</script>

<svelte:head>
  <title>{entry.fields.title} | Villabound</title>
  <meta name="description" content={summary || "Stories from Villabound."} />
</svelte:head>

<!-- Hero -->
<section class="v-band">
  <h1
    class="col-span-full font-satoshi text-display text-black lg:col-span-12"
  >
    {entry.fields.title}
  </h1>
  {#if tags.length}
    <p class="col-span-full mt-8 text-label text-black lg:col-span-8">
      {tags.join(" · ")}
    </p>
  {/if}
</section>

<!-- Full-bleed media band: the only element outside the gutter -->
{#if entry.fields.imagePreview}
  <div class="mb-4 w-full overflow-hidden">
    <ContentfulImage
      asset={entry.fields.imagePreview}
      alt={entry.fields.title}
      className="aspect-[16/10] w-full object-cover animate-image-in motion-reduce:animate-none"
    />
  </div>
{/if}

<!-- Standfirst: wider than the article measure -->
{#if summary}
  <section class="v-band">
    <p
      class="col-span-full font-satoshi text-standfirst font-medium text-black lg:col-start-5 lg:col-span-12"
    >
      {summary}
    </p>
  </section>
{/if}

<!-- Article with metadata rail -->
<section class="v-band">
  <!-- Rail: metadata and share controls only -->
  <div
    class="col-span-full flex flex-wrap items-center gap-x-6 gap-y-2 lg:sticky lg:top-24 lg:col-start-1 lg:col-span-2 lg:flex-col lg:items-start lg:gap-6 lg:self-start"
  >
    <p class="text-body text-black">
      Published {formatDate(postDate(entry))}
    </p>
    <div
      class="flex flex-wrap items-center gap-x-4 gap-y-2 lg:flex-col lg:items-start lg:gap-4"
    >
      <button
        type="button"
        class="{subLinkClass} text-caption text-black"
        onclick={copyLink}
      >
        {copied ? "Copied" : "Copy Link"}
      </button>
      {#each shareTargets as target}
        <a
          class="{subLinkClass} text-caption text-black"
          href={target.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {target.label}
        </a>
      {/each}
    </div>
  </div>

  <!-- Article measure -->
  <div class="col-span-full mt-12 lg:col-start-5 lg:col-span-8 lg:mt-0">
    <div class="space-y-6 text-body text-black">
      <ContenfullRichText data={entry.fields.content?.content ?? []} />
    </div>

    <!-- Footnote: separated by space alone, no rule -->
    <div class="pt-16">
      <p class="text-body font-medium text-black">About Villabound</p>
      <p class="mt-4 text-body text-black">
        Villabound is a private villa company founded in 2011, curating
        exclusive homes across the Caribbean and beyond.
      </p>
      <p class="mt-8 text-body font-medium text-black">Media contacts</p>
      <p class="mt-4 text-body text-black">
        Lily Dash —
        <a class={mainLinkClass} href="mailto:lily@villabound.com"
          >lily@villabound.com</a
        >
      </p>
    </div>
  </div>
</section>

<!-- Read next: full content width, cards placed by span -->
{#if otherPosts.length}
  <section class="v-band">
    <h2 class="col-span-full font-satoshi text-heading text-black lg:col-span-7">
      Read next
    </h2>
    <a
      href="/blog"
      class="col-span-full mt-4 w-fit text-caption font-medium text-black transition-colors duration-300 ease-out-cubic hover:text-black/60 lg:col-start-14 lg:col-span-3 lg:mt-0 lg:justify-self-end"
    >
      View all posts
    </a>

    {#each otherPosts as post, i}
      <a
        href={`/blog/${post.fields.slug}`}
        class="col-span-full mt-12 block transition-opacity duration-300 ease-out-cubic hover:opacity-70 lg:col-span-4 lg:mt-16 {cardStarts[i] ?? ''}"
      >
        <ContentfulImage
          asset={post.fields.imagePreview}
          alt={post.fields.title}
          className="aspect-[3/2] w-full object-cover animate-image-in motion-reduce:animate-none"
        />
        <p class="mt-4 text-label text-black">
          {formatDate(postDate(post))}
        </p>
        <h3 class="mt-2 text-xl font-medium leading-tight text-black">
          {post.fields.title}
        </h3>
      </a>
    {/each}
  </section>
{/if}
