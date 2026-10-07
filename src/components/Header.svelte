<script>
  import { page } from "$app/state";

  let open = $state(false);
  let retracted = $state(false);
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

  const mainLinkClass =
    "relative inline-block font-satoshi text-heading after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-[cubic-bezier(.165,.84,.44,1)] hover:after:scale-x-100";
  const subLinkClass =
    "relative inline-block text-lg after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-[cubic-bezier(.165,.84,.44,1)] hover:after:scale-x-100";

  function onScroll() {
    if (open) return;
    const y = window.scrollY;
    if (y < THRESHOLD) {
      retracted = false;
    } else if (y > lastY) {
      retracted = true;
    } else if (y < lastY) {
      retracted = false;
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
      class="relative z-10 flex h-12 items-center px-6 text-caption text-white transition-transform before:absolute before:inset-x-2 before:top-2 before:bottom-2 before:-z-10 before:rounded-md before:bg-black before:shadow-[0_1px_2px_rgba(0,0,0,0.3)] before:content-[''] sm:px-8 sm:before:inset-x-4 md:h-16 md:px-12 md:before:inset-x-6 lg:h-20 lg:px-16 lg:before:inset-x-8 lg:before:top-2.5 lg:before:bottom-2.5 {retracted
        ? '-translate-y-[105%] duration-500 ease-in-cubic'
        : 'translate-y-0 duration-400 ease-out-cubic'}"
    >
      <a href="/" aria-label="Villabound home">
        <img src="/vb.png" alt="Villabound" class="h-8 w-auto" />
      </a>

      <button
        type="button"
        class="relative ml-auto size-[34px] shrink-0 transition duration-700 ease-in-out-cubic md:size-[27px] lg:size-[33px]"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onclick={() => (open = !open)}
      >
        <span
          class="absolute top-1/2 left-1/2 h-0.5 w-full -translate-x-1/2 rounded-md bg-current transition duration-700 ease-in-out-cubic {open
            ? '-translate-y-1/2 rotate-45'
            : 'translate-y-[calc(-50%_-_2.5px)]'}"
        ></span>
        <span
          class="absolute top-1/2 left-1/2 h-0.5 w-full -translate-x-1/2 rounded-md bg-current transition duration-700 ease-in-out-cubic {open
            ? '-translate-y-1/2 -rotate-45'
            : 'translate-y-[calc(-50%_+_2.5px)]'}"
        ></span>
      </button>
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
