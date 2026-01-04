<script>
  export let data;
  import FindYourStayButton from "../components/buttons/findYourStay.svelte";
  let mobileMenuOpen = false;

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<!-- Main wrapper - full width, fixed or sticky if needed -->
<nav class="w-full absolute z-50">
  <div class="container mx-auto max-w-6xl p-6 text-white text-xl">
    <div class="flex items-center justify-between">
      <a class="transition-opacity duration-300 hover:opacity-50" href="#"
        ><img class="w-40" src="/vb.png" /></a
      >
      <ul class="flex items-center justify-between">
        <li class="px-2 transition-opacity duration-300 hover:opacity-50">
          <a href="#">Home</a>
        </li>
        <li class="px-2 transition-opacity duration-300 hover:opacity-50">
          <a href="#">Locations</a>
        </li>
        <li class="px-2 transition-opacity duration-300 hover:opacity-50">
          <a href="#">Blog</a>
        </li>
        <li class="px-2 transition-opacity duration-300 hover:opacity-50">
          <a href="#">Contact</a>
        </li>
      </ul>
      <FindYourStayButton />
    </div>
  </div>
</nav>
