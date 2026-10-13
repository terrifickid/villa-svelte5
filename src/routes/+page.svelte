<script>
  import Hero from "../components/Hero.svelte";
  import Destinations from "../components/Destinations.svelte";
  import Difference from "../components/Difference.svelte";
  import Features from "../components/Features.svelte";
  import Faq from "../components/Faq.svelte";
  import Ready from "../components/Ready.svelte";

  export let data;
</script>

<Hero {data} />

<!-- Intro / manifesto -->
<section class="shell grid grid-cols-16 gap-x-4 px-10 py-24 leading-snug tracking-[-0.02em]">
  <div class="col-span-full lg:col-span-7">
    <p class="text-label font-medium uppercase tracking-[0.25em] text-black/50">
      Est. 2011 — Caribbean &amp; beyond
    </p>
    <h2 class="mt-8 font-satoshi text-heading text-black">
      Extraordinary retreats, privately staffed and quietly curated.
    </h2>
  </div>

  <div
    class="col-span-full mt-10 flex flex-col items-start lg:col-span-6 lg:col-start-11 lg:mt-0 lg:self-end"
  >
    <p class="text-body text-black/70">
      Villabound grew out of Caribound, a specialised Caribbean villa service.
      Today we place guests in hand-picked private residences worldwide — each
      one inspected, staffed and ready for you.
    </p>
    <a
      href="/about"
      class="mt-8 inline-flex h-12 items-center rounded-md border border-black px-6 text-caption font-medium text-black transition-colors duration-300 hover:bg-black hover:text-white"
    >
      Our story
    </a>
  </div>

  <dl
    class="col-span-full mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-black/10 bg-black/10 sm:grid-cols-3"
  >
    <div class="bg-white p-10">
      <dt class="font-satoshi text-heading text-black">2011</dt>
      <dd class="mt-4 text-body text-black/70">
        Founded by Lily Dash in Barbados.
      </dd>
    </div>
    <div class="bg-white p-10">
      <dt class="font-satoshi text-heading text-black">
        {data.countries.length}
      </dt>
      <dd class="mt-4 text-body text-black/70">
        Curated destinations across the Caribbean and beyond.
      </dd>
    </div>
    <div class="bg-white p-10">
      <dt class="font-satoshi text-heading text-black">24/7</dt>
      <dd class="mt-4 text-body text-black/70">
        Chef, butler and concierge, on call throughout your stay.
      </dd>
    </div>
  </dl>
</section>

<Destinations {data} />
<Difference />
<Features />
<Faq />
<Ready />
