<script>
  import GlobeMap from "$lib/GlobeMap.svelte";
  import StatusMenu from "$lib/StatusMenu.svelte";

  import { last7days, last30days } from "$lib/index.js";

  $: data7days = $last7days?.result?.annotations || [];
  $: data3months = $last30days?.result?.annotations || [];
</script>

<div class="container">
  <div class="header">
    <h1>Internet status globe</h1>
    <div class="status-menu">
      <StatusMenu {data7days} {data3months} />
    </div>
  </div>
  <div class="globe">
    <GlobeMap {data7days} {data3months} />
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
    font-size: 20px;
    font-weight: 600;
    padding: 1rem;
  }
</style>
