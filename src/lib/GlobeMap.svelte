<script>
    import Globe from 'globe.gl';
    import { onMount } from 'svelte';
  
    let globeContainer;
  
    onMount(() => {
      const myGlobe = Globe()(globeContainer)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
        .backgroundColor('#fff')
        .width(window.innerWidth) 
        .height(window.innerHeight) 
        .pointOfView({ lat: 0, lng: 0, altitude: 2 }); 
  
      // handle resizing
      const handleResize = () => {
        myGlobe.width(window.innerWidth).height(window.innerHeight);
      };
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });
  </script>
  
  <style>
    div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  </style>
  
  <div bind:this={globeContainer}></div>
  