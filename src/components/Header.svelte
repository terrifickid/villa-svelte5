<script>
  import { page } from "$app/state";

  let open = $state(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Locations", href: "/locations" },
    { label: "About", href: "/about" },
    { label: "Owners", href: "/owners" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const discoverLinks = [
    { label: "Search", href: "/search" },
    { label: "Favorites", href: "/favorites" },
    { label: "Destinations", href: "/locations" },
  ];

  const connectLinks = [
    { label: "Contact", href: "/contact" },
    { label: "Email", href: "mailto:lily@villabound.com" },
    { label: "Phone", href: "tel:+12464245075" },
  ];

  const path = $derived(page.url.pathname);

  // The home page has no header bar — its hero carries the logo lockup instead
  const isHome = $derived(path === "/");

  const mainLinkClass =
    "relative inline-block font-satoshi text-heading after:absolute after:-bottom-1 after:left-0 after:h-[0.09375rem] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-[cubic-bezier(.165,.84,.44,1)] hover:after:scale-x-100";
  const subLinkClass =
    "relative inline-block text-lg after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-[cubic-bezier(.165,.84,.44,1)] hover:after:scale-x-100";

  function onKeydown(event) {
    if (event.key === "Escape" && open) open = false;
  }

  // Close the panel whenever the route changes
  $effect(() => {
    path;
    open = false;
  });

  // Lock page scroll while the panel is open
  $effect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  });
</script>

<svelte:window onkeydown={onKeydown} />

<nav class="relative z-[100]" aria-label="Main">
  {#if !isHome}
    <!-- Bar: sits in normal document flow (not sticky) -->
    <header
      class="z-30 transition-colors duration-700 ease-in-out-cubic {open
        ? 'fixed inset-x-0 top-0 bg-black text-caption text-white'
        : 'relative bg-white text-caption text-black'}"
    >
      <div class="shell relative flex h-20 items-center px-10">
        <button
          type="button"
          class="relative ml-auto size-[2.75rem] shrink-0 cursor-pointer"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onclick={() => (open = !open)}
        >
          <!-- Magnifier: shown while the menu is closed -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="absolute inset-0 m-auto size-[2.25rem] transition duration-700 ease-in-out-cubic {open
              ? 'rotate-90 scale-75 opacity-0'
              : 'rotate-0 scale-100 opacity-100'}"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7"></circle>
            <line x1="16.5" y1="16.5" x2="21" y2="21"></line>
          </svg>

          <!-- Close (X): shown while the menu is open -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="absolute inset-0 m-auto size-[2.25rem] transition duration-700 ease-in-out-cubic {open
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-75 opacity-0'}"
            aria-hidden="true"
          >
            <line x1="6" y1="6" x2="18" y2="18"></line>
            <line x1="18" y1="6" x2="6" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>

    <!-- Full-screen overlay menu: fixed so it covers the viewport while the bar scrolls with the page -->
    <div
      class="fixed inset-x-0 top-0 z-20 grid transition-[grid-template-rows] duration-700 ease-in-out-cubic {open
        ? 'pointer-events-auto grid-rows-[1fr]'
        : 'pointer-events-none grid-rows-[0fr]'}"
      inert={open ? undefined : true}
      aria-hidden={!open}
    >
      <div class="relative overflow-hidden">
        <!-- Slab and layered colour bands -->
        <div
          class="absolute inset-0 overflow-hidden bg-black transition-transform duration-700 ease-in-out-cubic {open
            ? 'translate-y-0'
            : '-translate-y-full'}"
          aria-hidden="true"
        >
          <div
            class="absolute inset-x-0 bottom-0 z-4 h-1/2 origin-bottom bg-black transition-transform delay-[320ms] duration-[730ms] ease-in-out-cubic {open
              ? 'scale-y-0'
              : 'scale-y-100'}"
          ></div>
          <div
            class="absolute inset-x-0 bottom-0 z-3 h-[70%] origin-bottom bg-black transition-transform delay-[105ms] duration-[900ms] ease-in-out-cubic {open
              ? 'scale-y-0'
              : 'scale-y-100'}"
          ></div>
          <div
            class="absolute inset-x-0 bottom-0 z-2 h-full origin-bottom bg-black transition-transform delay-[105ms] duration-[630ms] ease-in-out-cubic {open
              ? 'scale-y-0'
              : 'scale-y-100'}"
          ></div>
          <div
            class="absolute inset-x-0 bottom-0 z-1 h-full origin-bottom bg-black transition-transform duration-[520ms] ease-in-out-cubic {open
              ? 'scale-y-0'
              : 'scale-y-100'}"
          ></div>
        </div>

        <div
          class="shell relative grid min-h-screen grid-cols-16 gap-x-4 px-10 pt-[min(16rem,17.7vh)] pb-20 leading-snug tracking-[-0.02em] text-white"
        >
          <ul class="col-span-full space-y-2 lg:col-span-8" aria-label="Pages">
            {#each navLinks as link, i}
              <li
                class="transition-[transform,opacity] duration-[667ms] ease-snappy {open
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-16 opacity-0'}"
                style={open ? `transition-delay:${800 + i * 83}ms` : undefined}
              >
                <a class={mainLinkClass} href={link.href}>{link.label}</a>
              </li>
            {/each}
          </ul>

          <ul class="col-span-full mt-12 lg:col-span-4 lg:col-start-9 lg:mt-0">
            <li class="mb-6 text-label">Discover</li>
            {#each discoverLinks as link, i}
              <li
                class="transition-[transform,opacity] duration-[2400ms] ease-out-expo {open
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'}"
                style={open ? `transition-delay:${800 + i * 100}ms` : undefined}
              >
                <a class={subLinkClass} href={link.href}>{link.label}</a>
              </li>
            {/each}
          </ul>

          <ul class="col-span-full mt-12 lg:col-span-4 lg:col-start-13 lg:mt-0">
            <li class="mb-6 text-label">Connect</li>
            {#each connectLinks as link, i}
              <li
                class="transition-[transform,opacity] duration-[2400ms] ease-out-expo {open
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-6 opacity-0'}"
                style={open ? `transition-delay:${800 + i * 100}ms` : undefined}
              >
                <a class={subLinkClass} href={link.href}>{link.label}</a>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  {/if}
</nav>
