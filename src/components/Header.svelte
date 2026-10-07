<script>
  import { page } from "$app/state";

  let open = $state(false);
  let retracted = $state(false);
  let pill = $state(false);
  let lastY = 0;

  const THRESHOLD = 120;

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

  // Pages whose hero is dark under the transparent header
  const isHero = $derived(
    path === "/" || path === "/contact" || path.startsWith("/blog")
  );

  const inkWhite = $derived(open || (isHero && !pill));

  const currentPage = $derived(
    path === "/"
      ? "Home"
      : path.startsWith("/locations")
        ? "Locations"
        : path.startsWith("/about")
          ? "About"
          : path.startsWith("/owners")
            ? "Owners"
            : path.startsWith("/blog")
              ? "Blog"
              : path.startsWith("/contact")
                ? "Contact"
                : path.startsWith("/search")
                  ? "Search"
                  : path.startsWith("/favorites")
                    ? "Saved"
                    : "Menu"
  );

  const mainLinkClass =
    "relative inline-block font-satoshi text-heading after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-[cubic-bezier(.165,.84,.44,1)] hover:after:scale-x-100";
  const subLinkClass =
    "relative inline-block text-lg after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-[cubic-bezier(.165,.84,.44,1)] hover:after:scale-x-100";

  function onScroll() {
    if (open) return;
    const y = window.scrollY;
    if (y < THRESHOLD) {
      retracted = false;
      pill = false;
    } else if (y > lastY) {
      retracted = true;
      pill = false;
    } else if (y < lastY) {
      retracted = false;
      pill = true;
    }
    lastY = y;
  }

  function onKeydown(event) {
    if (event.key === "Escape" && open) open = false;
  }

  $effect(() => {
    lastY = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

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

<nav class="fixed inset-x-0 top-0 z-100" aria-label="Main">
  <!-- Scrim behind the open panel -->
  <div
    class="fixed inset-0 -z-20 bg-black/60 transition-opacity duration-700 ease-in-out-cubic {open
      ? 'opacity-100'
      : 'pointer-events-none opacity-0'}"
    onclick={() => (open = false)}
    aria-hidden="true"
  ></div>

  <div class="relative">
    <!-- Slab and layered colour bands -->
    <div
      class="absolute inset-x-0 -top-3 -z-10 h-[calc(100%_+_12px)] overflow-hidden bg-bound transition-transform duration-700 ease-in-out-cubic {open
        ? 'translate-y-0'
        : '-translate-y-full'}"
      aria-hidden="true"
    >
      <div
        class="absolute inset-x-0 bottom-0 z-4 h-1/2 origin-bottom bg-bone transition-transform delay-[320ms] duration-[730ms] ease-in-out-cubic {open
          ? 'scale-y-0'
          : 'scale-y-100'}"
      ></div>
      <div
        class="absolute inset-x-0 bottom-0 z-3 h-[70%] origin-bottom bg-bound transition-transform delay-[105ms] duration-[900ms] ease-in-out-cubic {open
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

    <!-- Bar -->
    <header
      class="relative z-10 flex h-12 items-center px-4 text-caption transition-transform before:absolute before:inset-x-2 before:top-0 before:-z-10 before:h-12 before:rounded-[56px] before:bg-bone before:shadow-[0_1px_1px_rgba(0,0,0,0.23)] before:transition-opacity before:duration-400 before:ease-out-cubic before:content-[''] sm:px-6 md:h-16 md:px-8 md:before:inset-x-5 md:before:top-2 lg:h-20 lg:px-10 lg:before:inset-x-6 lg:before:top-2.5 lg:before:h-[60px] {inkWhite
        ? 'text-white'
        : 'text-black'} {retracted
        ? '-translate-y-[105%] duration-500 ease-in-cubic'
        : 'translate-y-1.5 duration-400 ease-out-cubic'} {pill && !open
        ? 'before:opacity-100'
        : 'before:opacity-0'}"
    >
      <div class="flex items-center gap-4">
        <button
          type="button"
          class="relative size-[34px] shrink-0 transition duration-700 ease-in-out-cubic md:size-[27px] lg:size-[33px]"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onclick={() => (open = !open)}
        >
          <span
            class="absolute top-1/2 left-1/2 h-0.5 w-full -translate-x-1/2 rounded-full bg-current transition duration-700 ease-in-out-cubic {open
              ? '-translate-y-1/2 rotate-45'
              : 'translate-y-[calc(-50%_-_2.5px)]'}"
          ></span>
          <span
            class="absolute top-1/2 left-1/2 h-0.5 w-full -translate-x-1/2 rounded-full bg-current transition duration-700 ease-in-out-cubic {open
              ? '-translate-y-1/2 -rotate-45'
              : 'translate-y-[calc(-50%_+_2.5px)]'}"
          ></span>
        </button>
        <span
          class="transition duration-400 ease-in-out-cubic {open
            ? 'translate-x-8 opacity-0'
            : ''}"
        >
          {currentPage}
        </span>
      </div>

      <a
        href="/"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-label="Villabound home"
      >
        <img
          src="/vb.png"
          alt="Villabound"
          class="h-8 w-auto {inkWhite ? '' : 'invert'}"
        />
      </a>

      <a
        href="/contact"
        class="ml-auto inline-flex items-center gap-2 transition-opacity hover:opacity-70"
      >
        Enquire
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 19.5 19.5 4.5m0 0H8.25m11.25 0v11.25"
          />
        </svg>
      </a>
    </header>

    <!-- Open panel: collapses via grid rows so link transitions still fire -->
    <div
      class="relative z-10 grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-in-out-cubic {open
        ? 'grid-rows-[1fr]'
        : ''}"
    >
      <div class="overflow-hidden" inert={!open} aria-hidden={!open}>
        <div class="v-band pt-[min(16rem,17.7vh)] pb-20 text-white">
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
  </div>
</nav>
