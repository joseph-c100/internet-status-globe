<script>
    import { onMount } from 'svelte';
    import Globe from 'globe.gl';

    let globeContainer
    onMount(()=>{
        const myGlobe = new Globe(globeContainer)
    })
</script>

<div class="globeContainer" bind:this={globeContainer}></div>