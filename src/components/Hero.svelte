<script>
  import { goto } from "$app/navigation";
  import Spinner from "../components/Spinner.svelte";
  import DateOption from "../components/DateOption.svelte";
  import KeywordSearch from "../components/KeywordSearch.svelte";
  import FindYourStayButton from "../components/buttons/findYourStay.svelte";
  let searching = false;
  let search = {
    checkIn: getNextFriday(),
    checkOut: getNextMondayAfterFriday(),
  };

  function getNextFriday() {
    const today = new Date();
    const daysUntilFriday = (5 - today.getDay() + 7) % 7; // Calculate days until the next Friday
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + daysUntilFriday);

    // Format the date as 'YYYY-MM-DD' for the input element
    return nextFriday.toISOString().split("T")[0];
  }
  function getNextMondayAfterFriday() {
    const nextFriday = new Date(getNextFriday());
    const nextMonday = new Date(nextFriday);
    nextMonday.setDate(nextFriday.getDate() + 3); // Add 3 days to get the Monday after the next Friday

    // Format the date as 'YYYY-MM-DD' for the input element
    return nextMonday.toISOString().split("T")[0];
  }
  function handleSubmit() {
    console.log(search);
    event.preventDefault();
    searching = true; // Toggle the variable
    let queryParams = new URLSearchParams(search).toString();
    let searchUrl = `/search?${queryParams}`;
    goto(searchUrl, false);
  }

  function checkOut() {
    document.getElementById("checkOut").focus();
    document.getElementById("checkOut").select();
  }
  export let data;
</script>

<div
  class="  bg-no-repeat bg-cover"
  style="background-image: url(/upscaled2.jpeg)"
>
  <section
    class="bg-black overflow-hidden text-white py-24 bg-cover bg-center bg-center bg-cover"
    style=" background: linear-gradient(228deg,#0000 0%,#000000e6 520%)"
  >
    <!-- Dark fade gradient overlay -->
    <div class=" inset-0 z-10">
      <!-- Or for a solid dark fade from top: bg-gradient-to-b from-black/70 to-transparent -->
      <div class="mt-[20vh] mb-[0vh] container max-w-6xl mx-auto px-12">
        <div class="max-w-[66%]">
          <h1
            class="text-4xl inline-block drop-shadow-2xl"
            style="text-shadow: #000 1px 0 50px;"
          >
            <svg
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="inline-block align-middle mr-3 drop-shadow-2xl"
              style="text-shadow: #000 1px 0 50px;"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg> Find your Villa.
          </h1>

          <h2 class="text-lg my-4" style="text-shadow: #000 1px 0 30px;">
            A curated collection of exclusive beachfront and private estates in
            the Caribbean and worldwide — featuring infinity pools, ocean views,
            and exceptional amenities.
          </h2>
          <div class="mt-8">
            <FindYourStayButton />
          </div>

          <p class="mt-20">Trusted by 500+ Clients</p>
        </div>
      </div>
    </div>
  </section>
</div>
