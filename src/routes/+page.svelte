<script>
  import Hero from "../components/Hero.svelte";
  import About from "../components/About.svelte";
  import FeatureList from "../components/FeatureList.svelte";
  import SpacesSection from "../components/FindYourSpace.svelte";

  import Destinations from "../components/Destinations.svelte";

  import Ready from "../components/Ready.svelte";
  import Features from "../components/Features.svelte";
  import Difference from "../components/Difference.svelte";
  export let data;
</script>

<Hero {data} />
<Features />
<About />

<Difference />
<Destinations {data} />

<Ready />
