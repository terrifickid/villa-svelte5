<script>
  export let data;

  // Countries have no photography of their own, so tiles cycle through the
  // handful of images available in /static (same set as the locations page).
  const photos = [
    "/image.jpg",
    "/m.jpg",
    "/m2.jpg",
    "/upscaled.jpg",
    "/upscaled2.jpeg",
    "/7flntut11.jpg",
  ];
</script>

<section
  class="shell grid grid-cols-16 gap-x-4 px-10 py-24 leading-snug tracking-[-0.02em]"
>
  <p class="col-span-full text-label font-medium uppercase tracking-[0.25em] text-black/50">
    Destinations
  </p>
  <h2
    class="col-span-full mt-6 font-satoshi text-heading text-black lg:col-span-7"
  >
    Sought-after places to stay
  </h2>
  <p
    class="col-span-full mt-6 max-w-md text-body text-black/70 lg:col-span-5 lg:col-start-12 lg:mt-8 lg:self-end"
  >
    A curated selection of exclusive properties, nestled in the world's most
    in-demand destinations.
  </p>

  <div
    class="col-span-full mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
  >
    {#each data.countries as country, i}
      <a
        href={"/search/" + encodeURIComponent(country)}
        class="group relative aspect-[4/5] overflow-hidden rounded-md bg-gray-100"
      >
        <img
          src={photos[i % photos.length]}
          alt={country}
          class="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div
          class="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"
        ></div>
        <div
          class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6"
        >
          <h3 class="font-satoshi text-standfirst font-medium text-white">
            {country}
          </h3>
          <span
            class="grid size-10 shrink-0 place-items-center rounded-md bg-white/10 text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-white group-hover:text-black"
            aria-hidden="true"
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
                d="M4.5 12h15m0 0-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </span>
        </div>
      </a>
    {/each}
  </div>
</section>
