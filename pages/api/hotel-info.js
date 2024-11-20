import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  const { inventory, language } = req.body;

  if (!inventory || !language) {
    return res.status(400).json({ error: 'Missing required fields: inventory and language' });
  }

  const url = 'https://api.worldota.net/api/b2b/v3/hotel/info/dump/';
  const username = '5817';
  const password = '454ea51f-48d9-4034-910f-5fbed4987e04';

  try {
    const response = await axios.post(
      url,
      { inventory, language },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({
      error: error.response?.data || error.message || 'Failed to fetch data from WorldOTA API',
    });
  }
}
