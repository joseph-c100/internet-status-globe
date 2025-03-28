<script>
  let { data, active = $bindable(), selectedCountry = $bindable() } = $props();

  let uniqueData = $derived(
    data
      .filter(
        (day, index, self) =>
          index ===
          self.findIndex(
            (d) =>
              d?.locationsDetails[0]?.name === day?.locationsDetails[0]?.name
          )
      )
      .map((day) => ({
        ...day,
        location:
          day.locationsDetails[0]?.name || day.asnsDetails[0]?.location?.name,
      }))
  );

  $effect(() => {
    console.log(uniqueData);
  });
</script>

<div class="status-menu">
  <div class="toggle">
    <button
      onclick={() => (active = "7days")}
      class={active === "7days" ? "active" : ""}
    >
      <span>Last 7 days</span>
    </button>
    <button
      onclick={() => (active = "3months")}
      class={active === "3months" ? "active" : ""}
    >
      <span>Last 3 months</span>
    </button>
  </div>
  {#each uniqueData as day}
    <div class="status-menu-item">
      <button
        onclick={() => (selectedCountry = day.location)}
        class={selectedCountry === day.location ? "active" : ""}
      >
        <span>{day.location}</span>
        {#if selectedCountry === day.location}
          <div class="locationInfo">
            <span>{day.eventType}</span>
            <span>{day.outage.outageCause}</span>
            <span>{day.outage.outageType}</span>
            <span>{day.description}</span>
            <span>{day.startDate}</span>
          </div>
        {/if}
      </button>
    </div>
  {/each}
</div>

<style>
  .status-menu {
    display: flex;
    flex-direction: column;
    background-color: white;
    font-family: "Inter", sans-serif;
    width: 300px;
    max-height: 90dvh;
    overflow-y: auto;
  }

  .toggle {
    display: flex;
    flex-direction: row;
    gap: 5px;
    padding: 0 1rem;
  }

  .toggle button {
    background-color: white;
    border: 1px solid black;
    padding: 6px;
    cursor: pointer;
    margin-bottom: 1rem;
  }

  .toggle button.active {
    background-color: black;
    color: white;
  }

  .status-menu-item button {
    background-color: rgb(255, 63, 95);
    border: none;
    padding: 10px;
    cursor: pointer;
    width: 100%;
    text-align: left;
    color: white;
  }

  .status-menu-item button:hover {
    background-color: #f0f0f0;
    color: black;
  }

  .status-menu-item button.active {
    background-color: white;
    color: black;
    font-weight: 600;
    border-top: 2px solid black;
  }

  .locationInfo {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    font-size: 12px;
    width: 100%;
  }
</style>
