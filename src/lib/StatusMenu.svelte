<script>
  export let data7days, data3months;
</script>

<div class="status-menu">
  {#each data7days as day}
    <div class="status-menu-item">
      <button>
        <span>{day.locationsDetails[0].name}</span>
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
