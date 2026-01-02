<script>
  export let data;
  import FindYourStayButton from "../components/buttons/findYourStay.svelte";
  let mobileMenuOpen = false;

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<!-- Main wrapper - full width, fixed or sticky if needed -->
<nav class="w-full absolute">
  <div class="container mx-auto max-w-6xl p-6 text-white text-xl">
    <div class="flex items-center justify-between">
      <span><img class="w-40" src="/vb.png" /></span>
      <ul class="flex items-center justifyb-between">
        <li>Link 1</li>
        <li>Link 2</li>
        <li>Link 3</li>
        <li>Link 4</li>
      </ul>
      <FindYourStayButton />
    </div>
  </div>
</nav>
