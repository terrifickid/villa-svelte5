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
<nav class="w-full z-50 mx-auto my-5">
  <div class=" text-gray-600 bg-gray-100 px-8 py-4 rounded-3xl text-sm">
    <div class="flex items-center justify-between">
      <a class="transition-opacity duration-300 hover:opacity-50" href="#"
        ><img class="w-30 invert" src="/vb.png" /></a
      >
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
      <button class="ml-auto border p-2">Search</button>
      <button class="ml-4 border p-2">Menu</button>
    </div>
  </div>
</nav>
