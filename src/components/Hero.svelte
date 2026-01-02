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
  console.log(data);
</script>

<KeywordSearch />
<section
  class="bg-black overflow-hidden text-white py-24 min-h-screen bg-cover bg-center shadow-md bg-center bg-cover"
  style="background-image: url(/7flntut11.jpg)"
>
  <div class="pt-60 container max-w-6xl mx-auto p-6">
    <h1 class="text-8xl">Your next vacation starts here.</h1>

    <h2 class="text-4xl">
      A flexible coworking space built for freelancers, remote teams, and
      creative minds. From hot desks to private offices — everything you need to
      do your best work.
    </h2>

    <FindYourStayButton />
  </div>
</section>
