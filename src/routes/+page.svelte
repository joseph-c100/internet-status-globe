<script>
  import GlobeMap from "$lib/GlobeMap.svelte";
  import StatusMenu from "$lib/StatusMenu.svelte";

  import { last7days, last30days } from "$lib/index.js";

  let data7days = $derived($last7days?.result?.annotations || []);
  let data3months = $derived($last30days?.result?.annotations || []);

  let active = $state("7days");
</script>

<div class="container">
  <div class="header">
    <h1>Global internet status</h1>
    <div class="status-menu">
      <StatusMenu {data7days} {data3months} {active} />
    </div>
  </div>
  <div class="globe">
    <GlobeMap {data7days} {data3months} {active} />
  </div>
</div>

<style>
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
