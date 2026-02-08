import { readable } from "svelte/store";
import { json } from "d3-fetch";
import { browser } from "$app/environment";

// Custom fetch function for JSON data
const loadJsonData = (url) => (set) => {
  if (browser) {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => set(data))
      .catch((error) => console.error("Failed to fetch data:", error));
  }
  return () => {};
};

// Internet outage data from Cloudflare Radar API - last 7 days
export const last7days = readable(
  [],
  loadJsonData('/api/outages-7days')
);

// Internet outage data from Cloudflare Radar API - last 12 weeks
export const last30days = readable(
  [],
  loadJsonData('/api/outages-30days')
);
