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

<!-- Established note -->
<section class="v-band">
  <div
    class="col-span-full space-y-6 rounded-2xl bg-black p-12 text-standfirst text-white lg:col-span-8"
  >
    <p>
      Villabound was established in 2011 by a dynamic Barbadian entrepreneur
      Lily Dash. The company grew out of her initial company Caribound; a
      specialized service focused on Caribbean villa rentals.
    </p>
    <p>
      Established in 2011 by a dynamic Barbadian entrepreneur Lily Dash.
      Extraordinary retreats that capture the very best each destination has to
      offer — from breathtaking views and world-class amenities to dedicated
      staff, curated art, and one-of-a-kind experiences.
    </p>

    <p>
      For more information on this private service, call +1 (246) 424-5075.
    </p>
  </div>
</section>
<Difference />
<Destinations {data} />
<Faq />
<Ready />

<About />
