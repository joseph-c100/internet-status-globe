<script>
  import Globe from "globe.gl";
  import { onMount } from "svelte";

  let globeContainer;
  let myGlobe;
  let countries;

  let { data, selectedCountry } = $props();

  const outageLocations = $derived(
    data?.map(
      (day) =>
        day?.locationsDetails[0]?.code.toLowerCase() ||
        day?.asnsDetails[0]?.location?.code.toLowerCase()
    ) || []
  );

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
      // fetch boundary geojson data
      if (data) {
        fetch("/ne_110m_admin_0_countries.geojson")
          .then((res) => res.json())
          .then((countriesData) => {
            countries = countriesData;
            myGlobe
              .hexPolygonsData(countries.features)
              .hexPolygonResolution(3)
              .hexPolygonMargin(0.3)
              .hexPolygonUseDots(false)
              .hexPolygonColor((feature) => {
                const countryName = feature.properties.ISO_A2.toLowerCase();
                const hasOutage = outageLocations?.includes(countryName);
                return hasOutage ? "red" : "#fff";
              })
              .hexPolygonAltitude(0.02);
          });
      }
    });

    // center on selected country using bbox
    $effect(() => {
      if (selectedCountry && countries) {
        const countryFeature = countries.features.find(
          (f) =>
            f.properties.ISO_A2.toLowerCase() === selectedCountry.toLowerCase()
        );

        if (countryFeature) {
          let lat = 0;
          let lng = 0;

          // Try to get center from bbox if available
          if (countryFeature.bbox && Array.isArray(countryFeature.bbox)) {
            const [minLng, minLat, maxLng, maxLat] = countryFeature.bbox;
            lat = (minLat + maxLat) / 2;
            lng = (minLng + maxLng) / 2;
          } else {
            // Fallback: calculate center from geometry coordinates
            const coordinates = countryFeature.geometry.coordinates[0][0];
            if (coordinates) {
              const lngs = coordinates.map((c) => c[0]);
              const lats = coordinates.map((c) => c[1]);
              lng = (Math.min(...lngs) + Math.max(...lngs)) / 2;
              lat = (Math.min(...lats) + Math.max(...lats)) / 2;
            }
          }

          myGlobe.pointOfView(
            {
              lat,
              lng,
              altitude: 1,
            },
            1000
          );
        }
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
