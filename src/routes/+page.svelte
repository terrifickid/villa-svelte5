<script>
  import Hero from "../components/Hero.svelte";
  import About from "../components/About.svelte";
  import FeatureList from "../components/FeatureList.svelte";
  import SpacesSection from "../components/FindYourSpace.svelte";

  import Destinations from "../components/Destinations.svelte";
  const spacesData = {
    title: "Find your space, your way",
    description:
      "From flexible desks to fully private offices, our workspaces are designed to adapt to your pace, your needs — and your flow.",
    ctaText: "Book a tour",
    ctaHref: "/contact",
    cards: [
      {
        iconSvg: `<svg viewBox="0 0 256 256"><!-- Hot Desk SVG path --></svg>`,
        title: "Hot Desk",
        subtitle: "Sit anywhere, stay flexible",
        description:
          "Access a shared workspace whenever you need it — no booking, no hassle...",
      },
      // ... other cards
    ],
  };
  export let data;
</script>

<Hero {data} />

<FeatureList />
<SpacesSection
  data={{
    cards: [
      {
        iconSvg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>`,
        title: "Test Card",
        subtitle: "This should appear",
        description: "If you see this, cards are working!",
      },
      {
        iconSvg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>`,
        title: "Test Card",
        subtitle: "This should appear",
        description: "If you see this, cards are working!",
      },
      {
        iconSvg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>`,
        title: "Test Card",
        subtitle: "This should appear",
        description: "If you see this, cards are working!",
      },
    ],
  }}
/>
<Destinations {data} />

<About />
