<script>
  export let data;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/locations", label: "Locations" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  let mobileMenuOpen = false;

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<nav class="w-full z-50 my-5 absolute">
  <div class="text-white px-8 py-4 rounded-3xl text-sm frame">
    <div class="flex items-center justify-between">
      <a class="transition-opacity duration-300 hover:opacity-50" href="/">
        <img class="w-35" src="/vb.png" alt="Villabound" />
      </a>

      <ul class="hidden md:flex items-center gap-2">
        {#each navLinks as { href, label }}
          <li class="px-2 transition-opacity duration-300 hover:opacity-50">
            <a {href}>{label}</a>
          </li>
        {/each}
      </ul>

      <div class="flex items-center gap-2">
        <a
          href="/search"
          class="border p-2 bg-black rounded-3xl text-white transition-opacity duration-300 hover:opacity-70"
          aria-label="Search villas"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </a>

        <button
          class="md:hidden border p-2 bg-black rounded-3xl text-white"
          on:click={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d={mobileMenuOpen
                ? "M6 18L18 6M6 6l12 12"
                : "M3.75 9h16.5m-16.5 6.75h16.5"}
            />
          </svg>
        </button>
      </div>
    </div>

    {#if mobileMenuOpen}
      <ul class="md:hidden mt-4 space-y-2 border-t border-white/20 pt-4">
        {#each navLinks as { href, label }}
          <li>
            <a
              {href}
              class="block py-2 transition-opacity duration-300 hover:opacity-50"
              on:click={() => (mobileMenuOpen = false)}
            >
              {label}
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</nav>