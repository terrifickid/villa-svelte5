<script>
  export let data;

  import BookingSummary from "$components/BookingSummary.svelte";
  import ConfirmAndPay from "../../../../components/ConfirmAndPay.svelte";

  let reservation = data.data[0].data;
  let property = data.data[1].data;
</script>

<section class="v-band">
  <h1
    class="col-span-full flex items-center font-satoshi text-display text-black"
  >
    <button
      on:click={() => {
        window.history.back();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </button>
    <div class="pl-4">Confirm & Pay</div>
  </h1>

  <div
    class="col-span-full mt-12 grid grid-cols-1 gap-12 lg:grid-cols-16"
  >
    <div class="lg:col-span-8">
      <ConfirmAndPay {reservation} />
    </div>
    <div class="lg:col-start-10 lg:col-span-7">
      <BookingSummary {reservation} {property} />
    </div>
  </div>
</section>
