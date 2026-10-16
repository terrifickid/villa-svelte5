<script>
  // Reusable lockup: the VB monogram mark plus the hand-kerned VILLABOUND
  // wordmark. Size is controlled by the caller through `class` (e.g.
  // `h-[5rem] text-[5rem]`) so the em-based wordmark scales with the mark.
  let { class: className = "", color = "white", label = "Villabound" } = $props();
</script>

<span
  role="img"
  aria-label={label}
  class="font-oldstandard flex items-center {color === 'black' ? 'text-black' : 'text-white'} {className}"
>
  <img
    src="/vb-logo-e.svg"
    alt=""
    aria-hidden="true"
    class="h-full {color === 'black' ? 'brightness-0' : 'brightness-0 invert'}"
  />
  <span
    class="block text-[0.46em] h-0 leading-[0.35] pl-[0.35em] tracking-[0.193em]"
    style="text-justify: inter-character;"
  >
    VI<span class="pl-0.5"
      >LL<span class="pl-0.5">ABOUN<span class="-ml-1">D</span></span
      ></span
    >
  </span>
</span>
