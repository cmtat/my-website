export default async function handler(req, res) {
  const response = await fetch('https://api.printify.com/v1/shops/YOUR_SHOP_ID/products.json', {
    headers: {
      Authorization: `Bearer ${process.env.PRINTIFY_API_KEY}`
    }
  });

  if (!response.ok) {
    return res.status(response.status).json({ error: 'Failed to fetch products' });
  }

  const data = await response.json();
  res.status(200).json(data);
}
