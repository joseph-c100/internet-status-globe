<script>
  import Globe from "globe.gl";
  import { onMount } from "svelte";

  let globeContainer;
  let myGlobe;

  let { data7days, data3months } = $props();

  onMount(() => {
    myGlobe = Globe()(globeContainer)
      // .globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg")
      .backgroundColor("#000")
      .width(window.innerWidth)
      .height(window.innerHeight)
      .pointOfView({ lat: 0, lng: 0, altitude: 1.2 })
      .showAtmosphere(false);

    // submarine internet cables geojson
    fetch("/submarine_cables.json")
      .then((res) => res.json())
      .then((cablesGeo) => {
        let cablePaths = [];
        cablesGeo.features.forEach(({ geometry, properties }) => {
          geometry.coordinates.forEach((coords) =>
            cablePaths.push({ coords, properties })
          );
        });

        myGlobe
          .pathsData(cablePaths)
          .pathPoints("coords")
          .pathColor(() => "#cacaca")
          .pathPointLat((p) => p[1])
          .pathPointLng((p) => p[0])
          .pathDashLength(0.1)
          .pathDashGap(0.005)
          .pathDashAnimateTime(32000);
      });

    $effect(() => {
      // getch boundary geojson data
      if (data7days) {
        fetch("/ne_110m_admin_0_countries.geojson")
          .then((res) => res.json())
          .then((countries) => {
            myGlobe
              .hexPolygonsData(countries.features)
              .hexPolygonResolution(3)
              .hexPolygonMargin(0.3)
              .hexPolygonUseDots(false)
              .hexPolygonColor((feature) => {
                const countryName = feature.properties.NAME;
                const outageLocations =
                  data7days?.map((day) => day.locationsDetails[0].name) || [];
                const hasOutage = outageLocations?.includes(countryName);
                return hasOutage ? "red" : "#fff";
              })
              .hexPolygonAltitude(0.02);
          });
      }
    });

    // Handle window resizing
    const handleResize = () => {
      myGlobe.width(window.innerWidth).height(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
</script>

<div bind:this={globeContainer}></div>

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
