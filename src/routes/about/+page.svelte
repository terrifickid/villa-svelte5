<script>
  // Copy inlined from content/about.md (kept verbatim).
  const whatWeDo = [
    "We fit into the demanding needs and schedules of our clientele.",
    "We have a large and growing portfolio of properties.",
    "We guarantee confidentiality.",
    "We have created invaluable partnerships with a growing international team to not only expand our offering but to see that all our clients’ get the best service on any vacation in any country.",
    "We work with very selective property owners, whose homes are considered to be livable works of art.",
  ];
</script>

<svelte:head>
  <title>About Villabound | Villabound</title>
  <meta
    name="description"
    content="Villabound was established in 2011 by Lily Dash to source unique and exclusive villas around the world for a discerning clientele."
  />
</svelte:head>

<section class="mx-auto w-full max-w-6xl px-6 pt-32 pb-20 md:pt-40">
  <h1 class="text-4xl font-medium tracking-tight text-black">
    About Villabound
  </h1>

  <div class="mt-6 max-w-[680px] space-y-6 text-base text-black/80">
    <p>
      Villabound was established in 2011 by a dynamic Barbadian entrepreneur Lily
      Dash. The company grew out of her initial company Caribound; a specialized
      service focused on Caribbean villa rentals.
    </p>
    <p>
      In a few short years Lily took her experiences of villa rentals in the
      premium market of Barbados and applied them to markets across the globe.
      Villabound was designed to cater to the needs of a high-end, discerning and
      discreet clientele. As a result our service involves the sourcing of unique
      and exclusive villas around the world, meeting the demands of our clients
      schedules. Every villa is carefully cultivated and represents the finest
      selection each country has to offer. Boasting details such as high-end
      amenities, inclusion of staff, priceless art pieces, fantastic furnishings
      as well as unimaginable features from gyms to personal spas.
    </p>
  </div>

  <div class="mt-16">
    <h2 class="text-3xl font-medium tracking-tight text-black">What We Do</h2>
    <p class="mt-4 max-w-[680px] text-base text-black/80">
      Villabound is young company with a fresh view.
    </p>
    <ul
      class="mt-6 grid max-w-[900px] grid-cols-1 gap-x-10 gap-y-3 md:grid-cols-2"
    >
      {#each whatWeDo as item}
        <li class="flex items-start gap-3 text-base text-black/80">
          <span class="mt-2.5 size-1.5 shrink-0 rounded-full bg-black"></span>
          <span>{item}</span>
        </li>
      {/each}
    </ul>
  </div>

  <div class="mt-16">
    <h2 class="text-3xl font-medium tracking-tight text-black">
      Villabound’s Atelier Service
    </h2>
    <p class="mt-4 max-w-[680px] text-base text-black/80">
      This is a private exclusive service offered by the Villabound Team. The
      service provides clients with a dedicated Villa Specialist. From finding
      tailor-made villas to catering to any lifestyle need.
    </p>
  </div>

  <p class="mt-16 text-base text-black">
    For more about this unique service<br />
    Call:
    <a class="underline hover:opacity-70" href="tel:+12464245075">
      +1 (246) 424-5075
    </a>
  </p>
</section>
