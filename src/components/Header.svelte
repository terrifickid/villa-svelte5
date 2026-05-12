<script>
  export let data;
  import FindYourStayButton from "../components/buttons/findYourStay.svelte";
  import ButtonBlack from "./buttons/buttonBlack.svelte";
  let mobileMenuOpen = false;

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<!-- Main wrapper - full width, fixed or sticky if needed -->
<nav class="w-full z-50 mx-auto my-5 absolute">
  <div class=" text-white px-8 py-4 rounded-3xl text-sm">
    <div class="grid grid-cols-2 flex items-center">
      <a class="transition-opacity duration-300 hover:opacity-50" href="#"
        ><img class="w-35" src="/vb.png" /></a
      >

      <div class="bg-black rounded-2xl p-2 flex items-center hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 9h16.5m-16.5 6.75h16.5"
          />
        </svg>
        Menu
      </div>
      <ul class="flex items-center mr-auto ml-20 hidden">
        <li class="px-2 transition-opacity duration-300 hover:opacity-50">
          <a href="/">Home</a>
        </li>
        <li class="px-2 transition-opacity duration-300 hover:opacity-50">
          <a href="/locations">Locations</a>
        </li>
        <li class="px-2 transition-opacity duration-300 hover:opacity-50">
          <a href="#">Blog</a>
        </li>
        <li class="px-2 transition-opacity duration-300 hover:opacity-50">
          <a href="#">Contact</a>
        </li>
      </ul>
      <button class="ml-auto border p-2 bg-black rounded-3xl text-white"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </div>
  </div>
</nav>
