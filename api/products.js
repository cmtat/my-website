export default async function handler(req, res) {
  const { id } = req.query;

  const endpoint = id
    ? `https://api.printify.com/v1/shops/YOUR_SHOP_ID/products/${id}.json`
    : `https://api.printify.com/v1/shops/YOUR_SHOP_ID/products.json`;

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
}
