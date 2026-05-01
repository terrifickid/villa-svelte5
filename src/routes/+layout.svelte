<script>
  import "../app.css";
  import Header from "../components/Header.svelte";
  //import Footer from "../components/Footer.svelte";
  import Newsletter from "../components/Newsletter.svelte";
</script>

<div class="font-general">
  <Header />
  <div class="mx-auto container frame">
    <slot />
  </div>
  <Newsletter />
</div>
