<script>
  import Hero from "../components/Hero.svelte";
  import About from "../components/About.svelte";
  import FeatureList from "../components/FeatureList.svelte";
  import SpacesSection from "../components/FindYourSpace.svelte";

  import Destinations from "../components/Destinations.svelte";
  import Flist from "../components/junk/featureList.svelte";
  import Ready from "../components/Ready.svelte";
  import Features from "../components/Features.svelte";
  import Difference from "../components/Difference.svelte";
  import Faq from "../components/Faq.svelte";
  export let data;
</script>

<Hero {data} />
<Features />
<p class="text-2xl mt-20 bg-black p-12 rounded-2xl text-white">
  Curated for absolute privacy, uncompromising comfort, and timeless elegance,
  Villabound offers extraordinary retreats that capture the very best each
  destination has to offer — from breathtaking views and world-class amenities
  to dedicated staff, curated art, and one-of-a-kind experiences.
</p>
<Difference />
<Destinations {data} />
<Faq />
<Ready />
<About />
