<script>
  export let data;

  // Mock region metadata for each country: our "locations" are countries, so
  // the card's second line carries the region rather than an address.
  const regions = {
    Anguilla: "Caribbean",
    "Antigua and Barbuda": "Caribbean",
    Barbados: "Caribbean",
    "Dominican Republic": "Caribbean",
    Mexico: "North America",
    "Saint Lucia": "Caribbean",
    "Saint Vincent and the Grenadines": "Caribbean",
    "Turks and Caicos Islands": "Caribbean",
    "United States": "North America",
  };

  // Mock photography: countries have no photos of their own, so tiles cycle
  // through the handful of images available in /static.
  const photos = [
    "/image.jpg",
    "/m.jpg",
    "/m2.jpg",
    "/upscaled.jpg",
    "/upscaled2.jpeg",
    "/7flntut11.jpg",
  ];

  let query = "";
  let region = "All";

  $: countries = (data?.countries ?? []).map((name, i) => ({
    name,
    region: regions[name] || "",
    image: photos[i % photos.length],
    href: "/search/" + encodeURIComponent(name),
  }));

  $: regionOptions = [
    "All",
    ...new Set(countries.map((c) => c.region).filter(Boolean)),
  ];

  $: filtered = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(query.trim().toLowerCase()) &&
      (region === "All" || c.region === region)
  );

  const featureIcons = {
    pool: "M12 21a9 9 0 0 0 9-9c0-4.5-9-12-9-12S3 7.5 3 12a9 9 0 0 0 9 9Z",
    beach:
      "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z",
    concierge:
      "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0",
    local:
      "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.5 0c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z",
  };

  const features = [
    { icon: "pool", label: "Private pools" },
    { icon: "beach", label: "Beachfront villas" },
    { icon: "concierge", label: "Concierge service" },
    { icon: "local", label: "Local experiences" },
  ];

  const avatars = ["A", "M", "S", "J"];
</script>

<svelte:head>
  <title>Our Locations | Villabound</title>
  <meta
    name="description"
    content="Browse exclusive villa rentals across the Caribbean and beyond."
  />
</svelte:head>

<!-- Page header -->
<section class="mx-auto w-full max-w-6xl px-6 pt-32 md:pt-40">
  <h1 class="text-4xl font-medium tracking-tight text-black">Our Locations</h1>
  <p class="mt-3 max-w-[560px] text-base text-black/80">
    From the heart of the islands to quieter corners, our homes are chosen to
    keep you relaxed, connected, and inspired
  </p>

  <!-- Filter bar -->
  <div class="mt-12 flex flex-col gap-4 sm:flex-row">
    <div>
      <label class="text-xs text-black" for="location-name">Name</label>
      <div
        class="mt-2 flex h-10 w-full items-center gap-2 rounded-lg border border-black/10 px-3 sm:w-60"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-4 shrink-0 text-black/80"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          id="location-name"
          type="text"
          placeholder="Search…"
          bind:value={query}
          class="w-full border-0 bg-transparent p-0 text-sm text-black placeholder-black/40 focus:ring-0"
        />
      </div>
    </div>

    <div>
      <label class="text-xs text-black" for="location-region">Region</label>
      <div class="relative mt-2">
        <select
          id="location-region"
          bind:value={region}
          class="h-10 w-full appearance-none rounded-lg border border-black/10 bg-transparent py-0 pl-3 pr-9 text-sm text-black focus:ring-0 sm:w-60"
        >
          {#each regionOptions as option}
            <option value={option}>{option}</option>
          {/each}
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-black/80"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </div>
  </div>

  <!-- Tile grid -->
  <div class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#each filtered as country}
      <a
        href={country.href}
        class="group relative aspect-[9/10] overflow-hidden rounded-2xl"
      >
        <img
          class="h-full w-full object-cover"
          src={country.image}
          alt="{country.name} villas"
          loading="lazy"
          decoding="async"
        />
        <div
          class="absolute inset-0 bg-linear-to-t from-black/90 to-transparent"
        ></div>
        <div
          class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4"
        >
          <div>
            <p class="text-base font-medium text-white">{country.name}</p>
            {#if country.region}
              <p class="text-sm text-neutral-300">{country.region}</p>
            {/if}
          </div>
          <span
            class="inline-flex h-11 items-center rounded-3xl bg-white px-6 text-base font-medium text-black"
          >
            View
          </span>
        </div>
      </a>
    {/each}

    {#if filtered.length === 0}
      <p class="col-span-full text-base text-black/80">No locations found.</p>
    {/if}
  </div>
</section>

<!-- CTA panel -->
<section class="mx-auto w-full max-w-6xl px-6 pt-10 pb-20">
  <div class="grid grid-cols-1 gap-12 rounded-2xl bg-black p-12 lg:grid-cols-3">
    <div class="lg:col-span-2">
      <h2 class="text-4xl font-medium tracking-tight text-white">
        Ready to find your escape?
      </h2>
      <p class="mt-4 max-w-[600px] text-base text-white">
        Join a community of travellers who value privacy, comfort, and a stay
        that feels effortless. Your villa is waiting.
      </p>
      <a
        href="/contact"
        class="mt-12 inline-flex h-12 items-center gap-4 rounded-3xl bg-white pl-6 pr-1 text-base font-medium text-black"
      >
        Contact us
        <span
          class="flex size-10 shrink-0 items-center justify-center rounded-full bg-black text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
        </span>
      </a>
    </div>

    <div>
      <ul class="space-y-2.5">
        {#each features as feature}
          <li class="flex items-center gap-3 text-base font-medium text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5 shrink-0"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d={featureIcons[feature.icon]}
              />
            </svg>
            {feature.label}
          </li>
        {/each}
      </ul>

      <div class="mt-8 flex items-center gap-4">
        <div class="flex -space-x-2">
          {#each avatars as initial}
            <span
              class="flex size-8 items-center justify-center rounded-full bg-white/10 text-xs font-medium text-white ring-2 ring-black"
            >
              {initial}
            </span>
          {/each}
        </div>
        <p class="text-sm text-white">Join 2,000+ travellers</p>
      </div>
    </div>
  </div>
</section>
