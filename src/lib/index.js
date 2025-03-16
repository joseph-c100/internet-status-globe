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

// Internet outage data from Cloudflare Worker - last 7 days
export const last7days = readable(
  [],
  loadJsonData("https://internetshutdowns.joeclark176.workers.dev/")
);
