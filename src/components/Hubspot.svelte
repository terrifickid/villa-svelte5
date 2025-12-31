<script>
  export let data;
  import _ from "lodash";
  import { PUBLIC_API_SERVER } from "$env/static/public";
  import { onMount } from "svelte";
  import axios from "axios";
  import { goto } from "$app/navigation";
  import Spinner from "./Spinner.svelte";

  let guests = 2;
  let email = "";
  let isSpinning = false;
  let success = false; // ← ADDED: to track successful submission

  let checkInDate = getNextFriday();
  let checkOutDate = getNextMondayAfterFriday();

  function getNextFriday() {
    const today = new Date();
    const daysUntilFriday = (5 - today.getDay() + 7) % 7 || 7; // Next Friday (handles if today is Friday)
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + daysUntilFriday);

    return nextFriday.toISOString().split("T")[0];
  }

  function getNextMondayAfterFriday() {
    const nextFriday = new Date(getNextFriday());
    const nextMonday = new Date(nextFriday);
    nextMonday.setDate(nextFriday.getDate() + 3); // Monday after Friday

    return nextMonday.toISOString().split("T")[0];
  }

  function formatPrice(price, currency) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(price);
  }

  async function runHubspot() {
    event.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email address");
      return;
    }

    isSpinning = true;

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          checkInDate,
          checkOutDate,
          guests,
          propertyName: _.get(data, "nickname") + " " + _.get(data, "title"),
          quote: formatPrice(data.prices.basePrice, data.prices.currency),
          id: _.get(data, "_id"),
        }),
      });

      if (response.ok) {
        console.log("response ok hubspot");
        success = true;
      } else {
        alert("Submission failed – please try again.");
      }
    } catch (err) {
      alert("Network error – please try again.");
    }

    isSpinning = false;
  }

  onMount(async () => {
    let urlParams = new URLSearchParams(window.location.search);
    const checkInParam = urlParams.get("checkIn");
    const checkOutParam = urlParams.get("checkOut");

    if (checkInParam) {
      const i = new Date(checkInParam);
      if (!isNaN(i.getTime())) {
        checkInDate = i.toISOString().split("T")[0];
      }
    }
    if (checkOutParam) {
      const o = new Date(checkOutParam);
      if (!isNaN(o.getTime())) {
        checkOutDate = o.toISOString().split("T")[0];
      }
    }
  });
</script>

<!-- Desktop sidebar form -->
<form class="hidden lg:block" on:submit={runHubspot}>
  <div class="border border-black p-6 rounded-xl shadow sticky top-32">
    <p>{data.nickname}</p>
    <p class="font-medium pb-4">
      {formatPrice(data.prices.basePrice, data.prices.currency)} / night
    </p>

    {#if success}
      <div class="text-center py-12">
        <div
          class="w-20 h-20 bg-black rounded-full mx-auto mb-6 flex items-center justify-center animate-checkmark"
        >
          <svg
            class="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 class="text-2xl font-medium mb-2">Thank You!</h3>
        <p class="text-gray-600">
          Your enquiry has been sent.<br />We'll be in touch soon.
        </p>
      </div>
    {:else}
      <div class="grid grid-cols-1 mb-6">
        <!-- Email Address field -->
        <div class="mt-6 mb-6">
          <label class="font-medium text-sm" for="email-input"
            >Email Address</label
          >
          <input
            id="email-input"
            type="email"
            placeholder="you@example.com"
            required
            bind:value={email}
            class="mt-0.5 py-1.5 pl-3 w-full text-white bg-black placeholder-white rounded-full border-0 ring-gray-300 ring-1 focus:ring-bound focus:ring-2 sm:text-sm sm:leading-6"
            style="color-scheme: dark;"
          />
        </div>
        <div class="mb-4">
          <label class="font-medium text-sm" for="checkin-input">Check In</label
          >
          <input
            id="checkin-input"
            class="text-white bg-black rounded-full border-0 ring-gray-300 ring-1 focus:ring-bound focus:ring-2 mt-0.5 py-1.5 pl-3 w-full sm:text-sm sm:leading-6"
            type="date"
            style="color-scheme: dark;"
            bind:value={checkInDate}
          />
        </div>
        <div>
          <label class="font-medium text-sm" for="checkout-input"
            >Check Out</label
          >
          <input
            id="checkout-input"
            class="text-white bg-black rounded-full border-0 ring-gray-300 ring-1 focus:ring-bound focus:ring-2 mt-0.5 py-1.5 pl-3 w-full sm:text-sm sm:leading-6"
            type="date"
            style="color-scheme: dark;"
            bind:value={checkOutDate}
          />
        </div>
      </div>

      <label class="font-medium text-sm mt-4" for="guests-input">Guests</label>
      <div class="grid items-center grid-cols-5">
        <input
          id="guests-input"
          type="number"
          min="1"
          max={data.accommodates}
          class="mr-5 col-span-2 bg-transparent border-none text-right"
          bind:value={guests}
          aria-label="Number of guests"
          style="width: 3em;"
        />

        <button
          type="button"
          class="mr-2 cursor-pointer"
          aria-label="Increase guests"
          on:click={() => {
            if (guests < data.accommodates) guests++;
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>

        <button
          type="button"
          class="cursor-pointer"
          aria-label="Decrease guests"
          on:click={() => {
            if (guests > 1) guests--;
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
              d="M19.5 12h-15"
            />
          </svg>
        </button>
      </div>
    {/if}
    <hr class="mt-10 mb-4" />

    <div>
      <button
        type="submit"
        disabled={isSpinning || success}
        class="text-lg my-5 inline-flex w-full items-center justify-center lg:px-12 px-6 py-4 text-center duration-200 bg-black text-white rounded-full focus:outline-none ring-white ring-1 transition-all relative
         {success ? 'cursor-default' : 'cursor-pointer hover:ring-bound'}"
      >
        {#if isSpinning}
          <Spinner />
        {:else if success}
          Sent!
        {:else}
          Enquire
        {/if}
      </button>
    </div>
  </div>
</form>
