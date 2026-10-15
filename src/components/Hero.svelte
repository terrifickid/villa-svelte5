<script>
  import { goto } from "$app/navigation";
  import Spinner from "../components/Spinner.svelte";

  function parseISO(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  function toISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function addDays(iso, days) {
    const d = parseISO(iso);
    d.setDate(d.getDate() + days);
    return toISO(d);
  }

  function getNextFriday() {
    const now = new Date();
    const daysUntilFriday = (5 - now.getDay() + 7) % 7;
    const nextFriday = new Date(now);
    nextFriday.setDate(now.getDate() + daysUntilFriday);
    return toISO(nextFriday);
  }

  const today = toISO(new Date());

  let searching = false;
  let search = {
    checkIn: getNextFriday(),
    checkOut: addDays(getNextFriday(), 3),
    minOccupancy: "2",
  };

  function syncCheckOut() {
    if (search.checkIn && search.checkOut <= search.checkIn) {
      search.checkOut = addDays(search.checkIn, 3);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    searching = true;
    const queryParams = new URLSearchParams(search).toString();
    goto(`/search?${queryParams}`, false);
  }

  export let data;
</script>

<div class="relative">
  <!-- Video band: full-bleed, 75vh -->
  <div class="relative h-[75vh] overflow-hidden bg-black">
    <video
      class="absolute inset-0 h-full w-full object-cover object-center"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      aria-hidden="true"
    >
      <source src="/v2.mp4#t=0.001" type="video/mp4" />
    </video>
    <!-- Legibility wash behind the heading -->
    <div
      class="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/70 to-transparent"
      aria-hidden="true"
    ></div>
    <!-- Wordmark and logo lockup -->
    <div
      class="pointer-events-none absolute inset-0 z-10 flex flex-col items-left justify-left gap-8 text-center p-16"
    >
      <h1
        style="background-image: url('vsb.png'); background-repeat: none; background-size: contain; background-position: top left;"
        class="font-oldstandard text-white flex items-center h-[5rem] text-[5rem] bg-no-repeat"
      >
        <img
          src="/vb-logo-e.svg"
          alt=""
          aria-hidden="true"
          class="h-full brightness-0 invert"
        />
        <span
          class="block text-[0.46em] h-[0] leading-[0.35] pl-[0.35em] tracking-[0.193em]"
          style="text-justify: inter-character;"
        >
          VI<span class="pl-0.5"
            >LL<span class="pl-0.5">ABOUN<span class="-ml-1">D</span></span
            ></span
          >
        </span>
      </h1>
      <div class="flex items-center justify-center gap-10">
        <!-- Default (black) version -->
        <img
          src="/vb-logo-test.svg"
          alt="Villabound"
          class="h-20 w-auto sm:h-24"
        />
        <!-- White version -->
        <img
          src="/vb-logo-test.svg"
          alt=""
          aria-hidden="true"
          class="h-20 w-auto brightness-0 invert sm:h-24"
        />
      </div>
    </div>
  </div>

  <!-- Heading and search box: the block is half a box taller than the video,
       then translated up by half its height so the video's bottom edge lands
       at the vertical midpoint of the search box. -->
  <div class="shell px-10">
    <div class="relative z-10 -translate-y-1/2">
      <h2
        class="absolute bottom-full left-0 mb-6 max-w-2xl font-satoshi text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] tracking-[-0.03em] text-white"
      >
        Let us find you a place to stay
      </h2>

      <h2 class="hidden">
        A curated collection of exclusive beachfront and private estates in the
        Caribbean and worldwide — featuring infinity pools, ocean views, and
        exceptional amenities.
      </h2>

      <form
        onsubmit={handleSubmit}
        class="grid grid-cols-1 gap-4 rounded-xl bg-black p-6 ring-1 ring-white/10 md:grid-cols-2 lg:grid-cols-5"
      >
        <!-- Location -->
        <div>
          <label
            for="location"
            class="flex items-center gap-2 text-caption text-white/80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            Location
          </label>
          <select
            id="location"
            bind:value={search.country}
            name="country"
            class="mt-2 block w-full rounded-md border-0 bg-white/10 py-2 pl-3 pr-8 text-white ring-1 ring-inset ring-white/25 focus:ring-2 focus:ring-bound focus:outline-none"
          >
            {#each data.countries as country}
              <option value={country}>{country}</option>
            {/each}
          </select>
        </div>

        <!-- Guests -->
        <div>
          <label
            for="guests"
            class="flex items-center gap-2 text-caption text-white/80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            Guests
          </label>
          <select
            id="guests"
            bind:value={search.minOccupancy}
            name="minOccupancy"
            class="mt-2 block w-full rounded-md border-0 bg-white/10 py-2 pl-3 pr-8 text-white ring-1 ring-inset ring-white/25 focus:ring-2 focus:ring-bound focus:outline-none"
          >
            {#each ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] as guests}
              <option value={guests}>{guests}</option>
            {/each}
          </select>
        </div>

        <!-- Dates -->
        <div>
          <div class="mb-2 flex items-center gap-2 text-caption text-white/80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
            Check-in
          </div>
          <input
            id="checkIn"
            type="date"
            bind:value={search.checkIn}
            min={today}
            onchange={syncCheckOut}
            style="color-scheme: dark;"
            class="mt-2 block w-full rounded-md border-0 bg-white/10 py-2 pl-3 pr-3 text-white ring-1 ring-inset ring-white/25 focus:ring-2 focus:ring-bound focus:outline-none"
          />
        </div>

        <div>
          <div class="mb-2 flex items-center gap-2 text-caption text-white/80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
            Check-out
          </div>
          <input
            id="checkOut"
            type="date"
            bind:value={search.checkOut}
            min={search.checkIn}
            style="color-scheme: dark;"
            class="mt-2 block w-full rounded-md border-0 bg-white/10 py-2 pl-3 pr-3 text-white ring-1 ring-inset ring-white/25 focus:ring-2 focus:ring-bound focus:outline-none"
          />
        </div>

        <!-- Search -->
        <div class="flex items-end">
          <button
            type="submit"
            class="inline-flex w-full cursor-pointer items-center justify-center rounded-md bg-white px-6 py-3 text-center text-caption font-medium text-black duration-200 hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-bound"
          >
            {#if searching}
              <Spinner />
            {:else}
              Search
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
