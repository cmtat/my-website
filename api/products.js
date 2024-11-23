export default async function handler(req, res) {
  const { id } = req.query;

  const endpoint = id
    ? `https://api.printify.com/v1/shops/16553509/products/${id}.json`
    : `https://api.printify.com/v1/shops/16553509/products.json`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${process.env.PRINTIFY_API_KEY}`,
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch product(s)' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching product(s):', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
