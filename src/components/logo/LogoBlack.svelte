<script>
  // Full Villabound monogram in black.
  let {
    class: className = "",
    src = "/vb-logo-test.svg",
    label = "Villabound",
  } = $props();
</script>

<img
  {src}
  alt={label}
  aria-hidden={label === "" ? "true" : undefined}
  class="w-auto {className}"
/>
