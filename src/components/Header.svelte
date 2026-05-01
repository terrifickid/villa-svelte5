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
<nav class="w-full z-50 container frame mx-auto my-5">
  <div class="p-6 text-gray-600 border-gray-500 rounded-3xl">
    <div class="flex items-center justify-between">
      <a class="transition-opacity duration-300 hover:opacity-50" href="#"
        ><img class="w-40 invert" src="/vb.png" /></a
      >
      <ul class="flex items-center mr-auto ml-20">
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
      <ButtonBlack
        ><svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          class="inline-block"
        >
          <!-- Lens -->
          <circle cx="11" cy="11" r="8" />
          <!-- Handle -->
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg></ButtonBlack
      >
    </div>
  </div>
</nav>
