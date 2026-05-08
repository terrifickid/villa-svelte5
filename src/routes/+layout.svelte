<script>
  import "../app.css";
  import Header from "../components/Header.svelte";
  //import Footer from "../components/Footer.svelte";
  import Newsletter from "../components/Newsletter.svelte";
</script>

<div class="font-general">
  <Header />
  <h1
    style="background-image: url(/upscaled2.jpeg)"
    class="bg-cover bg-center text-[13rem] text-center py-50 bg-bound text-white"
  >
    villabound
  </h1>
  <div class="mx-auto container max-w-6xl px-6">
    <div class="pt-30"><slot /></div>
    <Newsletter />
  </div>
</div>
