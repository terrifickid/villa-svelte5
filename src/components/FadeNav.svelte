<script>
  // No script needed for this pure CSS animation
</script>

<header class="loaded">
  <!-- Add 'loaded' class immediately or via onMount if preferred -->
  <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
    <!-- Logo -->
    <div class="text-2xl font-bold">FlowSpace</div>

    <!-- Links -->
    <ul class="flex space-x-8">
      <li class="px-2"><a href="#">Link 1</a></li>
      <li class="px-2"><a href="#">Link 2</a></li>
      <li class="px-2"><a href="#">Link 3</a></li>
      <li class="px-2"><a href="#">Link 4</a></li>
    </ul>
  </nav>
</header>

<style>
  header {
    @apply fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md;

    /* Initial hidden state */
    opacity: 0;
    transform: translateY(-100%);

    /* Smooth transition for the animation */
    transition:
      opacity 0.8s ease-out,
      transform 0.8s ease-out;
  }

  /* Trigger the animation after the component mounts */
  header.loaded {
    opacity: 1;
    transform: translateY(0);
  }

  /* Optional: subtle hover fade on nav links (from your earlier request) */
  nav a {
    @apply transition-opacity duration-300;
  }
  nav a:hover {
    @apply opacity-70;
  }
</style>
