<script>
    import GlobeMap from '$lib/GlobeMap.svelte'
</script>

<div class="container">
    <div class="header">
        <h1>Internet status globe</h1>
    </div>
    <div class="globe">
        <GlobeMap />
    </div>
</div>


<style>
.header {
    position: absolute;
    z-index: 100;
    padding: 1rem;
}

h1 {
    font-size: 20px;
    font-family: sans-serif;
    font-weight: 400;
}
</style>