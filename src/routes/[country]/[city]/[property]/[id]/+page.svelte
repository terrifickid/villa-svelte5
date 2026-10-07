<script>
  export let data = {
    pictures: [],
    picture: {},
    publicDescription: {},
    amenities: [],
    address: {},
    prices: {},
    nickname: "Unknown Property",
    accommodates: 0,
    bedrooms: 0,
    bathrooms: 0,
  };
  import _ from "lodash";
  import Hubspot from "$components/Hubspot.svelte";

  let more = true;
  let activeTab = "overview";

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "gallery", label: "Gallery" },
    { id: "amenities", label: "Amenities" },
    { id: "location", label: "Location" },
  ];

  const icons = {
    guests:
      "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z",
    bedrooms:
      "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
    bathrooms:
      "M12 21a9 9 0 0 0 9-9c0-4.5-9-12-9-12S3 7.5 3 12a9 9 0 0 0 9 9Z",
    home: "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
    key: "M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z",
    check: "m4.5 12.75 6 6 9-13.5",
  };

  const summary = _.get(data, "publicDescription.summary", "");
  const pictures = _.get(data, "pictures", []);
  const city = _.get(data, "address.city", "");
  const country = _.get(data, "address.country", "");

  function imageOf(picture) {
    return _.get(picture, "original") || "/p.svg";
  }

  function fallbackImage() {
    return _.get(data, "picture.large") || "/p.svg";
  }

  function fullAddress() {
    const full = _.get(data, "address.full");
    if (full) return full;
    return [
      _.get(data, "address.street"),
      _.get(data, "address.city"),
      _.get(data, "address.country"),
    ]
      .filter(Boolean)
      .join(", ");
  }

  function roomTypeLabel() {
    const roomType = _.get(data, "roomType", "");
    if (roomType === "Entire home/apt") return "Entire home";
    return roomType || "Entire home";
  }

  function villaCards() {
    const cards = [
      {
        icon: "home",
        title: _.get(data, "propertyType", "Villa"),
        subtitle: "Your own private retreat",
      },
      {
        icon: "key",
        title: roomTypeLabel(),
        subtitle: "No shared spaces",
      },
      {
        icon: "guests",
        title: `Sleeps ${_.get(data, "accommodates", 0)}`,
        subtitle: "Room for the whole group",
      },
    ];
    if (_.get(data, "bedrooms", 0) > 0) {
      cards.push({
        icon: "bedrooms",
        title: `${_.get(data, "bedrooms")} bedrooms`,
        subtitle: "Space to spread out",
      });
    }
    return cards.slice(0, 4);
  }

  const otherVillas = [
    { name: "Villa Coral", image: "/m.jpg" },
    { name: "Villa Palms", image: "/m2.jpg" },
    { name: "Villa Azure", image: "/upscaled.jpg" },
  ];
</script>

<svelte:head>
  <title>{_.get(data, "nickname", "Property")} | Villabound</title>
  <meta
    name="description"
    content={summary.slice(0, 160) || "An exclusive villa rental."}
  />
</svelte:head>

<!-- Header stack: breadcrumb, name, address -->
<section class="v-band">
  <nav class="col-span-full" aria-label="Breadcrumb">
    <ol class="flex flex-wrap items-center gap-2 text-caption text-black/80">
      <li>
        <a
          class="transition-colors duration-300 ease-in-out hover:text-neutral-600/80"
          href="/">Home</a
        >
      </li>
      <li aria-hidden="true" class="text-black/30">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-4 w-4"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </li>
      <li>
        <a
          class="transition-colors duration-300 ease-in-out hover:text-neutral-600/80"
          href="/locations">Locations</a
        >
      </li>
      <li aria-hidden="true" class="text-black/30">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-4 w-4"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </li>
      <li aria-current="page" class="text-black">
        {_.get(data, "nickname", "Property")}
      </li>
    </ol>
  </nav>

  <h1 class="col-span-full mt-6 font-satoshi text-display text-black lg:col-span-12">
    {_.get(data, "nickname", "Property")}
  </h1>

  {#if fullAddress()}
    <p class="col-span-full mt-2 flex items-center gap-2 text-caption text-black/80 lg:col-span-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-4 w-4 shrink-0"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        />
      </svg>
      <span>{fullAddress()}</span>
    </p>
  {/if}

  <!-- One-plus-quadrant photo cluster -->
  <div class="col-span-full mt-8">
  {#if pictures.length >= 2}
    <div class="grid grid-cols-5 gap-4">
      <div class="col-span-3 overflow-hidden rounded-2xl">
        <img
          class="aspect-[3/2] h-full w-full object-cover"
          src={imageOf(pictures[0])}
          alt="{_.get(data, 'nickname', 'Property')} photo 1"
        />
      </div>
      <div class="col-span-2 grid grid-cols-2 gap-4">
        {#each pictures.slice(1, 5) as picture, i}
          <div class="overflow-hidden rounded-2xl">
            <img
              class="aspect-square h-full w-full object-cover"
              src={imageOf(picture)}
              alt="{_.get(data, 'nickname', 'Property')} photo {i + 2}"
              loading="lazy"
              decoding="async"
            />
          </div>
        {/each}
      </div>
    </div>
  {:else}
    <div class="overflow-hidden rounded-2xl">
      <img
        class="aspect-[3/2] w-full object-cover"
        src={pictures.length ? imageOf(pictures[0]) : fallbackImage()}
        alt={_.get(data, "nickname", "Property")}
      />
    </div>
  {/if}
  </div>
</section>

<!-- Content block: left column plus sticky enquiry rail -->
<section class="v-band">
  <div class="contents">
    <div class="col-span-full lg:col-span-8">
      <!-- Anchor tabs -->
      <div class="flex flex-wrap items-center gap-8">
        {#each tabs as tab}
          <a
            href="#{tab.id}"
            on:click={() => (activeTab = tab.id)}
            class="border-b pb-1 text-body font-medium {activeTab === tab.id
              ? 'border-black text-black'
              : 'border-transparent text-black/80'}"
          >
            {tab.label}
          </a>
        {/each}
      </div>

      <!-- Overview paragraph -->
      {#if summary}
        <div id="overview" class="scroll-mt-24 pt-6">
          <p class:line-clamp-6={more} class="whitespace-pre-line text-body text-black/80">
            {summary}
          </p>
          {#if summary.length > 320}
            <button
              type="button"
              on:click={() => (more = !more)}
              class="mt-4 text-caption text-black/80 underline"
            >
              {more ? "Show more" : "Show less"}
            </button>
          {/if}
        </div>
      {/if}

      <!-- Unboxed stat line -->
      <div class="flex flex-wrap items-center gap-x-12 gap-y-4 pt-8">
        <p class="flex items-center gap-2 text-body font-medium text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d={icons.guests} />
          </svg>
          {_.get(data, "accommodates", 0)} guests
        </p>
        <p class="flex items-center gap-2 text-body font-medium text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d={icons.bedrooms} />
          </svg>
          {_.get(data, "bedrooms", 0)} bedrooms
        </p>
        <p class="flex items-center gap-2 text-body font-medium text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d={icons.bathrooms} />
          </svg>
          {_.get(data, "bathrooms", 0)} bathrooms
        </p>
      </div>

      <!-- The villa: white-on-white cards -->
      <div class="pt-12">
        <h3 class="font-satoshi text-standfirst font-medium text-black">The villa</h3>
        <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {#each villaCards() as card}
            <div
              class="flex items-center gap-4 rounded-2xl border border-black/10 bg-white p-4"
            >
              <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 text-black"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d={icons[card.icon]} />
                </svg>
              </div>
              <div>
                <p class="text-body font-medium text-black">{card.title}</p>
                <p class="text-caption text-black/80">{card.subtitle}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Gallery: remaining photographs -->
      {#if pictures.length > 5}
        <div id="gallery" class="scroll-mt-24 pt-12">
          <h3 class="font-satoshi text-standfirst font-medium text-black">Gallery</h3>
          <div class="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {#each pictures.slice(5) as picture, i}
              <div class="overflow-hidden rounded-2xl">
                <img
                  class="aspect-square h-full w-full object-cover"
                  src={imageOf(picture)}
                  alt="{_.get(data, 'nickname', 'Property')} photo {i + 6}"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Amenities: two-column icon list -->
      {#if _.get(data, "amenities", []).length > 0}
        <div id="amenities" class="scroll-mt-24 pt-12">
          <h3 class="font-satoshi text-standfirst font-medium text-black">Amenities</h3>
          <ul class="mt-6 columns-1 gap-4 sm:columns-2">
            {#each _.get(data, "amenities", []) as amenity}
              <li
                class="mb-4 flex break-inside-avoid items-center gap-4 text-body text-black/80"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 shrink-0 text-black"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d={icons.check} />
                </svg>
                {amenity}
              </li>
            {/each}
          </ul>
        </div>
      {/if}

      <!-- Location -->
      <div id="location" class="scroll-mt-24 pt-12">
        <h3 class="font-satoshi text-standfirst font-medium text-black">Location</h3>
        <p class="mt-6 flex items-center gap-2 text-body text-black/80">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5 shrink-0 text-black"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <span>{fullAddress()}</span>
        </p>
        <p class="mt-4 text-body text-black/80">
          Get in touch and we'll share arrival details, check-in times and
          everything you need for the drive in.
        </p>
      </div>
    </div>

    <!-- Sticky enquiry rail -->
    <aside class="col-span-full mt-12 lg:col-span-5 lg:col-start-12 lg:mt-0">
      <Hubspot {data} />
    </aside>
  </div>
</section>

<!-- Other villas in the city -->
<section class="v-band">
  <h3 class="col-span-full font-satoshi text-standfirst font-medium text-black lg:col-span-7">
    Other villas in {city || country || "the area"}
  </h3>
  <a
    href="/search/{encodeURIComponent(city || country || "")}"
    class="col-span-full mt-4 inline-flex h-11 w-fit items-center rounded-3xl border border-black/10 bg-black/[0.01] px-6 text-caption font-medium text-black lg:col-start-14 lg:col-span-3 lg:mt-0 lg:justify-self-end"
  >
    View All Locations
  </a>

  <div class="col-span-full mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {#each otherVillas as villa}
      <a
        href="/search/{encodeURIComponent(city || country || "")}"
        class="group relative aspect-[9/10] overflow-hidden rounded-2xl"
      >
        <img
          class="h-full w-full object-cover"
          src={villa.image}
          alt="{villa.name} in {city}"
          loading="lazy"
          decoding="async"
        />
        <div class="absolute inset-0 bg-linear-to-t from-black/90 to-transparent"></div>
        <div class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4">
          <div>
            <p class="text-body font-medium text-white">{villa.name}</p>
            <p class="text-caption text-neutral-300">{city}{country ? `, ${country}` : ""}</p>
          </div>
          <span
            class="inline-flex h-11 items-center rounded-3xl bg-white px-6 text-caption font-medium text-black"
          >
            View
          </span>
        </div>
      </a>
    {/each}
  </div>
</section>
