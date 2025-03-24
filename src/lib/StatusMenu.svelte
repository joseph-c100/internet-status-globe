<script>
  let { data, active = $bindable() } = $props();
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
  {#each data as day}
    <div class="status-menu-item">
      <button>
        <span>{day?.locationsDetails[0]?.name}</span>
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
    width: 100%;
    max-height: 100vh;
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
</style>
