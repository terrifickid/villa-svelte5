<script>
  const features = [
    {
      // Simple minimalist infinity pool icon (waves in a rectangle)
      icon: "M4 12h16v4H4z M6 8h12l-2 4H8z",
      text: "Private Infinity Pools",
    },
    {
      // Beach/ocean waves with horizon
      icon: "M2 16h20 M4 12c2-4 6-4 8 0s6 4 8 0 M4 18c2-2 6-2 8 0s6 2 8 0",
      text: "Beachfront Access",
    },
    {
      // Person with tray (butler/staff service)
      icon: "M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M8 22h8v-6h-8z M6 14h12l-2 8H8z",
      text: "Dedicated Staff (Chef, Butler, Housekeeper)",
    },
    {
      // Bell icon for concierge
      icon: "M12 2v4 M8 20h8 M12 22v-2 M4 16c0-4 4-8 8-8s8 4 8 8v2H4z",
      text: "Personal Concierge",
    },
    {
      // Waves for ocean views
      icon: "M2 12h20 M4 8c2 4 6 4 8 0s6-4 8 0 M4 16c2-4 6-4 8 0s6 4 8 0",
      text: "Ocean Views",
    },
    {
      // Kitchen utensils (knife and fork)
      icon: "M8 2v20 M16 2v20 M4 10h16",
      text: "Fully Equipped Gourmet Kitchens",
    },
    {
      // Dumbbell for gym
      icon: "M4 8h4l4 8h4l-4-8h4 M20 8h-4l-4 8h-4l4-8h-4",
      text: "Home Gyms & Fitness Areas",
    },
    {
      // Massage/spa (person lying down)
      icon: "M4 12h16v4H4z M8 6h8v6H8z M12 18v4",
      text: "Private Spa Services",
    },
    {
      // Screen with seats for cinema
      icon: "M2 6h20v10H2z M6 4v4 M10 4v4 M14 4v4 M18 4v4 M6 18v4 M18 18v4",
      text: "Cinema & Media Rooms",
    },
    {
      // Grill/BBQ
      icon: "M6 10h12v8H6z M8 6h8 M4 18h16 M10 14v4 M14 14v4",
      text: "Outdoor Dining & BBQ Areas",
    },
    {
      // Wifi signal waves
      icon: "M12 2v4 M8 10h8 M4 18h16 M6 14c2-4 6-4 12 0",
      text: "High-Speed WiFi",
    },
    {
      // Shield for security
      icon: "M12 2L22 8v8c0 5-5 8-10 10-5-2-10-5-10-10V8z",
      text: "24/7 Security",
    },
    {
      // Palm tree for tropical gardens
      icon: "M12 2v8 M8 10h8 M6 14c2-2 4-4 6-4s4 2 6 4 M12 14v8",
      text: "Lush Tropical Gardens",
    },
    {
      // Hot tub bubbles
      icon: "M6 10h12v8H6z M8 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4 M16 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4 M10 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2 M14 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2",
      text: "Hot Tubs & Plunge Pools",
    },
  ];
</script>

<section {...$$restProps}>
  <div class="flex flex-wrap justify-center gap-3">
    {#each features as feature}
      <span
        class="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800"
      >
        {feature.text}
      </span>
    {/each}
  </div>
</section>
