<script>
  import GlobeMap from "$lib/GlobeMap.svelte";
  import StatusMenu from "$lib/StatusMenu.svelte";

  import { last7days, last30days } from "$lib/index.js";

  let data7days = $derived($last7days?.result?.annotations || []);
  let data3months = $derived($last30days?.result?.annotations || []);

  let SelectedData = $derived(active === "7days" ? data7days : data3months);

  let active = $state("7days");

  $effect(() => {
    console.log(SelectedData);
  });

  // TO DO
  // - lookup table for country names
  // - remove duplicate countries in status menu
  // - click country name to center on globe
</script>

<div class="container">
  <div class="header">
    <h1>Global internet status</h1>
    <div class="status-menu">
      <StatusMenu data={SelectedData} bind:active />
    </div>
  </div>
  <div class="globe">
    <GlobeMap data={SelectedData} {active} />
  </div>
</div>

<style>
  .container {
    overflow: hidden;
  }
  .header {
    position: absolute;
    z-index: 100;
    color: black;
    font-family: "Inter", sans-serif;
    background-color: white;
  }

  h1 {
    font-size: 17px;
    font-weight: 600;
    padding: 4px 10px;
  }
</style>
