<script>
  // FAQ accordion: the first row is open on load.
  let openIndex = 0;
  function toggle(i) {
    openIndex = openIndex === i ? -1 : i;
  }

  // The enquiry form is a demo: it validates client-side and does not submit.
  function handleSubmit(event) {
    event.preventDefault();
  }

  let help = "Select…";

  const contactRows = [
    {
      icon: "mail",
      value: "LILY@VILLABOUND.COM",
      href: "mailto:lily@villabound.com",
    },
    {
      icon: "phone",
      value: "+1 (246) 424-5075",
      href: "tel:+12464245075",
    },
    {
      icon: "pin",
      value: "Suite 1, Barbados Golf Club, Christ Church",
      href: null,
    },
    {
      icon: "clock",
      value: "Mon–Fri 9:00 AM – 5:00 PM · Sat 9:00 AM – 12:00 PM · Sun closed",
      href: null,
    },
  ];

  const icons = {
    mail: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75",
    phone:
      "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z",
    pin: "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.5 0c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z",
    clock: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    plus: "M12 4.5v15m7.5-7.5h-15",
  };

  const faqs = [
    {
      q: "Can I view a villa before booking?",
      a: "Absolutely. Send us a note and we’ll arrange a time — no strings attached. We’ll walk you through the villa and help you plan the rest of your stay.",
    },
    {
      q: "What are your opening hours?",
      a: "Weekdays 9:00 AM to 5:00 PM, Saturday 9:00 AM to 12:00 PM. Sundays and public holidays we’re closed.",
    },
    {
      q: "What’s included in the nightly rate?",
      a: "The villa, its team and its amenities. Extras like a private chef or a driver are arranged on request.",
    },
    {
      q: "Are pets allowed?",
      a: "Some of our homes welcome pets. Tell us what you’re travelling with and we’ll match you to one.",
    },
    {
      q: "How does the concierge service work?",
      a: "One point of contact from the moment you book, handling transfers, groceries, tables and anything else.",
    },
    {
      q: "Can I change my dates after booking?",
      a: "Usually, yes. Let us know as early as you can and we’ll move your stay or credit it to another villa.",
    },
  ];

  const testimonials = [
    {
      rating: "4.9",
      quote:
        "\"Booked a villa in Anguilla for a week — the concierge handled everything before we landed.\"",
      initial: "L",
      name: "Liam R.",
      role: "Villabound guest",
    },
    {
      rating: "5",
      quote:
        "\"Three trips with Villabound and not one thing to chase. It just works.\"",
      initial: "N",
      name: "Nora G.",
      role: "Villabound guest",
    },
    {
      rating: "4.5",
      quote:
        "\"We travel as a family of nine, and the house fit us exactly as described.\"",
      initial: "Z",
      name: "Zoe D.",
      role: "Villabound guest",
    },
    {
      rating: "5",
      quote:
        "\"The local recommendations were worth the booking on their own.\"",
      initial: "T",
      name: "Tom & Aisha",
      role: "Villabound guest",
    },
  ];

  // Two edge-clipped rows repeating the same four quotes, the second rotated.
  const rowOne = [...testimonials, ...testimonials];
  const rowTwo = [...testimonials.slice(2), ...testimonials.slice(0, 2)];
</script>

<svelte:head>
  <title>Contact | Villabound</title>
  <meta
    name="description"
    content="Get in touch with Villabound to plan your next private villa escape."
  />
</svelte:head>

<!-- Black hero: invitation plus the inline enquiry form -->
<section class="v-band bg-black text-white">
  <div class="contents">
    <div class="col-span-full lg:col-span-8">
      <h1 class="font-satoshi text-display text-white">Let’s connect</h1>
      <p class="mt-6 max-w-2xl text-body text-white">
        Got a question? Want to book a villa or just say hi? We’d love to hear
        from you.
      </p>

      <div class="mt-16 space-y-2">
        {#each contactRows as row}
          <div class="flex items-center gap-2 text-body text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5 shrink-0"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d={icons[row.icon]} />
            </svg>
            {#if row.href}
              <a class="hover:text-neutral-300" href={row.href}>{row.value}</a>
            {:else}
              <span>{row.value}</span>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- Form: no panel behind it -->
    <form
      class="col-span-full mt-16 flex flex-col gap-4 lg:col-span-7 lg:col-start-10 lg:mt-0"
      on:submit={handleSubmit}
    >
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label class="text-label text-white" for="name">Name</label>
          <div class="mt-2.5 rounded-lg bg-neutral-400/15 p-3">
            <input
              id="name"
              type="text"
              placeholder="Your name"
              class="w-full border-0 bg-transparent p-0 text-sm text-white placeholder-neutral-400 focus:ring-0"
            />
          </div>
        </div>

        <div>
          <label class="text-label text-white" for="email">Email</label>
          <div class="mt-2.5 rounded-lg bg-neutral-400/15 p-3">
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              class="w-full border-0 bg-transparent p-0 text-sm text-white placeholder-neutral-400 focus:ring-0"
            />
          </div>
        </div>
      </div>

      <div>
        <label class="text-label text-white" for="help">
          What can we help you with?
        </label>
        <div class="mt-2.5 rounded-lg bg-neutral-400/15 p-3">
          <select
            id="help"
            bind:value={help}
            class="w-full border-0 bg-transparent p-0 text-sm focus:ring-0 {help ===
            'Select…'
              ? 'text-neutral-400'
              : 'text-white'}"
          >
            <option value="Select…">Select…</option>
            <option value="Book a villa">Book a villa</option>
            <option value="Ask a question">Ask a question</option>
            <option value="Partnership">Partnership</option>
            <option value="Something else">Something else</option>
          </select>
        </div>
      </div>

      <div>
        <label class="text-label text-white" for="message">Message</label>
        <div class="mt-2.5 rounded-lg bg-neutral-400/15 p-3">
          <textarea
            id="message"
            rows="3"
            placeholder="Tell us about your trip"
            class="w-full resize-none border-0 bg-transparent p-0 text-sm text-white placeholder-neutral-400 focus:ring-0"
          ></textarea>
        </div>
      </div>

      <button
        type="submit"
        class="inline-flex h-12 w-full items-center justify-center rounded-full bg-white text-caption font-medium text-black"
      >
        Send your message
      </button>

      <p class="text-label text-white">
        We usually reply within a few hours. No bots — just real humans.
      </p>
    </form>
  </div>
</section>

<!-- FAQ band -->
<section class="v-band bg-white">
  <div class="contents">
    <div class="col-span-full lg:col-span-7">
      <h2 class="font-satoshi text-heading text-black">
        Quick answers before you reach out
      </h2>
      <p class="mt-6 max-w-2xl text-body text-black/80">
        The things guests ask us most, answered plainly. Anything else, the form
        above is the quickest way to us.
      </p>
    </div>

    <div
      class="col-span-full mt-12 space-y-4 lg:col-span-7 lg:col-start-10 lg:mt-0"
    >
      {#each faqs as faq, i}
        <div class="rounded-lg bg-white p-4">
          <button
            type="button"
            class="flex w-full items-center justify-between gap-4 text-left"
            aria-expanded={openIndex === i}
            on:click={() => toggle(i)}
          >
            <span class="text-body font-medium text-black">{faq.q}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5 shrink-0 text-black {openIndex === i
                ? 'rotate-45'
                : ''}"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d={icons.plus} />
            </svg>
          </button>
          {#if openIndex === i}
            <p class="mt-4 text-caption text-black/80">{faq.a}</p>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Testimonials band -->
<section class="v-band bg-white">
  <div class="col-span-full lg:col-span-7">
    <h2 class="font-satoshi text-heading text-black">
      Still unsure? Here’s what our guests say.
    </h2>
    <p class="mt-6 max-w-2xl text-body text-black/80">
      Real words from people who booked a villa — and never looked back.
    </p>
  </div>

  <div class="col-span-full mt-16 space-y-4 overflow-hidden">
    {#each [rowOne, rowTwo] as row}
      <div class="flex w-max -ml-10 gap-4">
        {#each row as testimonial}
          <article
            class="flex h-50 w-80 shrink-0 flex-col justify-between rounded-2xl bg-white p-6"
          >
            <p class="flex items-center gap-2 text-body font-medium text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-4 text-black"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip-rule="evenodd"
                />
              </svg>
              {testimonial.rating}
            </p>

            <p class="text-body text-black/80">{testimonial.quote}</p>

            <div class="flex items-center gap-3">
              <span
                class="flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-caption font-medium text-black"
              >
                {testimonial.initial}
              </span>
              <div>
                <p class="text-body font-medium text-black">{testimonial.name}</p>
                <p class="text-caption text-black/80">{testimonial.role}</p>
              </div>
            </div>
          </article>
        {/each}
      </div>
    {/each}
  </div>
</section>
