<script>
  export let data;
  import _ from "lodash";
  import { onMount } from "svelte";
  import Spinner from "./Spinner.svelte";

  let guests = 2;
  let email = "";
  let isSpinning = false;
  let success = false; // track successful submission

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
          quote: formatPrice(
            _.get(data, "prices.basePrice", 0),
            _.get(data, "prices.currency", "USD")
          ),
          id: _.get(data, "_id"),
        }),
      });

      if (response.ok) {
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

<!-- Sticky enquiry card -->
<form on:submit={runHubspot}>
  <div class="sticky top-20 rounded-2xl bg-black p-5 text-white">
    <p class="text-base font-medium">Book your stay or ask us anything</p>
    <p class="mt-2 text-sm text-neutral-300">
      Want to check dates or need help choosing the right villa? Drop us a
      message!
    </p>

    {#if _.get(data, "prices.basePrice")}
      <p class="mt-3 text-sm text-neutral-300">
        From
        <span class="font-medium text-white"
          >{formatPrice(
            _.get(data, "prices.basePrice"),
            _.get(data, "prices.currency", "USD")
          )}</span
        >
        / night
      </p>
    {/if}

    {#if success}
      <div class="py-10 text-center">
        <div
          class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white"
        >
          <svg
            class="h-12 w-12 text-black"
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
        <h3 class="mb-2 text-2xl font-medium">Thank you!</h3>
        <p class="text-sm text-neutral-300">
          Your enquiry has been sent.<br />We'll be in touch soon.
        </p>
      </div>
    {:else}
      <div class="mt-5 space-y-4">
        <div>
          <label class="text-xs text-white" for="email-input">Email</label>
          <div class="mt-2 rounded-lg bg-neutral-400/15 px-3 py-2">
            <input
              id="email-input"
              type="email"
              placeholder="you@example.com"
              required
              bind:value={email}
              class="w-full border-0 bg-transparent p-0 text-sm text-white placeholder-neutral-400 focus:ring-0"
              style="color-scheme: dark;"
            />
          </div>
        </div>

        <div>
          <label class="text-xs text-white" for="checkin-input">Check in</label>
          <div class="mt-2 rounded-lg bg-neutral-400/15 px-3 py-2">
            <input
              id="checkin-input"
              class="w-full border-0 bg-transparent p-0 text-sm text-white focus:ring-0"
              type="date"
              style="color-scheme: dark;"
              bind:value={checkInDate}
            />
          </div>
        </div>

        <div>
          <label class="text-xs text-white" for="checkout-input">Check out</label
          >
          <div class="mt-2 rounded-lg bg-neutral-400/15 px-3 py-2">
            <input
              id="checkout-input"
              class="w-full border-0 bg-transparent p-0 text-sm text-white focus:ring-0"
              type="date"
              style="color-scheme: dark;"
              bind:value={checkOutDate}
            />
          </div>
        </div>

        <div>
          <label class="text-xs text-white" for="guests-input">Guests</label>
          <div
            class="mt-2 flex items-center justify-between rounded-lg bg-neutral-400/15 px-3 py-2"
          >
            <input
              id="guests-input"
              type="number"
              min="1"
              max={_.get(data, "accommodates", 10)}
              class="w-12 border-0 bg-transparent p-0 text-sm text-white focus:ring-0"
              bind:value={guests}
              aria-label="Number of guests"
            />

            <div class="flex items-center gap-1">
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
                  class="h-5 w-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 12h-15"
                  />
                </svg>
              </button>

              <button
                type="button"
                class="cursor-pointer"
                aria-label="Increase guests"
                on:click={() => {
                  if (guests < _.get(data, "accommodates", 10)) guests++;
                }}
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
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    {/if}

    <button
      type="submit"
      disabled={isSpinning || success}
      class="mt-5 inline-flex h-11 w-full items-center justify-center rounded-3xl bg-white text-base font-medium text-black focus:outline-none {success
        ? 'cursor-default'
        : 'cursor-pointer'}"
    >
      {#if isSpinning}
        <Spinner />
      {:else if success}
        Sent!
      {:else}
        Send enquiry
      {/if}
    </button>
  </div>
</form>
