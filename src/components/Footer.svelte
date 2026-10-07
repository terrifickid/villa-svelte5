<script>
  let email = $state("");
  let filled = $derived(email.trim() !== "");

  // Rubric hover underline: scales in from the left over the shared 300ms curve
  const linkClass =
    "relative inline-block text-lg after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-[cubic-bezier(.165,.84,.44,1)] hover:after:scale-x-100";
  const subLinkClass =
    "relative inline-block text-label after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-[cubic-bezier(.165,.84,.44,1)] hover:after:scale-x-100";

  const lists = [
    {
      label: "Explore",
      colStart: "lg:col-start-11",
      links: [
        { label: "Locations", href: "/locations" },
        { label: "About", href: "/about" },
        { label: "Villa Owners", href: "/owners" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      label: "Discover",
      colStart: "lg:col-start-13",
      links: [
        { label: "Search", href: "/search" },
        { label: "Favorites", href: "/favorites" },
        { label: "Destinations", href: "/locations" },
      ],
    },
    {
      label: "Connect",
      colStart: "lg:col-start-15",
      links: [
        { label: "Contact", href: "/contact" },
        { label: "Email", href: "mailto:lily@villabound.com" },
        { label: "Phone", href: "tel:+12464245075" },
      ],
    },
  ];
</script>

<footer>
  <!-- Link field: bright blue, everything typographic -->
  <div
    class="v-band relative min-h-dvh content-start bg-bound text-white after:absolute after:bottom-0 after:left-0 after:h-8.5 after:w-full after:bg-black after:content-[''] lg:grid-rows-[1fr_auto]"
  >
    <!-- Legal and copyright footnote: unlabelled, caption size, no gaps -->
    <ul
      class="col-span-full flex flex-col lg:col-span-2 lg:col-start-1"
      role="list"
    >
      <li><a class={subLinkClass} href="/">Privacy Policy</a></li>
      <li><a class={subLinkClass} href="/">Terms of Use</a></li>
      <li class="text-label">© 2026 Villabound</li>
    </ul>

    <!-- Declared interior span: columns 3-10 are an explicit spacer, not a hole -->
    <div
      class="hidden lg:col-span-8 lg:col-start-3 lg:block"
      aria-hidden="true"
    ></div>

    {#each lists as list}
      <ul
        class="col-span-full mt-12 flex flex-col lg:col-span-2 lg:mt-0 {list.colStart}"
        role="list"
      >
        <li class="mb-8 text-label">{list.label}</li>
        {#each list.links as link}
          <li><a class={linkClass} href={link.href}>{link.label}</a></li>
        {/each}
      </ul>
    {/each}

    <!-- Row 2: logo aligned to the row's end, newsletter at its natural top -->
    <a
      href="/"
      class="col-span-full mt-12 lg:col-span-4 lg:mt-24 lg:self-end"
    >
      <img src="/vb.png" alt="Villabound" class="h-10 w-auto" />
    </a>

    <div class="col-span-full mt-12 lg:col-span-5 lg:col-start-11 lg:mt-24">
      <p
        class="font-satoshi text-[28px] leading-[1.2] font-medium transition duration-400 {filled
          ? '-translate-y-4 text-white/50'
          : 'text-white'}"
      >
        Sign up for updates
      </p>

      <form
        accept-charset="UTF-8"
        action="https://gs324.infusionsoft.com/app/form/process/832e3dc5d191bcb7f1a1cc74b0a1df11"
        method="POST"
        class="mt-4"
      >
        <input
          name="inf_form_xid"
          type="hidden"
          value="832e3dc5d191bcb7f1a1cc74b0a1df11"
          autocomplete="off"
        />
        <input
          name="inf_form_name"
          type="hidden"
          value="Web Form submitted"
          autocomplete="off"
        />
        <input
          name="infusionsoft_version"
          type="hidden"
          value="1.68.0.104"
          autocomplete="off"
        />

        <div class="relative">
          <input
            name="inf_field_Email"
            type="email"
            bind:value={email}
            placeholder="Enter e-mail address"
            required
            class="rounded-none border-0 border-b border-white bg-transparent p-0 pr-10 text-[28px] leading-[1.2] font-medium text-white placeholder-white/60 transition-[width] duration-400 focus:ring-0 {filled
              ? 'w-full'
              : 'w-[16ch]'}"
          />
          <button
            type="submit"
            aria-label="Sign up"
            class="absolute top-1/2 right-0 size-7 -translate-y-1/2 transition duration-400 {filled
              ? 'pointer-events-auto text-white'
              : 'pointer-events-none text-white/40'}"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12h15m0 0-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </button>
        </div>
      </form>

      <p
        class="mt-6 text-label transition-transform duration-400 {filled
          ? '-translate-y-4'
          : ''}"
      >
        By entering your email address you agree to receive newsletters, updates,
        and marketing information. You can opt out at any time. See our
        <a class="underline" href="/">Privacy Policy</a>.
      </p>
    </div>
  </div>

  <!-- Horizon band: dark surface, flat strata cut by one curve, no text, non-interactive -->
  <div
    aria-hidden="true"
    class="pointer-events-none relative aspect-[16/5] w-full overflow-hidden bg-black"
  >
    <svg
      class="absolute bottom-0 left-0 w-full"
      viewBox="0 0 1600 737"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="v-horizon">
          <path
            d="M1600 737C1600 737 1283.98 736.995 600 737C1600 736.989 1600 -0.000151364 1600 -0.000151364L1600 737Z"
          />
        </clipPath>
      </defs>
      <g clip-path="url(#v-horizon)">
        <rect x="8" y="-94" width="1600" height="296" fill="#000000" />
        <rect x="8" y="202" width="1600" height="296" fill="#fffefd" />
        <rect x="8" y="498" width="1600" height="182" fill="#52bddd" />
        <rect x="8" y="680" width="1600" height="57" fill="#000000" />
      </g>
    </svg>
  </div>
</footer>
