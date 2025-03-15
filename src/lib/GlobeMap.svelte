<script>
    import Globe from 'globe.gl';
    import { onMount } from 'svelte';
  
    let globeContainer;
    let myGlobe;
  
    onMount(() => {
      myGlobe = Globe()(globeContainer)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
        .backgroundColor('#fff')
        .width(window.innerWidth)
        .height(window.innerHeight)
        .pointOfView({ lat: 0, lng: 0, altitude: 2 });
  
      // getch boundary geojson data
      fetch('/ne_110m_admin_0_countries.geojson')
        .then(res => res.json())
        .then(countries => {
          myGlobe
            .hexPolygonsData(countries.features)
            .hexPolygonResolution(3)
            .hexPolygonMargin(0.3)
            .hexPolygonUseDots(true)
            .hexPolygonColor(() => `#${(Math.random() * 0xffffff | 0).toString(16).padStart(6, '0')}`);
        });
  
      // Handle window resizing
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
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  </style>
  
  <div bind:this={globeContainer}></div>
  