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

<!--  style="background-image: url(/upscaled2.jpeg)" -->
<div class="bg-no-repeat bg-cover bg-center pt-20 rounded-3xl bg-gray-100">
  <section
    class="overflow-hidden text-gray-600 bg-cover bg-center bg-center bg-cover"
  >
    <!-- Dark fade gradient overlay -->
    <div class=" inset-0 z-10">
      <!-- Or for a solid dark fade from top: bg-gradient-to-b from-black/70 to-transparent -->
      <div class="mt-[20vh] mb-[10vh] container max-w-6xl mx-auto px-6">
        <div class="max-w-[66%]">
          <h1 class="text-4xl inline-block drop-shadow-2xl">
            Find your Villa.
          </h1>

          <h2 class=" my-4">
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
