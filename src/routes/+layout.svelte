<script>
  import "../app.css";
  import Header from "../components/Header.svelte";
  //import Footer from "../components/Footer.svelte";
  import Newsletter from "../components/Newsletter.svelte";
</script>

<div class="font-general">
  <div class="mx-auto container max-w-6xl px-6">
    <Header />
    <slot />
    <Newsletter />
  </div>
</div>
