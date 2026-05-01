<!-- src/lib/components/PaginationBar.svelte -->
<script>
  let { data } = $props();

  let keyword = $derived(data.keyword);
  let currentPage = $derived(data.currentPage);
  let totalPages = $derived(data.totalPages);

  // Show up to 10 page numbers, with ellipsis on both sides if needed
  let pageNumbers = $derived(() => {
    const maxVisible = 10;
    const side = 4; // pages shown on each side of current (excluding current)

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = currentPage - side;
    let end = currentPage + side;

    if (start < 3) {
      start = 1;
      end = maxVisible;
    } else if (end > totalPages - 2) {
      start = totalPages - maxVisible + 1;
      end = totalPages;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  // Show left ellipsis if not starting from page 1-2
  let showLeftEllipsis = $derived(pageNumbers[0] > 2);
  // Show right ellipsis if not ending near the last pages
  let showRightEllipsis = $derived(
    pageNumbers[pageNumbers.length - 1] < totalPages - 1
  );
</script>

<!-- Mobile fallback: show only prev/next on small screens -->
{#if totalPages > 1}
  <nav
    class="flex justify-between items-center my-8"
    aria-label="Pagination mobile"
  >
    <span class="text-lg">Page {currentPage} of {totalPages}</span>
    <div>
      {#if currentPage > 1}
        <a
          href="/search/{keyword}?page={currentPage - 1}"
          class="px-5 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md"
          >‹ Prev</a
        >
      {:else}
        <span class="px-5 py-2 text-sm text-gray-400">‹ Prev</span>
      {/if}

      {#if currentPage < totalPages}
        <a
          href="/search/{keyword}?page={currentPage + 1}"
          class="px-5 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md"
          >Next ›</a
        >
      {:else}
        <span class="px-5 py-2 text-sm text-gray-400">Next ›</span>
      {/if}
    </div>
  </nav>
{/if}
