export default async function handler(req, res) {
  const apiUrl = `https://api.printify.com/v1/shops/16553509/products.json`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.PRINTIFY_API_KEY}`
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch products' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
