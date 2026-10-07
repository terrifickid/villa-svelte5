<script>
  export let data;
</script>

<section class="v-band">
  <h1 class="col-span-full font-satoshi text-display text-black">
    Reservation Confirmed
  </h1>

  <p class="col-span-full mt-6 text-body text-gray-600 lg:col-span-8">
    Thank you. Your reservation has been confirmed.
  </p>

  <div class="col-span-full mt-12">
    <div class="mb-6">
      <label class="mb-2 block text-caption font-medium text-black">
        Confirmation Code
      </label>
      <div class="inline-block rounded-md border border-bound p-4">
        <span class="text-standfirst text-gray-800">{data.confirmationCode}</span>
      </div>
    </div>
  </div>
</section>
