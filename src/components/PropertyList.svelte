<script>
  import { onMount } from "svelte";
  import _ from "lodash";
  export let data;
  let search = "";
  function formatPrice(price, currency) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(price);
  }
  function getMainImage(item) {
    var p = "/p.svg";
    if (!item.pictures.length) return p;
    if (item?.pictures[0]?.original) p = item?.pictures[0]?.original;
    if (item?.picture?.large) p = item?.picture?.large;
    return p;
  }
  function urlEncode(str, defaultValue = "x") {
    const encodedStr = encodeURIComponent(str);
    return _.isEmpty(str) ? defaultValue : _.escape(encodedStr);
  }
  onMount(() => {
    search = _.get(window, "location.search", "");
  });
</script>

<div
  class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
>
  {#each data.results as item}
    <a
      href={"/" +
        urlEncode(
          _.kebabCase(_.get(item, "address.country", "country")),
          "country"
        ) +
        "/" +
        urlEncode(_.kebabCase(_.get(item, "address.city", "city")), "city") +
        "/" +
        urlEncode(_.kebabCase(_.get(item, "title", "property")), "property") +
        "/" +
        item._id +
        search}
      class="group mb-6"
    >
      <article>
        <div
          class="aspect-square object-cover bg-center bg-cover h-full rounded-md"
          style="background-image: url({getMainImage(item)})"
        />

        <div
          class="flex flex-col items-start justify-between flex-1 w-full mt-4"
        >
          <div class="w-full flex flex-col items-start justify-center">
            <p class="text-body font-medium text-black">
              {item.nickname}
            </p>
            <p class="mb-2 text-body text-black/80">
              {formatPrice(item.prices.basePrice, item.prices.currency)}
              Per Night
            </p>

            <div class="grid grid-cols-2 w-full">
              <p class="text-caption">
                {item.address.city}
              </p>
              <p class="text-right text-caption">
                {item.bedrooms} Beds
                {item.bathrooms} Bath
              </p>
            </div>
          </div>
        </div>
      </article>
    </a>
  {/each}
</div>
