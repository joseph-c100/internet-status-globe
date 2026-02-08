import { CLOUDFLARE_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function GET() {
  const url = 'https://api.cloudflare.com/client/v4/radar/annotations/outages?limit=5&offset=0&dateRange=7d&format=json';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${CLOUDFLARE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return json(data);
  } catch (error) {
    console.error('Failed to fetch 7-day outage data:', error);
    return json({ error: error.message }, { status: 500 });
  }
}
