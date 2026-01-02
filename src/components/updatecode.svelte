<!-- Container: responsive max-width, centered, with padding -->
<div class="container mx-auto bg-blue">
  <!-- Flex row: logo left, menu center (desktop), button right -->
  <div class="flex items-center justify-between">
    <!-- Logo + Brand -->
    <a href="./" class="flex items-center gap-3">
      <div
        class="h-10 w-10 overflow-hidden rounded-lg border border-black/10 md:h-12 md:w-12"
      >
        <img
          src="https://c.animaapp.com/mjwifyx00sw6H5/assets/icon-1.svg"
          alt="Villabound Icon"
          class="h-full w-full object-contain"
        />
      </div>
      <span
        class="text-2xl font-medium text-blue-700 md:text-white font-dm_sans"
      >
        Villabound
      </span>
    </a>

    <!-- Desktop Navigation Links -->
    <div class="hidden md:flex items-center gap-8">
      <a
        href="./"
        class="text-white hover:text-gray-200 font-medium font-plus_jakarta_sans"
        >Home</a
      >
      <a
        href="./locations"
        class="text-white hover:text-gray-200 font-medium font-plus_jakarta_sans"
        >Locations</a
      >
      <a
        href="./#price"
        class="text-white hover:text-gray-200 font-medium font-plus_jakarta_sans"
        >Memberships</a
      >
      <a
        href="./contact"
        class="text-white hover:text-gray-200 font-medium font-plus_jakarta_sans"
        >Contact</a
      >
    </div>

    <!-- CTA Button (Desktop) -->
    <a
      href="./locations"
      class="hidden md:flex h-12 items-center justify-center rounded-3xl px-8 text-blue-700 font-medium hover:bg-gray-100 font-plus_jakarta_sans relative overflow-hidden"
    >
      <span>Find your stay</span>
      <span
        class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-white opacity-90 text-sm"
      >
        Find your desk
      </span>
    </a>

    <!-- Mobile Menu Button -->
    <button
      on:click={toggleMobileMenu}
      class="md:hidden text-blue-700"
      aria-label="Toggle menu"
    >
      <svg
        class="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"}
        />
      </svg>
    </button>
  </div>
</div>

<!-- Mobile Menu Panel -->
{#if mobileMenuOpen}
  <div class="md:hidden border-t">
    <div class="container mx-auto px-4 py-6 space-y-4">
      <a href="./" class="block text-lg font-medium text-gray-800">Home</a>
      <a href="./locations" class="block text-lg font-medium text-gray-800"
        >Locations</a
      >
      <a href="./#price" class="block text-lg font-medium text-gray-800"
        >Memberships</a
      >
      <a href="./contact" class="block text-lg font-medium text-gray-800"
        >Contact</a
      >
      <a
        href="./locations"
        class="mt-6 block rounded-3xl bg-blue-700 py-4 text-center text-white font-medium"
      >
        Find your stay
      </a>
    </div>
  </div>
{/if}
