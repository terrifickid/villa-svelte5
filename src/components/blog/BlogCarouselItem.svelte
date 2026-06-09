<script>
  import ContentfulImage from "$components/ContentfulImage.svelte";

  export let title = "";
  export let publishedDate = "";
  export let postId = "";
  export let asset = null;

  let humanPublishedDate = publishedDate
    ? new Date(publishedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Last month";
</script>

<div class="flex-shrink-0 w-1/4 min-w-[calc(25%-24px)] snap-start">
  <div class="block h-full group">
    <ContentfulImage
      {asset}
      alt={title}
      background
      className="rounded-lg shadow-md hover:shadow-xl transition-shadow h-96 flex flex-col justify-between p-6 font-montserrat"
    >
      <div class="relative z-10 text-left">
        <p class="text-sm text-blue-300 font-medium mb-2">
          {humanPublishedDate}
        </p>
      </div>

      <a href={`/blog/${postId}`} class="relative z-10 flex flex-col items-start">
        <h3
          class="text-2xl md:text-3xl font-thin text-white mb-3 line-clamp-3 group-hover:underline transition-colors text-left"
        >
          {title}
        </h3>

        <div class="flex flex-wrap gap-2 mb-4">
          <span
            class="inline-block bg-blue-500/80 text-white text-xs px-3 py-1 rounded"
          >
            Luxury
          </span>
          <span
            class="inline-block bg-blue-500/80 text-white text-xs px-3 py-1 rounded"
          >
            Vacations
          </span>
        </div>

        <span
          class="text-white font-medium text-sm hover:underline group-hover:underline transition-colors"
        >
          read more
        </span>
      </a>
    </ContentfulImage>
  </div>
</div>

<style>
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>