<script>
  // All location data is now inside the component
  const locations = [
    {
      name: "Tuileries",
      address: "6 Av. du Général Lemonnier, 75001 Paris",
      image:
        "https://framerusercontent.com/images/2UVHuskN679KbtnTAOceXArAE.jpeg?width=1200",
      link: "/locations/tuileries",
    },
    {
      name: "Commerce",
      address: "Pl. de la République, 35000 Rennes",
      image:
        "https://framerusercontent.com/images/JMXmWO7qhXpElFdhRAkliyckM4.jpeg?width=896",
      link: "/locations/commerce",
    },
    {
      name: "Triomphe",
      address: "Pl. Charles de Gaulle, 75008 Paris",
      image:
        "https://framerusercontent.com/images/Us4phjsltLCX8qiEMxuC1HjWKjE.jpg?width=4160",
      link: "/locations/triomphe",
    },
    {
      name: "Gustave Eiffel",
      address: "Av. Gustave Eiffel, 75007 Paris",
      image:
        "https://framerusercontent.com/images/2gNYWxxoQcpbigyF8AgSzG4VqM8.jpg?width=6000",
      link: "/locations/gustave-eiffel",
    },
    {
      name: "Opéra",
      address: "Pl. de la Mairie, 35000 Rennes",
      image:
        "https://framerusercontent.com/images/ais40ebAbig12yC5g0g3DWCScUU.jpg?width=6000",
      link: "/locations/opera",
    },
    {
      name: "Borély",
      address: "Av. du Parc Borély, 13008 Marseille",
      image:
        "https://framerusercontent.com/images/GBpay3B8HObfTUqnBW7uHWQV7rs.jpg?width=4928",
      link: "/locations/borely",
    },
  ];
</script>

<section class="bg-white py-20 md:py-24">
  <!-- Header -->
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-end gap-12"
    >
      <div>
        <h2 class="text-4x">
          Explore exclusive properties in popular destinations.
        </h2>
        <p class="mt-4 text-lg">
          Embark on a journey of discovery as you delve into our curated
          selection of exclusive properties, all nestled within the most
          sought-after and popular destinations around the world.
        </p>
      </div>

      <a
        href="/locations"
        class="inline-flex items-center px-8 py-3 border border-black text-black rounded-full font-medium hover:bg-black hover:text-white transition"
      >
        View All Locations
      </a>
    </div>
  </div>

  <!-- Locations Grid -->
  <div class="max-w-7xl mx-auto px-6 lg:px-8 mt-16">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      {#each locations as location}
        <div
          class="group relative overflow-hidden rounded-2xl shadow-lg aspect-[4/5]"
        >
          <!-- Background Image -->
          <img
            src={location.image}
            alt={location.name}
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <!-- Dark Gradient Overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
          />

          <!-- Content -->
          <div class="relative h-full flex flex-col justify-end p-8 text-white">
            <h3 class="text-2xl font-semibold">
              {location.name}
            </h3>
            <p class="mt-2 text-white/90 text-sm leading-relaxed">
              {location.address}
            </p>

            <a
              href={location.link}
              class="mt-6 inline-flex items-center px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition w-fit"
            >
              View
            </a>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
