<script>
  import "../app.css";
  import Header from "../components/Header.svelte";
  import Footer from "../components/Footer.svelte";
</script>

<div class="font-general">
  <Header />
  <slot />
  <Footer />
</div>
