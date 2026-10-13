<script>
  // Plain JSON object
  const services = [
    {
      title: "Personal Concierge",
      description:
        "Your concierge plans your trip well before arrival and manages it actively once you’re here.",
    },
    {
      title: "Private Chef",
      description:
        "Restaurant-level cooking tailored to your group’s tastes, timing, and pace.",
    },
    {
      title: "Personal Butler",
      description:
        "Manages service, setup, and daily villa operations seamlessly.",
    },
    {
      title: "Transportation",
      description:
        "Professional chauffeur service with local knowledge and real-time coordination.",
    },
    {
      title: "Celebrations",
      description:
        "Spacious layouts and ocean views perfect for memorable gatherings.",
    },
    {
      title: "Corporate Retreats",
      description:
        "Private spaces designed for focus, collaboration, and connection.",
    },
    {
      title: "Families",
      description: "Spacious layouts and thoughtful comforts for all generations.",
    },
    {
      title: "Couples",
      description: "Intimate villas with private pools and ocean terraces.",
    },
  ];
</script>

<section
  class="shell grid grid-cols-16 gap-x-4 px-10 py-24 leading-snug tracking-[-0.02em]"
>
  <p class="col-span-full text-label font-medium uppercase tracking-[0.25em] text-black/50">
    What’s included
  </p>
  <h2
    class="col-span-full mt-6 font-satoshi text-heading text-black lg:col-span-7"
  >
    A private team, at your service
  </h2>
  <p
    class="col-span-full mt-6 max-w-md text-body text-black/70 lg:col-span-5 lg:col-start-12 lg:mt-8 lg:self-end"
  >
    Every Villabound stay is staffed and supported, so the only thing left to do
    is relax.
  </p>

  <div
    class="col-span-full mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
  >
    {#each services as service, i}
      <article
        class="group flex flex-col rounded-md border border-black/10 bg-white p-10 transition-colors duration-300 hover:border-black hover:bg-black"
      >
        <span
          class="text-label tabular-nums text-black/40 transition-colors duration-300 group-hover:text-white/50"
        >
          {String(i + 1).padStart(2, "0")}
        </span>
        <h3
          class="mt-8 font-satoshi text-standfirst font-medium text-black transition-colors duration-300 group-hover:text-white"
        >
          {service.title}
        </h3>
        <p
          class="mt-4 text-body text-black/70 transition-colors duration-300 group-hover:text-white/70"
        >
          {service.description}
        </p>
      </article>
    {/each}
  </div>
</section>
