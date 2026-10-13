<script>
  import { slide } from "svelte/transition";

  let faqs = [
    {
      id: 1,
      question: "What is your cancellation policy?",
      answer:
        "You can cancel your booking up to 48 hours before arrival for a full refund. Last-minute cancellations may incur a fee.",
    },
    {
      id: 2,
      question: "Do you offer airport transfers?",
      answer:
        "Yes, we provide private airport transfers for an additional fee. Please book this in advance through your reservation.",
    },
    {
      id: 3,
      question: "Are pets allowed?",
      answer:
        "Pets are welcome at select locations for an additional nightly fee. Please inform us at the time of booking.",
    },
    {
      id: 4,
      question: "What is the check-in and check-out time?",
      answer:
        "Standard check-in is at 3:00 PM and check-out is at 11:00 AM. Early check-in and late check-out are available upon request and subject to availability.",
    },
    {
      id: 5,
      question: "Is breakfast included?",
      answer:
        "Breakfast is included in all room rates at our properties. We offer both continental and full hot breakfast options.",
    },
  ];

  let openId = null; // Only one accordion open at a time

  function toggle(id) {
    openId = openId === id ? null : id;
  }
</script>

<section
  class="shell grid grid-cols-16 gap-x-4 px-10 py-24 leading-snug tracking-[-0.02em]"
>
  <div class="col-span-full lg:col-span-4">
    <p class="text-label font-medium uppercase tracking-[0.25em] text-black/50">
      Good to know
    </p>
    <h2 class="mt-6 font-satoshi text-heading text-black">Questions, answered</h2>
    <p class="mt-6 text-body text-black/70">
      Can’t find what you’re after?
      <a class="underline underline-offset-2" href="/contact">Talk to us</a>.
    </p>
  </div>

  <div
    class="col-span-full mt-12 border-t border-black/10 lg:col-span-11 lg:col-start-6 lg:mt-0"
  >
    {#each faqs as faq}
      <div class="border-b border-black/10">
        <button
          type="button"
          class="flex w-full items-center justify-between gap-8 py-6 text-left"
          aria-expanded={openId === faq.id}
          onclick={() => toggle(faq.id)}
        >
          <span class="font-satoshi text-standfirst font-medium text-black">
            {faq.question}
          </span>
          <span
            class="grid size-8 shrink-0 place-items-center rounded-full border border-black/15 text-black transition-transform duration-300 {openId ===
            faq.id
              ? 'rotate-45'
              : ''}"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </span>
        </button>

        {#if openId === faq.id}
          <div transition:slide={{ duration: 250 }} class="pb-8 pr-12">
            <p class="max-w-2xl text-body text-black/70">{faq.answer}</p>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</section>
