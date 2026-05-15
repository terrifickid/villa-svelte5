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

<div class="min-h-screen frame flex items-center">
  <div class="w-full">
    <div class="space-y-4 w-full">
      {#each faqs as faq}
        <div
          class="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden w-full"
        >
          <!-- Question Header -->
          <button
            on:click={() => toggle(faq.id)}
            class="w-full px-6 py-6 flex justify-between items-center text-left group hover:bg-zinc-800 transition-all"
          >
            <span class="text-lg font-medium text-white pr-8 leading-tight">
              {faq.question}
            </span>

            <div
              class="w-7 h-7 flex items-center justify-center flex-shrink-0 transition-transform duration-300 {openId ===
              faq.id
                ? 'rotate-180'
                : ''}"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 text-zinc-400 group-hover:text-white transition"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>

          <!-- Answer -->
          {#if openId === faq.id}
            <div
              transition:slide={{ duration: 250 }}
              class="px-6 pb-7 text-zinc-400 leading-relaxed border-t border-zinc-800"
            >
              {faq.answer}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>
