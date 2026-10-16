<script>
  // Full Villabound monogram in white (black source art inverted).
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
  class="w-auto brightness-0 invert {className}"
/>
