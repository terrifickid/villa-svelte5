<script>
  import Hero from "../components/Hero.svelte";
  import About from "../components/About.svelte";
  import FeatureList from "../components/FeatureList.svelte";
  import SpacesSection from "../components/FindYourSpace.svelte";

  import Destinations from "../components/Destinations.svelte";

  export let data;
</script>

<Hero {data} />

<FeatureList />
<SpacesSection
  data={{
    title: "Discover Your Villa",
    description:
      "Curated luxury villas in Barbados and beyond — exclusive retreats with ocean views, private pools, and dedicated staff for an unforgettable escape tailored to you.",
    cards: [
      {
        iconSvg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>`,
        title: "Solo Retreats",
        subtitle: "Unwind in complete solitude",
        description:
          "Escape to a private villa designed for personal rejuvenation — with serene ocean views, infinity pools, and on-demand wellness amenities. Ideal for introspection, reading, or simply reconnecting with yourself in total seclusion.",
      },
      {
        iconSvg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>`,
        title: "Romantic Getaways",
        subtitle: "Intimate moments, elevated",
        description:
          "Celebrate love with candlelit dinners prepared by your private chef, sunset views from the terrace, and luxurious suites. Perfect for honeymoons, anniversaries, or spontaneous escapes for two.",
      },
      {
        iconSvg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>`,
        title: "Family Vacations",
        subtitle: "Spacious luxury for all ages",
        description:
          "Gather the family in expansive estates with kid-friendly pools, game rooms, and dedicated staff to handle every detail. Create lasting memories with beach access, outdoor adventures, and plenty of room to spread out.",
      },
      {
        iconSvg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>`,
        title: "Group Celebrations",
        subtitle: "Epic gatherings in style",
        description:
          "Host milestone events — birthdays, reunions, or bachelor(ette) parties — in grand villas with outdoor lounges, BBQs, and entertainment spaces. Private chefs and concierge service ensure a seamless, unforgettable celebration.",
      },
    ],
  }}
/>
<Destinations {data} />

<About />
