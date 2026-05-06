<script>
  // Plain JSON object
  const services = [
    {
      title: "Personal Concierge",
      description:
        "Your concierge plans your trip well before arrival and manages it actively once you’re here.",
    },
    {
      title: "Private Chef",
      description:
        "Restaurant-level cooking tailored to your group’s tastes, timing, and pace.",
    },
    {
      title: "Personal Butler",
      description:
        "Manages service, setup, and daily villa operations seamlessly.",
    },
    {
      title: "Transportation",
      description:
        "Professional chauffeur service with local knowledge and real-time coordination.",
    },
    {
      title: "Celebrations",
      description:
        "Spacious layouts and ocean views perfect for memorable gatherings.",
    },
    {
      title: "Corporate Retreats",
      description:
        "Private spaces designed for focus, collaboration, and connection.",
    },
    {
      title: "Families",
      description:
        "Spacious layouts and thoughtful comforts for all generations.",
    },
    {
      title: "Couples",
      description: "Intimate villas with private pools and ocean terraces.",
    },
  ];
</script>

<section class="mx-auto py-20">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each services as service}
      <div class=" bg-gray-100 rounded-2xl p-12 snap-start text-center">
        <h4 class="text-lg mb-3">
          {service.title}
        </h4>

        <p class="text-lg">
          {service.description}
        </p>
      </div>
    {/each}
  </div>
</section>
